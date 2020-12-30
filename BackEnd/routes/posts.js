const {Post} = require('../models/post');
const {User} = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
//endpoints
//new post by user
router.post('/', auth, async (req, res)=>{
    try {

        const user = await User.findOne({ userName: req.user.userName });
        if (!user) {
            return res.status(400).send(`user with username "${req.user.username}" doesnt exist`)
        }

        let post = new Post({
            user: user._id,
            title: req.body.title,
            description: req.body.description,
            text: req.body.text
        });
        await post.save();
        return res.send(post);
    } catch (ex) {
        return res.status(500).send(`internal server error: ${ex}`)

    }
});
router.delete('/:postid', auth, async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.user.userName });
        if (!user) {
            return res.status(400).send(`user with username "${req.user.username}" doesnt exist`);
        }
        const post = await Post.findById(req.params.postid);
        if (!post) {
            return res.status(400).send(`post with id "${req.params.postid}" doesnt exist`);
        }
        if (post.user !==user._id) {
            return res.status(400).send(`Access denied, this isnt your post`);
        }
        Post.findByIdAndDelete(post._id);

        return res.send(true);
    } catch (ex) {
        return res.status(500).send(`internal server error: ${ex}`)
    }
});
router.get('/like/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postid);
        if (!post) {
            return res.status(400).send(`post with id "${req.params.postid}" doesnt exist`);
        }
        post.likes = post.likes+1;
        post.save();
        return res.send(true);
    } catch (ex) {
        return res.status(500).send(`internal server error: ${ex}`)
    }
})
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.user.userName });
        if (!user) {
            return res.status(400).send(`user with username "${req.user.username}" doesnt exist`);
        }
        let posts = [];
        user.friends.forEach(friend=>{
           let friendsPosts= Post.find({user: friend._id})
           friendsPosts.forEach(post=>{
               posts.push(post);
           })
        })
        posts = posts.sort((a,b)=>a.getTime()-b.getTime());
    } catch (ex) {
        return res.status(500).send(`internal server error: ${ex}`)

    }
})
module.exports= router;