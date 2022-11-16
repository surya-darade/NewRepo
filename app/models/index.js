const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.enquiry = require("./enquiry.model");
db.notification = require("./notification.model");
db.code = require("./code.model");
db.study = require("./studyMaterial.model");
db.resume = require("./resume.model");
db.tasks = require("./tasks.model");
db.ROLES = ["user", "admin"];
module.exports = db;