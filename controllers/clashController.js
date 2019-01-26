const ClashRoyale = require('../models/cr');

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
    ClashRoyale.findById(req.params.id, function (err, clashroyale) {
        if (err)
            res.send(err);
        res.json(clashroyale);
    });

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

        res.redirect('/cr');

    });

};


// Display ClashRoyale delete form on GET.
exports.clashroyale_delete_get = function (req, res) {

    ClashRoyale.findByIdAndRemove(req.params.id, function (err, clashroyale) {
        if (err) {
            res.send(err);
        }
        res.redirect('/cr');

    });

    // res.send('NOT IMPLEMENTED: ClashRoyale delete GET');
};

// Handle ClashRoyale delete on POST.
exports.clashroyale_delete_post = function (req, res) {
    ClashRoyale.findByIdAndRemove(req.params.id, function (err, clashroyale) {
        if (err)
            res.send(err);
        res.json(clashroyale);
    });

};

// Display ClashRoyale update form on GET.
exports.clashroyale_update_get = function (req, res) {
    ClashRoyale.findOneAndUpdate(req.params._id, req.body, { new: true }, function (err, clashroyale) {
        if (err)
            res.send(err);
        res.json(clashroyale);
    });
};

// Handle ClashRoyale update on POST.
exports.clashroyale_update_post = function (req, res) {

    ClashRoyale.findOneAndUpdate(req.params._id, req.body, { new: true }, function (err, clashroyale) {
        if (err) {

            res.send(err);
        }
        res.json(clashroyale);
    });

};

// // get the user starlord55
// User.find({ username: 'starlord55' }, function(err, user) {
//     if (err) throw err;
  
//     // delete him
//     user.remove(function(err) {
//       if (err) throw err;
  
//       console.log('User successfully deleted!');
//     });
//   });
  