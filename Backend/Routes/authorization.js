const { application } = require('express');
const express = require('express')
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');

//create a user using:  POST "/api/authorization"  
router.post('/',[
    body('email','Enter a valid email address').isEmail(),
    body('name','Name must be atleast 3 characters long').isLength({ min: 3 }),
    body('password','Name must be atleast 5 characters long').isLength({ min: 5 }),
] , (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(user => res.json(user))
      .catch(err => {console.log(err)
        res.json({error: 'please enter unique email'})});
})

module.exports = router;
// respond with "hello world" when a GET request is made to the homepage
