const User = require('../../../models/users');
const jwt = require('jsonwebtoken');
module.exports.createSession = async function(req,res){
    try {

        let user = await User.findOne({email : req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message : "Invalid email or password"
            });
        }
        return res.status(200).json({
            message : "successfully authenticated, Here is your Token",
            data : {
                token : jwt.sign(user.toJSON(),'codeial',{expiresIn : '100000'})
            }
        });
    } catch (error) {
        console.log('*****',error);
        return res.json(500,{
            message : "Internal Server Error"
        })
    }
}