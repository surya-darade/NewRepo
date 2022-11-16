const mongoose = require("mongoose");

const Code = mongoose.model( "Code", new mongoose.Schema({

    name : String,
    desc:String,
    code : String,
    date : String,
    status:String
})
);

module.exports = Code;