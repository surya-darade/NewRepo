const mongoose = require("mongoose"),Schema= mongoose.Schema;

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { 
      type: Schema.Types.String, 
      required: 'Name field is required' 
  },
    mobile: {  
      type: Schema.Types.String, 
      required: 'Mobile number field is required' 
  },
    email: {
      type: Schema.Types.String,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },

    password: {  
      type: Schema.Types.String, 
      required: 'Mobile number field is required'  
  },
  username: { 
    type: Schema.Types.String,
    required: 'Username field is required'
},
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);
module.exports = User;