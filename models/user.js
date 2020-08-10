//Require Mongoose
var mongoose = require('mongoose');
const bcrypt = require("bcrypt");

//Define a schema
var userSchema = new mongoose.Schema({
 email: {
     type: String,
     trim: true,
     required: true,
     unique: true,
 },
 hashed_password: {
    type: String,
    required: true,
},
name: {
    type: String,
    trim: true,
    maxlength: 32
},
about: {
    type: String,
    trim: true,
},
role: {
    type: Number,
    default: 0,
},
history: {
    type: Array,
    default: [],
}
}, { timestamps: true });


userSchema.virtual('password').set(function(pwd) {
    this.hashed_password = this.encryptPassword(pwd);    
});

userSchema.methods = {
    authenticate: function(plainText){
        return bcrypt.compareSync(plainText,  this.hashed_password);
    },
    encryptPassword: function(pwd){
        if(!pwd){
            return "";
        }
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(pwd, salt);
            return hash;
        } catch (error) {
            return "";
        }
    }
}

 module.exports = mongoose.model("User", userSchema);