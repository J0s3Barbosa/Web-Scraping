const localStrategy = require("passport-local").Strategy;  
const User = require("../models/User");  
  
module.exports = function(passport){  
      
    passport.serializeUser(function(user, done){  
        done( null, user.id);  
    });  
  
    passport.deserializeUser(function(id, done){  
        User.findById(id, function(err, user){  
            done(err, user);  
        });  
    });  
  
    passport.use("local-signup", new localStrategy(  
        {   
            usernameField: "email",  
            passwordField: "password",  
            passReqToCallback: true  
        }, function(req, email, password, done){  
            process.nextTick(function(){  
                User.findOne({"local.username": email }, function(err, user){  
                    if (err) return done(err);  
                    if (user) return done(null, false, req.flash("signupMsg", "Email already exist"));  
                    else{  
                        var newuser = new User();  
                        newuser.local.username = email;  
                        newuser.local.password = newuser.generateHash(password);  
                        newuser.save(function(err){  
                            if (err) throw err;  
                            return done(null, newuser);  
                        });  
                    }   
                });  
            });  
        }  
    ));  
  
    passport.use("local-login", new localStrategy(  
        {   
            usernameField: "email",  
            passwordField: "password",  
            passReqToCallback: true  
        }, function(req, email, password, done){  
            process.nextTick(function(){  
                User.findOne({"local.username": email }, function(err, user){  
                    if (err) return done(err);  
                    if (!user) return done(null, false, req.flash("loginMsg", "User not found"));  
                    if (!user.validPassword(password)) return done(null, false, req.flash("loginMsg", "Password invalid"));  
                    return done(null, user);   
                });  
            });  
        }  
    ));  
};  
