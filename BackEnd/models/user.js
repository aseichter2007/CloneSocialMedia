const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, minLength: 5, maxlength:50},
    email: {type: String, required: true, minLength: 5, maxlength:255},
    password: {type: String, required: true, minLength: 5, maxlength:1024},

    firstName: {type: String, required: false, default: 'John'},
    lastName: {type: String, required: false, default: 'doe'},
    proflePic: {type: String, required: false, default: "https://i1.sndcdn.com/avatars-000049760671-rsq6u3-t500x500.jpg"},
    aboutMe: {type: String, required: false, default: "I'm a secretive fella"},
    friends: [{type: Schema.Types.ObjectId, ref: "User"}],
    pendngFriends: [{type: Schema.Types.ObjectId, ref: "User"}], 
    isAdmin: {type: Boolean, default: false}
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, userName: this.userName, isAdmin: this.isAdmin}, config.get('jwtSecret'));
};

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object({
        userName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(1024).required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        proflePic: Joi.string(),
        aboutMe: Joi.string(),
    })
    return schema.validate(user);
}
exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;
