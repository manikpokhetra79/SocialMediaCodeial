class PostComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`); //refering to the post
        this.newCommentForm = $(`#post-${postId}-comments-form`);
        this.createComment(postId);
        //populating all posts wth deletebutton function
        let self = this; //here this refers to <a></a> tag
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));         
        });
    }
    createComment(postId){
    let pSelf = this;
    // console.log(pSelf);
    this.newCommentForm.submit(function(e){
        e.preventDefault();
        let self = this; //form
        $.ajax({
            type: 'post',
            url : '/comments/create',
            data : $(self).serialize(),
            success : function(data){
                let newComment = pSelf.newDomComment(data.data.comment);
                $(`#post-comments-${postId}`).prepend(newComment);
                // populate to the currently created comment
                pSelf.deleteComment($(' .delete-comment-button', newComment));

                 //enable toogle like button functionality
                new ToggleLike($(' .toggle-like-button', newComment));
                
                new Noty({
                    theme : 'metroui',
                    text : 'Comment Published',
                    type : 'success',
                    layout : 'topRight',       
                    timeout : 1500,
                    closeWith: ['click', 'button'],
                
                }).show();
            },error: function(error){
                console.log(error.responseText);
            }
        })
    })
    }
    newDomComment(comment){
        return $(`<li id="comment-${ comment._id}">
        <div class="comment-author-details">
            <div class="comment-author-name">
                <small>
                    <i class="fas fa-user fa-2x"></i>
                    ${ comment.user.name}
                </small>
            </div>
            <div class="comment-delete-button-container">
                <a class="delete-comment-button" href="/comments/destroy/${ comment._id}">
                    <i class="far fa-window-close fa-2x"></i>
                    </a>
            </div>
            </div>
            <div class="comment-content">
                <p>
                ${ comment.content}
                </p> 
            </div> 
        <div class="likes-container"> 
        <small>
        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${ comment._id}&type=Comment">
        0 Likes
        </a>
        </small>
       </div> 
    </li>`)
    }
    // deleteLink is a attribute
    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme : 'metroui',
                        text : 'Comment Deleted',
                        type : 'success',
                        layout : 'topRight',       
                        timeout : 1500,
                        closeWith: ['click', 'button'],
                    
                    }).show();
                },error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
}