//const mongoose = require('mongoose');
import mongoose from 'mongoose';
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: date,
        default: date.now
    }
  });

  module.exports = mongoose.model('notes',NoteSchema);