const mongoose = require("mongoose");

const Resume = mongoose.model( "Resume", new mongoose.Schema({

    name : String,
    username:String,
    path : String,
    date : String,
    fileName:String
    
})
);

module.exports = Resume;