const { verifyUser } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  const multer = require("multer")

  // Resume
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "app/resume/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })
  
  const uploadResume = multer({ storage: storage })

  // Study Material
  const studyMaterial= multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "app/studyMaterial/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })
  
  const uploadStudyMaterial = multer({ storage: studyMaterial })

  // Tasks
  const task = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "app/tasks/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })
  
  const uploadTask = multer({ storage: task })

  // =============Common Pages====================

  // Home page
  app.get("/home",
  controller.home
  )

  // Login page
  app.get("/login", (req,res)=>{
    res.render("login",{alerts: req.flash()});
  });

  // Register page
  app.get("/register", (req,res)=>{
    res.render("registration",{alerts: req.flash()});
  });

  // Logout any User
  app.get('/logout',(req,res)=>{
    req.session.destroy(function(err) {
      res.redirect('/home');
    })   
  })

  

// =============== Only Admin Pages ==================

// Admin Dashboard
app.get("/admin_dashboard",[verifyUser.isAdmin],(req,res)=>
{
  res.render('admin/admin_dashboard',{username:req.session.username});
});
 
// User list
app.get(
  "/user-list",
  [verifyUser.isAdmin],
  controller.getUserList
);

// Update user
app.get(
  "/admin/update/:id",
  [verifyUser.isAdmin],
  controller.updateUser
);
app.post(
  "/admin/updateUser/:id",
  [verifyUser.isAdmin],
  controller.updateUserDb
);

// Delete user
app.get(
  "/admin/delete/:id",
  [verifyUser.isAdmin],
  controller.deleteUser
)

// Showing Enquiry details to admin
app.get(
  "/getEnquiryList",
  [verifyUser.isAdmin],
  controller.getEnquiryList
)
// Delete Enquiry
app.get(
  "/admin/deleteEnquiry/:id",
  [verifyUser.isAdmin],
  controller.deleteEnquiry
)

// Get Notification
app.get(
  "/getNotifications",
  [verifyUser.isAdmin],
  controller.getNotifications
)

// Uploade Notification
app.get(
  "/uploadNotification",
  [verifyUser.isAdmin],
  (req,res)=>
  {
    res.render("admin/uploadNotification",{alerts:req.flash(),username:req.session.username});
  }
)
app.post(
  "/uploadNotification",
  [verifyUser.isAdmin],
  controller.uploadNotification
)

//  Update Notification
app.get(
  "/admin/updateNotification/:id",
  [verifyUser.isAdmin],
  controller.updateNotification1
)
app.post(
  "/updateNotification/:id",
  [verifyUser.isAdmin],
  controller.updateNotification
)

//  Delete Notification
app.get(
  "/admin/deleteNotification/:id",
  [verifyUser.isAdmin],
  controller.deleteNotification
)


// Code
//  Show code list
app.get(
  "/getCodeList",
  [verifyUser.isAdmin],
  controller.getCodeList
)

// upload code
app.get(
  "/uploadCode",
  [verifyUser.isAdmin],
  (req,res)=>
  {
    res.render("admin/uploadCode",{alerts:req.flash(),username:req.session.username});
  }
)
app.post(
  "/uploadCode",
  [verifyUser.isAdmin],
  controller.uploadCode
)

//  Update Code
app.get(
  "/admin/updateCode/:id",
  [verifyUser.isAdmin],
  controller.updateCodePage
)
app.post(
  "/updateCode/:id",
  [verifyUser.isAdmin],
  controller.updateCode
)

// delete Code
app.get(
  "/admin/deleteCode/:id",
  [verifyUser.isAdmin],
  controller.deleteCode
)

// Study Material
app.get(
  "/getStudyMaterial",
  [verifyUser.isAdmin],
  controller.getStudyMaterial
)

// Upload study material
app.get(
  "/uploadStudyMaterial",
  [verifyUser.isAdmin],
  (req,res)=>
  {
    res.render("admin/uploadStudyMaterial",{alerts:req.flash(),username:req.session.username});
  }
)
// app.post(
//   "/uploadStudyMaterial",
//   [verifyUser.isAdmin],
//   controller.uploadStudyMaterial
// )
app.post(
  "/uploadStudyMaterial",
  [verifyUser.isAdmin],
  uploadStudyMaterial.array("file",10),
  controller.uploadStudyMaterial
)

