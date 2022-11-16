const mongoose = require("mongoose");

const Enquiry = mongoose.model( "Enquiry", new mongoose.Schema({

    name : String,
    email : String,
    mobile : String,
    query : String
})
);

module.exports = Enquiry;