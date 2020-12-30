const User = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
//endpoints
router.get('/profile/:userName', auth, async (req, res) => {
   try {
       let user = await User.findOne({username: req.params.userName})
       if (!user) {
        return res.status(400).send(`user with username "${req.params.userName}" doesn't exist`)
       }
       user.password = "nope";
       return res.send(user);
       
   } catch (ex) {
    return res.status(500).send(`internal server error: ${ex}`)
   }
});
//post get by username for password verify
router.post('/login/', async (req, res) => {

});
//new user
router.post('/', async (req, res) => {

    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send(`user with email "${req.body.email}" already exists`)
        }
        user = await User.findOne({ userName: req.body.userName });
        if (user) {
            return res.status(400).send(`user with username "${req.body.userName}" already exists`)
        }
        const salt = await bcrypt.genSalt(10);
        user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password)
        });
        //aboutme can be changed later on, too cluttered for basic account creation

        await user.save();
        const token = user.generateAuthToken();

        return res.header('x-auth-token', token)
            .header('accss-control-expose-headers', 'x-auth-token')
            .send({ _id: user._id, userName: user.userName, email: user.email })
    }
    catch (ex) {
        return res.status(500).send(`internal server error: ${ex}`)
    }
});
//edit user
router.put('/', auth, async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details.message);
        }
        let user = await User.findById(req.body._id);
        if (!user) {
            return res.status(404).send(`The user with id "${req.body._id} does not exist.`)
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.profilePic = req.body.profilePic;
        user.aboutMe = req.body.aboutMe;
        await user.save();
        user.password="ha";
        return res.send(user);//shouldnt sent back whole user, exposes password
    }
    catch (ex) {
        return res.status(500).send(`internal server error: ${ex}`)
    }
});
//needs a username as friendUserName and the current users _id 
router.post('/addfriend/', auth, async (req, res) => {
    try {
        const friend = User.findOne(req.body.friendUserName);
        if (!friend) {
            return res.status(400).send(`user with username "${req.body.friendUserName}" doesnt exist`)
        }
        let user = await User.findOne(req.user.userName);
        if (!user) {
            return res.status(404).send(`The user with userName "${req.user.userName} does not exist.`)
        }
        user.password="dont be silly";
        friend.pendingFriends.push(user);//production needs to scrub passwords
        await friend.save();
        return res.send(friend);
    } catch (ex) {
        return res.status(500).send(`internal server error: ${ex}`)
    }
});
//needs current user id and friend's id posted
router.post('/acceptfriend/', auth, async (req, res) => {
    try {
        const friend = User.findOne(req.body.friendId);
        if (!friend) {
            return res.status(400).send(`user with id "${req.body.friendId}" doesnt exist`)
        }
        let user = await User.findOne(req.user.userName);
        if (!user) {
            return res.status(404).send(`The user with userName "${req.user.userName} does not exist.`)
        }
        user.friends.push(friend);//these should be password scrubbed
        user.pendingFriends.filter(oneFriend => {
            if (onefriend._id === friend._id) {
                return false;
            } else {
                return true;
            }
        })
        await user.save();
        friend.friends.push(user);
        await friend.save();//but the password needs to be intact here. 
        return res.send(user);
    } catch (ex) {
        return res.status(500).send(`internal server error: ${ex}`);
    }
});
//needs current user id and friend's id posted
router.post('/removefriend/', auth, async (req, res) => {

    try {
        const friend = User.findOne(req.body.friendId);
        if (!friend) {
            return res.status(400).send(`user with id "${req.body.friendId}" doesnt exist`)
        }
        let user = await User.findOne(req.user.userName);
        if (!user) {
            return res.status(404).send(`The user with userName "${req.user.userName} does not exist.`)
        }
        let friends = user.friends.filter(myfriend => {
            if (friend._id !== myfriend._id) {
                return true;
            } else {
                return false;
            }
        });
        user.friends = friends;
        let friendsOffriend = friend.friends.filter(theirfriend => {
            if (user._id !== theirfriend._id) {
                return true;
            } else {
                return false;
            }
        });
        friend.friends = friendsOffriend;
        await user.save();
        await friend.save();
        return res.send(true);
    } catch (ex) {
        return res.status(500).send(`internal server error: ${ex}`);
    }
});
module.exports = router;

