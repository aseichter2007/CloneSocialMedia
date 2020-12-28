const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const commentSchema = new mongoose.Schema({
    user: {type: String, required: true},
    post: {type: String, required: true},
    text: {type: String, required: false, default: "test comment do not upvote"},
    likes: {type: Number, required:false, default:0},
    subcomments: [{type: Schema.Types.ObjectId, ref: "Comment"}],//should let me put comments in comments
    datetModified: {type: Date, required:false, default: Date.now}

});

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment){
        const schema = Joi.object({
            user: Joi.string().required(),
            post: Joi.string().required(),
            text: Joi.string(),
            likes: Joi.number()

        })
        return schema.validate(comment);
}

exports.Comment = Comment;
exports.validate = validateComment;
exports.commentSchema = commentSchema;