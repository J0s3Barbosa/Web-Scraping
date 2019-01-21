const ClashRoyale = require('../models/cr');

// Display list of all clashroyale.
exports.getClashRoyaleList = function(req, res) {
    ClashRoyale.find({}, (err, clashroyale) => {
        if (err) {
            res.send(err);
        }
        res.json(clashroyale);
    });

};
 


// Display detail page for a specific ClashRoyale.
exports.clashroyale_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: ClashRoyale detail: ' + req.params.id);
};

// Display ClashRoyale create form on GET.
exports.clashroyale_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: ClashRoyale create GET');
};

exports.clashroyale_create_post = function(req, res) {

    let newClash = new ClashRoyale(req.body);

    newClash.save((err, clashroyale) => {
        if (err) {
            res.send(err);
        }
        res.json(clashroyale);
    });

};

// Display ClashRoyale delete form on GET.
exports.clashroyale_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: ClashRoyale delete GET');
};

// Handle ClashRoyale delete on POST.
exports.clashroyale_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: ClashRoyale delete POST');
};

// Display ClashRoyale update form on GET.
exports.clashroyale_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: ClashRoyale update GET');
};

// Handle ClashRoyale update on POST.
exports.clashroyale_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: ClashRoyale update POST');
};