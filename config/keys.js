
let user = 'testcase'
let pwd = 'Password!test1'
let PartMongoDBURI = '@ds151066.mlab.com:51066/testcase'

MongoDBURI = 'mongodb://'+user +':'+ encodeURIComponent(pwd) + PartMongoDBURI;
module.exports = {
    mongoURI: MongoDBURI
};
//TODO
// add ur user and password from your MongoDB https://mlab.com/ 