const config = require("../../config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
var bcrypt = require("bcryptjs");
const Enquiry = db.enquiry;

exports.signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    mobile: req.body.mobile,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)

  });
  user.save((err, user) => {
    if(err){
    if ( err.name == "ValidationError") {
      handleValidationError(err,req,req.body);
      if(!req.body.password)
      {
        req.flash('password',"Password field is required");
      }
      res.redirect('/register');
      // res.status(500).send({ message: err });
      return;
    }}
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (!user) {
              res.status(500).send({ message: err });
              return;
            }
            res.redirect("/login");
            // res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          // res.send({ message: "User was registered successfully!" });
          res.redirect("/login");
        });
      });
    }
  });
};
exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      // if (err) {
      //   res.status(500).send({ message: err });
      //   return;
      // }
      if (!user) {
   
        req.flash('error', `Credentials not matched, try again.`)
       return res.redirect("/login");
      //  return res.status(404).send({ message: "User Not found." });
    }
      
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {

        req.flash('error', `Credentials not matched, try again.`)
        return res.redirect("/login");
        // return res.status(401).send({
        //   accessToken: null,
        //   message: "Invalid Password!"
        // });
      }
    
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      if("ROLE_ADMIN" == authorities[0])
      {
        req.session.loggedin = "true";
        req.session.username = user.username;
        req.session.role=authorities[0];
        res.redirect("/admin_dashboard");

      }
      else
      {
        req.session.loggedin = "true";
        req.session.username = user.username;
        req.session.role=authorities[0];
        res.redirect("/user_dashboard");
        
      }
      // res.status(200).send({
        // id: user._id,
        // name: user.name,
        // username: user.username,
        // mobile: user.mobile,
        // email: user.email,
      //   roles: authorities,
      //   accessToken: token
      // });
    
    });
};
function handleValidationError(err,req,body)
{
   for(field in  err.errors)
   {
        switch (err.errors[field].path) {
            case 'name':
                req.flash('name', err.errors[field].message)
                break;
            case 'email':
              req.flash('email', err.errors[field].message)
                break;
            case 'mobile':
              req.flash('mobile', err.errors[field].message)
                break;
            case 'username':
              req.flash('username', err.errors[field].message)
                break;
            case 'password':
              req.flash('password', err.errors[field].message)
                break;      
            default:
        }
   }

}

exports.enquiry = (req, res) => {
  const enquiry = new Enquiry({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    query:req.body.query

  });

  enquiry.save((err, enquiry) => {
    if(err){
      res.status(500).send({ message: err });
      return;
    }
    // res.json(data);
    res.status(200).send({ status: 'Success' });
  });
};