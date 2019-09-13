const Todo = require("../models/todo");

exports.index = function(req, res) {
  try {
    res.render("pages/indexTodo", {
      user: req.user
    });
  } catch (error) {
    console.log(error);
  }
};
exports.all = function(req, res) {
  try {
    var mysort = "";
    var myfind = "";
        myfind = {};

    Todo.find(myfind, (err, todo) => {
      if (err) {
        res.send(err);
      }

      res.json(todo);
    }).sort(mysort);
  } catch (error) {
    console.log(error);
    req.flash("error_msg", error);
    res.json(error);
  }
};
exports.detail = function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (err) res.send(err);

    res.json(todo);
  });
};
exports.detail_name = function(req, res) {

  var myfind = "";
  if (req.user == undefined || req.user == null) {
    myfind = { Name: "no Name" };
  } else if (req.user != undefined || req.user != null) {
      myfind = { Name: req.user.Name };
  }

  Todo.findOne(myfind, function(err, todo) {
    if (err) res.send(err);

    res.json(todo);
  });
};
exports.OrderBy = function(req, res) {
  var mysort = "";
  var orderby = req.params.orderby;

  switch (orderby) {
    case "Trophies":
      mysort = { Trophies: -1 };
      break;

    case "Victory":
      mysort = { Victory: -1 };
      break;

    case "Defeat":
      mysort = { Defeat: -1 };
      break;

    default:
      mysort = { Played_at: -1 };
      break;
  }
  var myfind = "";
  if (req.user == undefined || req.user == null) {
    myfind = { Owner: "Owner" };
  } else if (req.user != undefined || req.user != null) {
    if (req.user.permission) {
      myfind = {};
    } else {
      myfind = { Owner: req.user.email };
    }
  }
  Todo.find(myfind, function(err, todo) {
    if (err) res.send(err);

    res.json(todo);
  }).sort(mysort);
};
exports.post = function(req, res) {
  try {
    let newTodo = new Todo(req.body);
    newTodo.Owner = req.user.email;

    newTodo.save((error, todo) => {
      if (error) {
        req.flash("error_msg", error);
        return error;
      }
      if (
        todo != "" ||
        todo != undefined ||
        todo != "undefined"
      ) {
        req.flash("success_msg", "Data Inserted!");
        res.json(todo);
      }
    });
  } catch (error) {
    console.log(error);
    req.flash("error_msg", error);
    res.json(error);
  }
};
exports.update = function(req, res) {
  try {
    Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function(err, todo) {
        if (err) res.send(err);

        req.flash("success_msg", "Data Updated!");
        res.json(todo);
      }
    );
  } catch (error) {
    console.log(error);
    req.flash("error_msg", error);
    res.json(error);
  }
};
exports.delete = function(req, res) {
  try {
    Todo.findByIdAndRemove(req.params.id, function(err, todo) {
      if (err) res.send(err);
      req.flash("success_msg", "Data Deleted!");
      res.json(todo);
    });
  } catch (error) {
    console.log(error);
    req.flash("error_msg", error);
    res.json(error);
  }
};

