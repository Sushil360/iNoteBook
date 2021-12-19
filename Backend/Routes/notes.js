const express = require('express')
const router = express.Router();

router.get('/',  (req, res)=> {
    res.json([]);
})

module.exports = router;
// respond with "hello world" when a GET request is made to the homepage
