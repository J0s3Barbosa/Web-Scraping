// const User = require("../models/User");  
  
module.exports = function(app, passport){  
  
    app.get("/signup", function(req, res){  
        res.render("./partials/signup.ejs", { message: req.flash("signupMsg") });  
    });  
  
    app.post("/signup", passport.authenticate("local-signup", {  
        successRedirect: "/",  
        failureRedirect: "/signup",  
        failureFlash: true  
    }));  
      
    app.get("/login", function(req, res){  
        res.render("./partials/login.ejs", { message: req.flash("loginMsg") });  
    });  
      
    app.post("/login", passport.authenticate("local-login", {  
        successRedirect: "/profile",  
        failureRedirect: "/login",  
        failureFlash: true  
    }));  
  
    app.get("/profile", isLoggedIn, function(req, res){  
        res.render("./partials/profile.ejs", { user : req.user });  
    });  
  
    app.get("/logout", function(req, res){  
        req.logout();  
        res.redirect("/");  
    });  
};  
  
function isLoggedIn(req, res, next){  
    if(req.isAuthenticated()) return next();  
    res.redirect("/login");  
}  
