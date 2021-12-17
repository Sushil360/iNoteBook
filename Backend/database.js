const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

const connectToMongoDb =()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongoDb")
    })
}

module.exports = connectToMongoDb;