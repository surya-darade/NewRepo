const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const bodyparser = require('body-parser');

checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      req.flash('email',"Email is already in use!");
      res.redirect('/register');
      // res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
    next();
  });
};
checkDuplicateUser = (req, res, next) => {
   // username
   User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      req.flash('username',"Username is already in use!");
      // res.status(400).send({ message: "Failed! Username is already in use!" });
      res.redirect('/register');
      return;
    }
    next();
  });
};

checkExistingEmail = (req,res, next) => {
  // Email
  console.log(req.body.email);
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      next();
    }
    else
    {
      req.flash('error',"Email is Not exist");
      res.redirect('/uploadResume');
      return;
    }
    
  });
};
const verifySignUp = {
  checkDuplicateEmail,
  checkDuplicateUser,
  checkExistingEmail 
};
module.exports = verifySignUp;