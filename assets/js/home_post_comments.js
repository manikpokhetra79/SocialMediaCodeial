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
    console.log(pSelf);
    this.newCommentForm.submit(function(e){
        e.preventDefault();
        let self = this; //form
        $.ajax({
            type: 'post',
            url : '/comments/create',
            data : $(self).serialize(),
            success : function(data){
                let newComment = pSelf.newDomComment(data.data.comment);
                $(' #comments-container>ul').prepend(newComment);
                // populate to the currently created comment
                pSelf.deleteComment($(' .delete-comment-button', newComment));
            },error: function(error){
                console.log(error.responseText);
            }
        })
    })
    }
    newDomComment(comment){
        return $(`<li class="comment-${ comment._id}">
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
                    $(`#comment-${data.data.comment_id}`).remove();
                },error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
}