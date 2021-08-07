
    let toggleFriends = function(toggleFriendsButton){
        // console.log(toggleFriendsButton);
        // console.log($(toggleFriendsButton));
        $(toggleFriendsButton).click(function(e){
            e.preventDefault();
            // console.log("Hello ajax is working");
            $.ajax({
                type: 'Get',
                url : $(toggleFriendsButton).attr('href'),
                success : function(data){
                    // console.log(data.data);
                    //removed true means friend relation removed
                    if(data.data.removed){
                        $(toggleFriendsButton).html('Add Friend')
                    }else{
                        $(toggleFriendsButton).html('Remove Friend')
                    }
                },error : function(error){
                    console.log(error.responseText);
                }

            })
        })
    }

    toggleFriends($('.toggle-friends'));
