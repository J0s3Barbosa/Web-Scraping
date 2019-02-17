
dbPassword = 'mongodb://appchto:'+ encodeURIComponent('Password!1') + '@ds237574.mlab.com:37574/node?retryWrites=true';
module.exports = {
    mongoURI: dbPassword
};
