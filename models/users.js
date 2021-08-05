const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    avatar :{
        type: String
    },
    friendships : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Friendship'
        }
    ]
},{
    timestamps : true
});
//linking multer,avatar field and avatar path
let storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now())
    }
  });
  //define static functions/methods
  //i.e function of a class that can be called even when an object of the class is not initialized
  userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);
module.exports = User;