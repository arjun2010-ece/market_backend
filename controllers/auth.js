const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = function(req, res) {
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            console.log("ERRRR ",err);
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        return res.status(200).json({
            message: "User signup successfully."
        })
    });
}


exports.signin = function(req, res) {
   const {email, password} = req.body;
   User.findOne({email}, (err, user) => {
    if(err || !user){
        return res.status(400).json({ error: "User with that email doesnot exists. Please signup." });
    }
    if(!user.authenticate(password)){
        return res.status(400).json({ error: "Email and password does not match." });
    }

    const token = jwt.sign({ _id : user._id}, process.env.JWT_SECRET);
    res.cookie("t", token, { expiry: 1800});
    const {_id, name, email, role} = user;
    return res.status(200).json({
        token,_id,name, role,email
    });

   });
}

exports.signout = function(req, res) {
    res.clearCookie("t");
    return res.status(200).json({
        message: "Signed out successfully."
    })
}

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['HS256']
});
