const User = require('../models/users');
const Friendship = require('../models/friendship');

module.exports.toggleFriend = async function(req,res) {
    try {
        // find if users are already friends
        let existingFriendship = await Friendship.findOne({
            from_user : req.query.fromid,
            to_user : req.query.toid
        });
        
        let toUser = await User.findById(req.query.toid);
        let fromUser = await User.findById(req.query.fromid);
        // variable for friendship status
        
        let removed; //true means not friend and vice versa
        //if friends, pull the references of the users from friendship model using pull
        if(existingFriendship){
            fromUser.friendships.pull(existingFriendship._id)
            toUser.friendships.pull(existingFriendship._id);
            toUser.save();
            fromUser.save();
            existingFriendship.remove();
            removed = true;
        }else{
            // if not friends, create new friendship
            let newFriendship = await Friendship.create({
                from_user : req.query.fromid,
                to_user : req.query.toid
            })
            removed = false;
            //push new friendship into the frienship model
            toUser.friendships.push(newFriendship._id);
            fromUser.friendships.push(newFriendship._id);
            toUser.save();
            fromUser.save();
        }
        if(req.xhr){
            return res.status(200).json({
                message : "Request Successful",
                data: {
                    removed : removed
                }
                
            })  
        }
        return res.redirect('back');

    } catch (error) {
        console.log("Friends Action Not working",error);
        return res.redirect('back');
    }

}