const mongoose = require('mongoose');
//const mongoURI = 'mongodb+srv://iNotebook:iNotebook123@cluster0.whysk.mongodb.net/?retryWrites=true&w=majority'
const mongoURI = 'mongodb+srv://iNotebook:iNotebook123@cluster0.hdtiysa.mongodb.net/?retryWrites=true&w=majority'
const connectToMongoDb =()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongoDb")
    })
}

module.exports = connectToMongoDb;