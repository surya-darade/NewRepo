const db = require("../models");
const mongoose = require("mongoose");
var fs = require('fs');
const path = require('path');
const User = db.user;
const Enquiry = db.enquiry;
const Notification = db.notification;
const Code = db.code;
const Study = db.study;
const Resume = db.resume;
const Task = db.tasks;

var bcrypt = require("bcryptjs");

// Common Pages

// Home page
exports.home = (req,res)=>{
    Notification.find({status: 'Show'}, function(err, result) {
        if (err) throw err;
          res.render('home',{notifications:result})

    });
}


// -----------Only Admin pages---------------

//  user list
exports.getUserList = async (req,res)=>{ 
    User.find({}, function(err, result) {
        if (err) throw err;
          res.render('admin/userlist',{users:result,alerts: req.flash(),username:req.session.username})

    });
};

// update user
exports.updateUser = async (req,res)=>{
    User.findById(req.params.id,function(err,result){
        res.render('admin/edituser',{results:result,username:req.session.username});
    });  
};

exports.updateUserDb = async (req, res)=> {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    await User.findByIdAndUpdate(req.params.id,req.body);
    req.flash("success","User Updated successfully")
    res.redirect('/user-list');
};

// Delete user
exports.deleteUser = async (req,res) =>
{
    await User.findByIdAndDelete(req.params.id);
    req.flash("success","User deleted successfully");
    res.redirect("/user-list");
}

// Enquiry list
exports.getEnquiryList = async (req,res)=>
{
    Enquiry.find({},function(err,result){
        if (err) throw err;
        res.render('admin/enquiryList',{enquiry:result,alerts: req.flash(),username:req.session.username});

    })
}
// Delete enquiry 
exports.deleteEnquiry = async (req,res)=>
{
    await Enquiry.findByIdAndDelete(req.params.id);
    req.flash("success","Enquiry deleted successfully");
    res.redirect("/getEnquiryList");
}

// Get Notification
exports.getNotifications =  (req,res)=>
{
    Notification.find({},function(err,result){
        if(err) throw err;
        res.render("admin/notificationList",{notification:result,alerts:req.flash(),username:req.session.username});
    }).clone().catch(function(err){ console.log(err)})
}

// Update notification
exports.updateNotification1 = async (req,res)=>{
    Notification.findById(req.params.id,function(err,result){
    res.render('admin/updateNotification',{results:result,alerts:req.flash(),username:req.session.username});
});
}
exports.updateNotification = async (req,res)=>
{
    await Notification.findByIdAndUpdate(req.params.id,req.body);
    req.flash("success","Notification Updated successfully")
    res.redirect('/getNotifications');
}
//  Delete Notification
exports.deleteNotification = async (req,res)=>
{
    await Notification.findByIdAndDelete(req.params.id);
    req.flash("success","Notification deleted successfully");
    res.redirect("/getNotifications");
}

// Upload Notification
exports.uploadNotification = async (req,res)=>
{
    const notification = new Notification({
        header: req.body.header,
        body: req.body.body,
        footer: req.body.footer,
        date:req.body.date,
        status:req.body.status
    
      });
    
    //   console.log(req.body);    
      notification.save((err, notification) => {
        if(err){
        //   res.status(500).send({ message: err });
        req.flash("error","Notification uploade Unsuccessful");
        res.redirect("/uploadNotification");
          return;
        }
        // res.json(data);
        // res.status(200).send({ status: 'Success' });
        req.flash("success","Notification uploaded successfully");
        res.redirect("/uploadNotification");
      });

}

//  Get Code list
exports.getCodeList = async (req,res)=>{
    await Code.find({},function(err,result){
        if(err) throw err;
        res.render("admin/codeList",{codes:result,alerts:req.flash(),username:req.session.username});
    }).clone().catch(function(err){ console.log(err)})
}

//  Upload code
exports.uploadCode = async (req,res)=>
{
    const code = new Code({
        name:req.body.name,
        desc:req.body.desc,
        code:req.body.code,
        date:req.body.date,
        status:req.body.status
    })

    code.save((err,code)=>{
        if(err) throw err;

        req.flash("success","Code inserted successfully");
        res.redirect("/getCodeList");
    })
}

// update code page
exports.updateCodePage = async (req,res)=>
{
    Code.findById(req.params.id,function(err,result){
    res.render('admin/updateCode',{results:result,alerts:req.flash(),username:req.session.username});  
})
}
exports.updateCode = async (req,res)=>{
    await Code.findByIdAndUpdate(req.params.id,req.body);
    req.flash("success","Code Updated successfully")
    res.redirect('/getCodeList');
}

//  Delete Code
exports.deleteCode = async (req,res)=>{
    await Code.findByIdAndDelete(req.params.id);
    req.flash("success","Code deleted successfully");
    res.redirect("/getCodeList");
}

// Study material

