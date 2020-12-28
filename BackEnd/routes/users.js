const User = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
//endpoints
//post get by username for password verify
router.post('/login/', async (req, res) => {

});
//new user
router.post('/', async (req, res) => {
   
   try {
       const {error} = validate(req.body);
       if (error){
           return res.status(400).send(error.details[0].message);
       }
       let user = await User.findOne({email: req.body.email});
       if (user) {
           return res.status(400).send(`user with email "${req.body.email}" already exists`)
       }
       user = await User.findOne({userName: req.body.userName});
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
        .send({_id: user._id, userName: user.userName, email: user.email})
    }
    catch (ex) {
        return res.status(500).send(`internal server error: ${ex}`)
    }
});
//edit user
router.put('/', auth,  async (req, res) => {

});

module.exports = router;

