const { application } = require('express');
const express = require('express')
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_TOKEN = "$thisiscalledjwttoken$";

//create a user using:  POST "/api/authorization/createnewuser" -no login required
router.post('/createnewuser', [
    body('email', 'Enter a valid email address').isEmail(),
    body('name', 'Name must be atleast 3 characters long').isLength({ min: 3 }),
    body('password', 'Name must be atleast 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors then gives bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check wheather the user with same email already exist
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: 'email already exists' });
        }
        //hashing our password using bcrypt npm nodejs
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        //creating a new user here
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        });
        const data = {
            user:{
                id: user.id
            }
        }
        const authorizationToken = jwt.sign(data, JWT_TOKEN);
        //res.json(user);
        res.json({authorizationToken});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('something went wrong');
    }
})

module.exports = router;
// respond with "hello world" when a GET request is made to the homepage
