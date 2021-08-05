// for scope issues
{
    let createPost = function(){
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function(e){
        e.preventDefault();
    // ajax call using jquery
         $.ajax({
            type: 'post',
            url : '/posts/create',
            data : newPostForm.serialize(), //converts form data to json
            success : function(data){
            // all the append delete happens here
            let newPost = newPostDom(data.data.post);
            $('#posts-container>ul').prepend(newPost);  
            // the below code is for to add delete functionality for every 
            // post created by ajax req..
            deletePost($(' .delete-post-button',newPost)); // this class inside of new Post
            //call the create comment class
            new PostComments(data.data.post._id);
            //enable toogle like button functionality
            new ToggleLike($(' .toggle-like-button', newPost));
            
            new Noty({
                theme : 'metroui',
                text : 'Post Published',
                type : 'success',
                layout : 'topRight',       
                timeout : 1500,
                closeWith: ['click', 'button'],
            
            }).show();
            },
            error: function(error){
                console.log(error.responseText);
            }
            });
            });
    }

    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <div class="post-author-details">
        <div class="post-author-name">
            <small>
                <i class="fas fa-user fa-2x"></i>
                ${ post.user.name }
            </small>
        </div>
        <div class="post-delete-button-container">
            <a class="delete-post-button" href="/posts/destroy/${ post._id }">
                <i class="far fa-window-close fa-2x"></i>
                </a>
        </div>
        </div>
        <div class="post-content">
            <p>
            ${ post.content }
            </p> 
        </div> 
        <br> 
        <div class="likes-container"> 
        <small>
        
        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
        <i class="far fa-thumbs-up fa-2x"></i>
        0 Likes
        </a>
        </small>
       </div> 
        <!-- post comment form -->
        <div class ="post-comments">
            <h3 style="color: rgb(21, 99, 214);">Comments</h3>
            <div class="form-container">
            <form id="post-${post._id}-comments-form" action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Leave your comments...">
                <input type="hidden" name="post" value="${ post._id }" >
                <input type="submit" value="Post your Comment">
                </form>
               </div>
        </div>
        <div id="comments-container">
            <ul id="post-comments-${ post._id }">
            </ul>
        </div>
        
    </li>`)
    }
    // delete post
    // here delete link is a tag of delete post button
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    // we have to recieve the post id from server
                 $(`#post-${data.data.post_id}`).remove();
                 new Noty({
                    theme : 'metroui',
                    text : 'Post Deleted',
                    type : 'success',
                    layout : 'topRight',       
                    timeout : 1500,
                    closeWith: ['click', 'button'],
                
                }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
            });
    }

    let convertPostsToAjax = function(){
        $(`#posts-container>ul>li`).each(function(){ //get every post li
            let post = $(this);
            // populate every post with delete button
            let deleteButton = $(' .delete-post-button' ,post);
            // call deletepost function in every post
            deletePost(deleteButton);
             // get the post's id by splitting the id attribute
            //  this will make every post and its comment creation dynamic
             let postId = post.prop('id').split("-")[1];
             //call postcomments class on all posts
             new PostComments(postId);

        })
    }
    // call createPost function
    createPost();
    convertPostsToAjax();
}