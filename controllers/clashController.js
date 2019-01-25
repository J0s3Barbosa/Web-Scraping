const ClashRoyale = require('../models/cr');
const request_promise = require('request-promise');
const $ = require('cheerio');

// Display list of all clashroyale.
exports.getClashRoyaleList = function (req, res) {
    ClashRoyale.find({}, (err, clashroyale) => {
        if (err) {
            res.send(err);
        }

        res.json(clashroyale);
    });

};


// Display detail page for a specific ClashRoyale.
exports.clashroyale_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: ClashRoyale detail: ' + req.params.id);
};

// Display ClashRoyale create form on GET.
exports.clashroyale_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: ClashRoyale create GET');
};

exports.clashroyale_create_post = function (req, res) {

    let newClash = new ClashRoyale(req.body);
    if (req.body == 'undefined') {
        return false
    }
    newClash.save((err, clashroyale) => {
        if (err) {
            res.send(err);
        }
        res.json(clashroyale);
    });

};

exports.clashroyale_createMethod_post = function (req, res) {

    let newClash = new ClashRoyale(req.body);

    newClash.save((error, clashroyale) => {
        if (error) {
            // res.send(error);
            res.render('pages/indexcr', {
                error: error
              }
            )
        }
       
        res.render('pages/indexcr'
        )
        // res.redirect('/cr');
      
    });
   
};


// Display ClashRoyale delete form on GET.
exports.clashroyale_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: ClashRoyale delete GET');
};

// Handle ClashRoyale delete on POST.
exports.clashroyale_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: ClashRoyale delete POST');
};

// Display ClashRoyale update form on GET.
exports.clashroyale_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: ClashRoyale update GET');
};

// Handle ClashRoyale update on POST.
exports.clashroyale_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: ClashRoyale update POST');
};

var crObj = {
    Player: String,
    Highest_Trophies: Number,
    Trophies: Number,
    Wins: Number,
    Losses: Number

}
// Display list of all clashroyale.
exports.getClashRoyale_Api = function (req, res) {
    var clashRoyaleUrl = "https://statsroyale.com/profile/9JUUVGLQQ";
    var toSearchTemp = "";
    request_promise(clashRoyaleUrl)
        .then(function (html) {
            crObj.Player = $('.profileHeader__nameCaption', html).text();
            res.send(crObj);

        })


};

