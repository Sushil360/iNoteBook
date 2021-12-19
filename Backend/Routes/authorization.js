const { application } = require('express');
const express = require('express')
const router = express.Router();
const User = require('../Models/User');

//create a user using:  POST "/api/authorization"  
router.post('/',  (req, res)=> {
  console.log(req.body);
  const user= User(req.body);
  user.save()
  res.send(req.body);
})

module.exports = router;
// respond with "hello world" when a GET request is made to the homepage