exports.getStudyMaterial = async (req,res)=>{

    await Study.find({},function(err,result){
        if(err) throw err;
        res.render("admin/studyMaterial",{studyMaterials:result,alerts:req.flash(),username:req.session.username});
    }).clone().catch(function(err){ console.log(err)})
}

//  Upload Study Material
exports.uploadStudyMaterial = async (req,res)=>
{
    // if(req.files[0].path==undefined)
    // {
    //     req.files[0].path="demoPath";
    // }
    // if(req.files[0].filename==undefined)
    // {
    //     req.files[0].filename="demoFileName";
    // }
    const directoryPath = path.join(`E:/VS Code/NodeJs/app/`, req.files[0].path);
    const study = new Study({
        name:req.body.name,
        desc:req.body.desc,
        code:req.body.code,
        date:req.body.date,
        video_link:req.body.video_link,
        path:directoryPath,
        fileName:req.files[0].filename,
        status:req.body.status
    })

    study.save((err,code)=>{
        if(err) throw err;

        req.flash("success","Study material inserted successfully");
        res.redirect("/getStudyMaterial");
    })
}

// update Study Material page
exports.updateStudyMaterialPage = async (req,res)=>
{
    Study.findById(req.params.id,function(err,result){
    res.render('admin/updateStudyMaterial',{results:result,alerts:req.flash(),username:req.session.username});  
})
}
exports.updateStudyMaterial = async (req,res)=>{
    await Study.findByIdAndUpdate(req.params.id,req.body);
    req.flash("success","Study material Updated successfully")
    res.redirect('/getStudyMaterial');
}

//  Delete study Material
exports.deleteStudyMaterial = async (req,res)=>{
    await Study.findByIdAndDelete(req.params.id);
    req.flash("success","Study material deleted successfully");
    res.redirect("/getStudyMaterial");
}

// Resume List

exports.resumeList = async  (req,res)=>{
    await Resume.find({},(err,result)=>
    {
        if(err) throw err;
        res.render("admin/resumeList",{resumes:result,username:req.session.username,alerts:req.flash()});
    }).clone().catch(function(err){ console.log(err)})
    
  }

exports.completeTasks = async (req,res)=>{
    await Task.find({status:"Completed"},(err,result)=>{
        if(err) throw err;
        res.render("admin/completeTasks",{tasks:result,username:req.session.username,alerts:req.flash()});
    }).clone().catch(function(err){ console.log(err)})
}
exports.incompleteTasks = async (req,res)=>{
    await Task.find({status:"Incompleted"},(err,result)=>{
        if(err) throw err;
        res.render("admin/incompleteTasks",{tasks:result,username:req.session.username,alerts:req.flash()});
    }).clone().catch(function(err){ console.log(err)})
}

exports.inprogressTasks = async (req,res)=>{
    await Task.find({status:"Inprogress"},(err,result)=>{
        if(err) throw err;
        res.render("admin/inprogressTasks",{tasks:result,username:req.session.username,alerts:req.flash()});
    }).clone().catch(function(err){ console.log(err)})
}

exports.uploadTask = async (req,res)=>{


    const directoryPath = path.join(`E:/VS Code/NodeJs/app/`, req.files[0].path);
    const task = new Task({
        title:req.body.title,
        desc:req.body.desc,
        body:req.body.task,
        username:req.body.username,
        start_time:req.body.start_date,
        end_time:req.body.end_date,
        date:req.body.date,
        path:directoryPath,
        file_name:req.files[0].filename,
        status:req.body.status
    })

    task.save((err,code)=>{
        if(err) throw err;
          req.flash('success',"Task uploaded successfully");
        //   console.log(req.files);
          res.redirect('/uploadTask');
    })
}

// Update task
exports.updateTaskPage = async (req,res)=>
{
    Task.findById(req.params.id,function(err,result){
    res.render('admin/updateTask',{results:result,alerts:req.flash(),username:req.session.username});  
})
}
exports.updateTask = async (req,res)=>{
    const directoryPath = path.join(`E:/VS Code/NodeJs/app/`, req.files[0].path);
    await Task.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        desc:req.body.desc,
        body:req.body.task,
        username:req.body.username,
        start_time:req.body.start_date,
        end_time:req.body.end_date,
        date:req.body.date,
        path:directoryPath,
        file_name:req.files[0].filename,
        status:req.body.status

    });
    req.flash("success","Task Updated successfully");
    if(req.body.status == "Completed" )
    {
        res.redirect('/completeTasks');
    }
    if(req.body.status == "Incompleted")
    {
        res.redirect('/incompleteTasks');
    }
    if(req.body.status == "Inprogress")
    {
        res.redirect('/inprogressTasks');
    }
}

