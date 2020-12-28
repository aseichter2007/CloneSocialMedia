const mongoose = require('mongoose');
const Joi = require('joi');
const {commentSchema} = require('./comment')

const postSchema = new mongoose.Schema({
    user: {type: String, required: true},
    title: {type: String, required: false, default: "Test Post Do Not Upvote"},
    description: {type: String, required:false, default: "test post do not upvote this"},
    text: {type: String, required:false, default:"test post do not upvote me"},
    datetModified: {type: Date, required:false, default: Date.now},
    comments: {type: [commentSchema], required:false, default:[]}
});
const Post = mongoose.model('Post', postSchema);

function validatePost(post){
    const schema = Joi.object({
        user: Joi.string().required(),
        title: Joi.string(),
        description: Joi.string(),
        text: Joi.string()
    });
    return schema.validate(post);
}

exports.Post = Post;
exports.validate = validatePost;
exports.postSchema = postSchema;