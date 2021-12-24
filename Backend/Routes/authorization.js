const { application } = require('express');
const express = require('express')
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_TOKEN = "$thisiscalledjwttoken$";

// ROUTE 1: create a user using:  POST "/api/authorization/createnewuser" -no login required
router.post('/createnewuser', [
    body('email', 'Enter a valid email address').isEmail(),
    body('name', 'Name must be atleast 3 characters long').isLength({ min: 3 }),
    body('password', 'password must be atleast 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // if there are errors then gives bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //check wheather the user with same email already exist
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, errors: 'email already exists' });
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
        success=true;
        res.json({success, authorizationToken});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})


// ROUTE 2: Authenticating a user using:  POST "/api/authorization/login" -no login required
router.post('/login', 
            [
                body('email', 'Enter a valid email address').isEmail(),
                body('password', 'password cannot be empty').exists(),
            ], 
            async (req, res) => {
                let success = false;
                // if there are errors then gives bad request and the errors
                //console.log("hello");
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                const {email,password} = req.body;
                try {
                    let user = await User.findOne({email});
                    if(!user){
                        success = false
                        return res.status(400).json({ errors: 'please enter correct email' });
                    }
                    const comparePassword = await bcrypt.compare(password,user.password);
                    //console.log(comparePassword);
                    if(!comparePassword){
                        success = false
                        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
                    }
                    const data = {
                        user:{
                            id: user.id
                        }
                    }
                    const authorizationToken = jwt.sign(data, JWT_TOKEN);
                    //res.json(user);
                    success = true;
                    res.json({ success, authorizationToken })
                    
                } 
                catch (error){
                    console.error(error.message);
                    res.status(500).send('Internal Server Error');
                }
            }
)

// ROUTE 3: Getting a user details using:  POST "/api/authorization/getUserDetails" -no login required
router.post('/getUserDetails', fetchuser, async (req, res) => {

    try {
        const userid=req.user.id;
        const user = await User.findById(userid).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }


})

module.exports = router;
// respond with "hello world" when a GET request is made to the homepage