exports.deleteCompleteTask = async (req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    req.flash("success","Task Deleted successfully");
    res.redirect('/completeTasks');
}
exports.deleteIncompleteTask = async (req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    req.flash("success","Task Deleted successfully");
    res.redirect('/incompleteTasks');
}
exports.deleteInprogressTask = async (req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    req.flash("success","Task Deleted successfully");
    res.redirect('/inprogressTasks');
}
//  Error pages
exports.pageNotFound = async (req,res)=>
{
    req.flash('success', `You've been successfully redirected to the Message route!`);
    req.flash('error', `You've been successfully redirected to the Message route!`);
    req.flash('abc', `abc redirected to the Message route!`);
    req.flash('error', `You've been successfully!`);
    res.redirect('/message');
};
// -------------------------------

// ----------------Only User Pages---------------------------
exports.saveService = (req, res) => {
    res.send(req.flash('success'));
};

exports.uploadResume = async (req,res)=>{
    User.findOne({
        username: req.body.username
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        const directoryPath = path.join(`E:/VS Code/NodeJs/app/`, req.files[0].path);
        if (user) {

            const resume = new Resume({
                name:req.body.name,
                username:req.body.username,
                date:req.body.date,
                path:directoryPath,
                fileName:req.files[0].filename

            })

        resume.save((err,code)=>{
            if(err) throw err;
          req.flash('success',"Resume uploaded with your Username");
        //   console.log(req.files);
          res.redirect('/uploadResume');
        });
          
        }
        else{
            req.flash("error","Username is not exist, Please enter your registered Username");
            
            fs.unlink(directoryPath, function (err) {
                if (err) throw err;
                // console.log('File deleted!');
            });
            res.redirect('/uploadResume');
        }
        
      });
    
}

exports.codeLogic = async (req,res)=>{

    await Code.find({status:"Show"},(err,result)=>{
        if(err) throw err;

        res.render("user/codeList",{username:req.session.username,codes:result})
    }).clone().catch(function(err){ console.log(err)})
}

exports.getNotification = async (req,res)=>{
    Notification.find({},function(err,result){
        if(err) throw err;
        res.render("user/notifications",{notification:result,username:req.session.username});
    }).clone().catch(function(err){ console.log(err)})

}

exports.getStudyMaterialUser = async (req,res)=>{

    await Study.find({},function(err,result){
        if(err) throw err;
        res.render("user/studyMaterial",{studyMaterials:result,username:req.session.username});
    }).clone().catch(function(err){ console.log(err)})
};

exports.userCompleteTasks = async (req,res)=>{

    await User.findOne({name:req.session.username},function(err,result)
    {
        if(err)
        {
            req.flash(err);
            return;
        }
        else{

            Task.find({status:"Completed",username:req.session.username},(err,result)=>{
                if(err) throw err;
                res.render("user/completeTasks",{tasks:result,username:req.session.username,alerts:req.flash()});
            }).clone().catch(function(err){ console.log(err)})
        }

    }).clone().catch(function(err){ console.log(err)})

};

exports.userIncompleteTasks = async (req,res)=>{

    await User.findOne({name:req.session.username},function(err,result)
    {
        if(err)
        {
            req.flash(err);
            return;
        }
        else{

            Task.find({status:"Incompleted",username:req.session.username},(err,result)=>{
                if(err) throw err;
                res.render("user/incompleteTasks",{tasks:result,username:req.session.username,alerts:req.flash()});
            }).clone().catch(function(err){ console.log(err)})
        }

    }).clone().catch(function(err){ console.log(err)})
};

exports.userInprogressTasks = async (req,res)=>{

    await User.findOne({name:req.session.username},function(err,result)
    {
        if(err)
        {
            req.flash(err);
            return;
        }
        else{

            Task.find({status:"Inprogress",username:req.session.username},(err,result)=>{
                if(err) throw err;
                res.render("user/inprogressTasks",{tasks:result,username:req.session.username,alerts:req.flash()});
            }).clone().catch(function(err){ console.log(err)})
        }

    }).clone().catch(function(err){ console.log(err)})

};

exports.userUpdateTaskPage = async (req,res)=>{

    Task.findById(req.params.id,function(err,result){
        res.render('user/updateTask',{results:result,alerts:req.flash(),username:req.session.username});  
    })
};

exports.userUpdateTask = async (req,res)=>{

    const directoryPath = path.join(`E:/VS Code/NodeJs/app/`, req.files[0].path);
    await Task.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        desc:req.body.desc,
        body:req.body.task,
        username:req.body.username,
        start_time:req.body.start_date,
        end_time:req.body.end_date,
        date:req.body.date,
        path:directoryPath,
        file_name:req.files[0].filename,
        status:req.body.status

    });
    req.flash("success","Task Updated successfully");
    if(req.body.status == "Completed" )
    {
        res.redirect('/userCompleteTasks');
    }
    if(req.body.status == "Incompleted")
    {
        res.redirect('/userIncompleteTasks');
    }
    if(req.body.status == "Inprogress")
    {
        res.redirect('/userInprogressTasks');
    }
};
// -------------------------------
