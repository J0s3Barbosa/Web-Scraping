const User = require("../models/user");

module.exports = {
  ensureAuthenticatedAdmin: function(req, res, next) {
    if (req.isAuthenticated()) {
    
          if (req.user.manager) {
          return  next();
    }
    }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/users/login");
  }
};
