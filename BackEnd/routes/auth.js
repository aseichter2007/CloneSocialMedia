const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user')
const express = require('express');
const router = express.Router();

function validateLogin(req) {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(req);
}

router.post('/', async (req, res) => {
    try {
        //console.log(req.body)
        const { error } = validateLogin(req.body);
        if (error) {
            //console.log(error);
            return res.status(400).send(error.details.message);
        }
        let user = await User.findOne({ userName: req.body.userName });
        if (!user) {
            console.log("user",user);
            return res.status(400).send(`invalid email or password`);
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            console.log("validpassword",validPassword)
            return res.status(400).send(`invalid email or password`);
        }

        const token = user.generateAuthToken();
        //console.log("/auth")
        return res.send(token);
    } catch (error) {
        return res.status(500).send(`Internal server error auth: ${error}`);
    }
});

module.exports = router;