const mongoose = require("mongoose");

const Notification = mongoose.model( "Notification", new mongoose.Schema({

    header : String,
    body : String,
    footer : String,
    date : String,
    status:String
})
);

module.exports = Notification;