// not working properly
{
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
             type :'post',
             url : '/comments/create',
             data : newCommentForm.serialize(),
             success : function(data){
                let newComment = newDomComment(data.data.comment);
                $(' #comments-container>ul').prepend(newComment);
                deleteComment($(' .delete-comment-button', newComment));
             },  
             error : function(err){
                console.log(err.responseText);
            }
            })
        })
    }
    let newDomComment = function(comment){
        return $(`<li class="comment-${ comment._id }">
        <div class="comment-author-details">
            <div class="comment-author-name">
                <small>
                    <i class="fas fa-user fa-2x"></i>
                    ${ comment.user.name }
                </small>
            </div>
            <div class="comment-delete-button-container">
                <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">
                    <i class="far fa-window-close fa-2x"></i>
                    </a>
            </div>
            </div>
            <div class="comment-content">
                <p>
                ${ comment.content }
                </p> 
            </div>  
    </li>`);
    }
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    console.log(data);
                    // we have to recieve the post id from server
                 $(`.comment-${data.data.comment_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
            });
    }
    let convertCommentsToAjax = function(){
        var comments = $(' .delete-comment-button');
        for(i of comments){
            deleteComment(i);
        }
    }
    createComment();
    convertCommentsToAjax();
}