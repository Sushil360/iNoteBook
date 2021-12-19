const express = require('express')
const router = express.Router();

router.get('/',  (req, res)=> {
    obj={
        a: 'sushil',
        Number: 34
    }
    res.json(obj);
})

module.exports = router;
// respond with "hello world" when a GET request is made to the homepage
