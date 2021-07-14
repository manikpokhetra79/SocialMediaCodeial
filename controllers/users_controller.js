module.exports.user = function(req,res){
    return res.render('users',{
        title : 'Users Page'
    });
}
// action for login page
module.exports.login = function(req,res){
    return res.render('user_login',{
        title : 'Login Page'
    });
}
// action for register page
module.exports.register = function(req,res){
    return res.render('user_register',{
        title : 'Register Page'
    });
}