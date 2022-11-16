
isAdmin = (req, res, next) => {
    if (req.session.loggedin == "true" && req.session.role == "ROLE_ADMIN") {
        // console.log(req.session.role)
        next();
    }
    else {
        // res.send({ message: "Your are not Admin!" });
        res.render("admin/permissiondenied");
        return;
    }
};

isUser = (req, res, next) => {

    if (req.session.loggedin == "true" && req.session.role == "ROLE_USER") {
        // console.log(req.session.role)
        next();
    }
    else {
        res.render("user/permissiondenied");
        res.send({ message: "Your are not User!" });

        return;
    }
};

const verifyUser = {
    isUser,
    isAdmin
};
module.exports = verifyUser;
