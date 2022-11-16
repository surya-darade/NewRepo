const mongoose = require("mongoose");

const Tasks = mongoose.model("Tasks", new mongoose.Schema({
    title:String,
    desc:String,
    body:String,
    username:String,
    date:String,
    start_time:String,
    end_time:String,
    path:String,
    file_name:String,
    status:String
})
);

module.exports = Tasks;