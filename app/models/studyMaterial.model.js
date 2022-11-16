const mongoose = require("mongoose");

const StudyMaterial = mongoose.model( "StudyMaterial", new mongoose.Schema({

    name : String,
    desc:String,
    code : String,
    date : String,
    video_link:String,
    path:String,
    fileName:String,
    status:String
})
);

module.exports = StudyMaterial;