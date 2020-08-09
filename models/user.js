//Require Mongoose
var mongoose = require('mongoose');

const uuidv1 = require("uuidv1");
const crypto = require("crypto");



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
    maxlength: 32
},
name: {
    type: String,
    trim: true,
    maxlength: 32
},
salt: String,
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
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(pwd);    
});

userSchema.methods = {
    encryptPassword: function(pwd){
        if(!pwd){
            return "";
        }
        try {
            return crypto.createHmac("sha256", this.salt).update(pwd).digest("hex");
        } catch (error) {
            return "";
        }
    }
}

 module.exports = mongoose.model("User", userSchema);