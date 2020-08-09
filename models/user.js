//Require Mongoose
var mongoose = require('mongoose');

const uuidv1 = require("uuidv1");
const crypto = require("crypto");
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
    // this.salt = uuidv1();
    // console.log("SKSKSKKS");
    // console.log(this.encryptPassword(pwd));
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

// bcrypt.hash(yourPassword, salt, (err, hash) => {
//     // Now we can store the password hash in db.
// });
 module.exports = mongoose.model("User", userSchema);