//  Update StudyMaterial
app.get(
  "/admin/updateStudyMaterial/:id",
  [verifyUser.isAdmin],
  controller.updateStudyMaterialPage
)
app.post(
  "/updateStudyMaterial/:id",
  [verifyUser.isAdmin],
  controller.updateStudyMaterial
)

// delete Study Material
app.get(
  "/admin/deleteStudyMaterial/:id",
  [verifyUser.isAdmin],
  controller.deleteStudyMaterial
)

// Resume list

app.get(
  "/resumeList",
  [verifyUser.isAdmin],
  controller.resumeList
)

// Tasks
app.get(
  "/completeTasks",
  [verifyUser.isAdmin],
  controller.completeTasks
)
app.get(
  "/incompleteTasks",
  [verifyUser.isAdmin],
  controller.incompleteTasks
)
app.get(
  "/inprogressTasks",
  [verifyUser.isAdmin],
  controller.inprogressTasks
)

// Upload tasks
app.get(
  "/uploadTask",
  [verifyUser.isAdmin],
  (req,res)=>{
    res.render("admin/uploadTask",{username:req.session.username,alerts:req.flash()})
  }
)

app.post(
  "/uploadTask",
  [verifyUser.isAdmin],
  uploadTask.array("file",10),
  controller.uploadTask
)

// update task
app.get(
  "/admin/updateTask/:id",
  verifyUser.isAdmin,
  controller.updateTaskPage
)
app.post(
  "/updateTask/:id",
  verifyUser.isAdmin,
  uploadTask.array("file",10),
  controller.updateTask
  )

// Delete Task
app.get(
  "/admin/deleteCompleteTask/:id",
  verifyUser.isAdmin,
  controller.deleteCompleteTask
)
app.get(
  "/admin/deleteIncompleteTask/:id",
  verifyUser.isAdmin,
  controller.deleteIncompleteTask
)
app.get(
  "/admin/deleteInprogressTask/:id",
  verifyUser.isAdmin,
  controller.deleteInprogressTask
)
// Email
app.get(
  "/email",
  [verifyUser.isAdmin],
  (req,res)=>{
    res.render("admin/email",{username:req.session.username});
  }
)
// Error page
app.get(
"/404page",
verifyUser.isAdmin,
controller.pageNotFound
);
// for flash messages
app.get("/message",(req,res)=>
{
  res.render("admin/404page",{alerts: req.flash()})
})
// --------------------------------------------------



// =============== Only User Pages ==================

app.get("/user_dashboard", [verifyUser.isUser],(req,res)=>
{
  res.render('user/user_dashboard',{username:req.session.username});
});

// Resume

app.get(
  "/uploadResume",
  verifyUser.isUser,
  (req,res)=>
  {
    res.render("user/uploadResume",{username:req.session.username,alerts:req.flash()});
  }
)
// Single File
// app.post("/uploadResume", uploadStorage.single("file"), (req, res) => {
//   console.log(req.file)
//   return res.send("Single file")
// })

//Multiple files
app.post("/uploadResume",
uploadResume.array("file", 10),
//   console.log(`Directory name is ${a}`);
//   console.log(req.files[0].path);
controller.uploadResume
);

// Code and Logics

app.get(
  "/codeLogic",
  controller.codeLogic
)

// Notification
app.get(
  "/getNotification",
  verifyUser.isUser,
  controller.getNotification
)

// Study Material
app.get(
  "/getStudyMaterialUser",
  [verifyUser.isUser],
  controller.getStudyMaterialUser
)


// Tasks
app.get(
  "/userCompleteTasks",
  [verifyUser.isUser],
  controller.userCompleteTasks
)
app.get(
  "/userIncompleteTasks",
  [verifyUser.isUser],
  controller.userIncompleteTasks
)
app.get(
  "/userInprogressTasks",
  [verifyUser.isUser],
  controller.userInprogressTasks
)

// update task
app.get(
  "/userUpdateTask/:id",
  verifyUser.isUser,
  controller.userUpdateTaskPage
)
app.post(
  "/userUpdateTask/:id",
  verifyUser.isUser,
  uploadTask.array("file",10),
  controller.userUpdateTask
  )

// --------------------------------------------------

};