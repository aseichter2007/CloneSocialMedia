const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user')
const express = require('express');
const router = express.Router();

function validateLogin(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(req);
}

router.post('/', async (req, res)=>{
    try {
        const {error} = validateLogin(req.body);
        if (error) {
            return res.status(400).send(error.details.message);
        }
        let user = await User.findone({ email: req.body.email});
        if (!user) {
            return res.status(400).send(`invalid email or password`);
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send(`invalid email or password`);
        }

        const token = user.generateAuthToken();
        return res.send(token);
    } catch (error) {
        return res.status(500).send(`Internal server error: ${error}`);
    }
});

module.exports = router;