var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'appchtonodejs@gmail.com',
    pass: 'Password!1nodeapp'
  }
});

var mailOptions = {
  from: 'appchtonodejs@gmail.com',
  to: 'appchtonodejs@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
var mailOptionsAccess = {
  from: 'appchtonodejs@gmail.com',
  to: 'appchtonodejs@gmail.com',
  subject: 'Node App Access',
  text: 'App accessed at ' + Date()
};

var mailOptionsError = {
  from: 'appchtonodejs@gmail.com',
  to: 'appchtonodejs@gmail.com',
  subject: 'Node App Error at ' + Date(),
  text: ''
};
exports.SendEmailDefault = function () {

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
exports.SendEmailAccess = function () {

  transporter.sendMail(mailOptionsAccess, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
exports.SendEmailError = function (error) {
  mailOptionsError.text += error
      console.log(mailOptionsError.text);
      transporter.sendMail(mailOptionsError, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}