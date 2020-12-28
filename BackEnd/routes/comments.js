const Comment = require('../models/comment');
const {User} = require('../models/user');
const {Post} = require('../models/post');
const auth = require('../middleware/auth');

const express = require('express');
const router = express.Router();
//endpoints

router.post('/post/:postId', auth, async (req, res)=>{
    try {
        const user = await User.findOne(req.user.userName);
        if (!user) {
            return res.status(404).send(`The user with userName: ${req.user.userName} does not exist.`)
        }
        const post = await Post.findById(req.params.postIduserId);
        if (!post) {
            return res.status(404).send(`The post with id "${req.params.postId} does not exist.`)
        }
        const comment = new Comment({
            user: user._id,
            post: post._id,
            text: req.body.text
        });
        await comment.save();
        post.comments.push(comment)
        await post.save();
        
        return res.send(post);
    } catch (error) {
        return res.status(500).send(`internal server error: ${error}`);
    }
});
module.exports = router;
