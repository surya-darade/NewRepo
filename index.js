require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const session = require('express-session');
const hbs = require("hbs");
const path = require('path');
const bodyparser = require('body-parser');
var flash = require('connect-flash');
app.use(flash());

var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded());
// simple route

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


app.use(express.static('public'));

app.use(express.static('app/resume'));
app.use(express.static('app/studyMaterial'));
app.use(express.static('app/tasks'));


app.set('view engine', 'ejs');



app.set("views", __dirname + '/app/views/templates')
hbs.registerPartials(__dirname + 'app/views/partials')
app.use(express.urlencoded({extended:false}));


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Role = db.role;
db.mongoose
  // .connect(`mongodb://localhost:27017/app`, {
   .connect(`mongodb+srv://admin:admin@cluster0.wmsnhit.mongodb.net/app?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  app.get('/',(req,res)=>{
    res.redirect('/home');
})

app.use((req, res, next) => {
  // res.status(404).send(
  //     "<h1>Page not found on the server</h1>")
  res.render("404page");
})

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
