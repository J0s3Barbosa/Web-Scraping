const jwt = require('jsonwebtoken');
const config = require("../config/config");


// module.exports = function ensureAuthenticated(req, res, next) {
//   // if (req.isAuthenticated()) {
//   //   return next();
//   // }
//   // req.flash('error_msg', 'Please log in to view that resource');
//   // res.redirect('/login');
// };

  module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, config.JWT_KEY);
      req.userData = decoded;
      req.flash('success_msg', 'User logged!');

      next();
    } catch (error) {
      req.flash('error_msg', 'Please log in to view that resource');
      return res.status(401).redirect('/login');
    }
  };


// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const decoded = jwt.verify(token, process.env.JWT_KEY);
//         req.userData = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             message: 'Auth failed'
//         });
//     }
// };