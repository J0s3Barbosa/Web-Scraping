const ClashRoyale = require("../models/cr");
const request_promise = require("request-promise");
var request = require("request");
var cheerio = require("cheerio");
const puppeteer = require("puppeteer");

var obj = [];

exports.cr = function(req, res) {
  try {
    res.render("pages/indexcr", {
      user: req.user
    });
  } catch (error) {
    console.log(error);
  }
};

// Display data for user.
exports.getClashRoyaleListOwner = function(req, res) {
  // var orderby = req.param("orderby");
  try {
    var mysort = "";
    var sort_query = "";

    switch (sort_query) {
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

    ClashRoyale.find(myfind, (err, clashroyale) => {
      if (err) {
        res.send(err);
      }

      res.json(clashroyale);
    }).sort(mysort);
  } catch (error) {
    console.log(error);
    req.flash("error_msg", error);
    res.json(error);
  }
};

// Display list of all clashroyale.
exports.getClashRoyaleList = function(req, res) {
  // var orderby = req.param("orderby");

  var mysort = "";
  var sort_query = "";

  switch (sort_query) {
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
  var myfind = {};

  ClashRoyale.find(myfind, (err, clashroyale) => {
    if (err) {
      res.send(err);
    }

    res.json(clashroyale);
  }).sort(mysort);
};


// Display detail page for a specific ClashRoyale.
exports.clashroyale_detail = function(req, res) {
  ClashRoyale.findById(req.params.id, function(err, clashroyale) {
    if (err) res.send(err);

    res.json(clashroyale);
  });
};

// Display detail page for a specific ClashRoyale.
exports.clashroyale_detail_name = function(req, res) {

  var myfind = "";
  if (req.user == undefined || req.user == null) {
    myfind = { Name: "no Name" };
  } else if (req.user != undefined || req.user != null) {
      myfind = { Name: req.user.Name };
  }

  ClashRoyale.findOne(myfind, function(err, clashroyale) {
    if (err) res.send(err);

    res.json(clashroyale);
  });
};

exports.clashroyale_OrderBy = function(req, res) {
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
  ClashRoyale.find(myfind, function(err, clashroyale) {
    if (err) res.send(err);

    res.json(clashroyale);
  }).sort(mysort);
};


exports.clashroyale_createMethod_post = function(req, res) {
  try {
    let newClash = new ClashRoyale(req.body);
    newClash.Owner = req.user.email;

    newClash.save((error, clashroyale) => {
      if (error) {
        req.flash("error_msg", error);
        return error;
      }
      if (
        clashroyale != "" ||
        clashroyale != undefined ||
        clashroyale != "undefined"
      ) {
        req.flash("success_msg", "Data Inserted!");
        res.json(clashroyale);
      }
    });
  } catch (error) {
    console.log(error);
    req.flash("error_msg", error);
    res.json(error);
  }
};
// Handle ClashRoyale update on POST.
exports.clashroyale_update_post = function(req, res) {
  try {
    ClashRoyale.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function(err, clashroyale) {
        if (err) res.send(err);

        req.flash("success_msg", "Data Updated!");
        res.json(clashroyale);
      }
    );
  } catch (error) {
    console.log(error);
    req.flash("error_msg", error);
    res.json(error);
  }
};
// Handle ClashRoyale delete on POST.
exports.clashroyale_delete_post = function(req, res) {
  try {
    ClashRoyale.findByIdAndRemove(req.params.id, function(err, clashroyale) {
      if (err) res.send(err);
      req.flash("success_msg", "Data Deleted!");
      res.json(clashroyale);
    });
  } catch (error) {
    console.log(error);
    req.flash("error_msg", error);
    res.json(error);
  }
};

exports.clashroyaleapi = async function(req, res) {
  try {
    var clashRoyaleUrl = [
      "https://statsroyale.com/profile/9JUUVGLQQ",
      "https://statsroyale.com/profile/9UG2R28R2",
      "https://statsroyale.com/profile/QCYVUL",
      "https://statsroyale.com/profile/2R900UR",
      "https://statsroyale.com/profile/UULQLJU"
    ];

    var listcr = [];
    await Promise.all(
      clashRoyaleUrl.map(async cr_url => {
        let result = await clashroyaleStatus(cr_url);
        listcr.push(result);
      })
    );

    res.send(listcr);
  } catch (error) {
    console.log("catch Error => " + error);
  }
};

exports.ClashRoyaleClickAndGetPrint = function(req, res) {
  try {
    var url = "https://statsroyale.com/profile/9JUUVGLQQ";
    var elementToClick = ".profile__refreshNotificationButton";
    var path_mouse_click_png = "9JUUVGLQQ_status.png";
    ClickAndGetPrint(url, elementToClick, path_mouse_click_png);
  } catch (error) {
    console.log("catch Error => " + error);
  }
};

async function ClickAndGetPrint(url, elementToClick, path_mouse_click_png) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // go to a page setup for mouse event tracking
    await page.goto(url);
    console.log("goto Done!" + url);

    // click an area
    // await page.mouse.click(132, 103, { button: 'left' })
    await page.click(elementToClick, { button: "left" });
    console.log("click Done!");

    await browser.close();
    console.log("browser.close Done!");
  } catch (error) {
    console.log("catch Error => " + error);
  }
}

function clashroyaleStatus_old(clashRoyaleUrl) {
  try {
    const options = {
      uri: clashRoyaleUrl,
      transform: function(body) {
        return cheerio.load(body);
      }
    };

    request_promise(options).then($ => {
      var Player = $(".profileHeader__nameCaption")
        .eq(0)
        .text();
      var Highest_Trophies = $("div #profile-metrics .ui__headerExtraSmall")
        .eq(0)
        .html();
      var Trophies = $("div #profile-metrics .ui__headerExtraSmall")
        .eq(1)
        .html();
      var userLevel = $(".profileHeader__userLevel").html();
      var favouriteCardName = $(".profile__favouriteCardName").html();
      // var Winrate = $('.decks__metricValue').html();
      var crStatusObj = {
        Player: String,
        Highest_Trophies: Number,
        Trophies: Number,
        userLevel: Number,
        favouriteCardName: String
      };
      (crStatusObj.Player = Player.replace("\n", "")),
        (crStatusObj.Highest_Trophies = Highest_Trophies),
        (crStatusObj.Trophies = Trophies),
        (crStatusObj.userLevel = userLevel),
        (crStatusObj.favouriteCardName = favouriteCardName);
      // 'Winrate': Winrate,

      if (obj.length == 0) {
        obj.push(crStatusObj);
      } else if (obj.length > 0) {
        var playerexists = false;
        obj.forEach(element => {
          if (element.Player === crStatusObj.Player) {
            playerexists = true;
          }
        });
        if (!playerexists) {
          obj.push(crStatusObj);
        }
      }
    });
  } catch (error) {
    console.log("catch Error => " + error);
  }
  return obj;
}

function clashroyaleStatus(clashRoyaleUrl) {
  // const clashRoyaleUrl = 'https://statsroyale.com/profile/9JUUVGLQQ';
  return new Promise(function(resolve, reject) {
    request(clashRoyaleUrl, function(err, response, body) {
      if (err) reject(err);
      if (response.statusCode !== 200) {
        reject("Invalid status code: " + response.statusCode);
      }
      let $ = cheerio.load(body);

      var Player = $(".profileHeader__nameCaption")
        .eq(0)
        .text();
      var Highest_Trophies = $("div #profile-metrics .ui__headerExtraSmall")
        .eq(0)
        .html();
      var Trophies = $("div #profile-metrics .ui__headerExtraSmall")
        .eq(1)
        .html();
      var userLevel = $(".profileHeader__userLevel").html();
      var favouriteCardName = $(".profile__favouriteCardName").html();

      var Cr_Player_status = {
        Player: String,
        Highest_Trophies: Number,
        Trophies: Number,
        userLevel: Number,
        favouriteCardName: String,
        statsroyaleprofile: String
      };
      (Cr_Player_status.Player = Player.replace("\n", "")),
        (Cr_Player_status.Highest_Trophies = Highest_Trophies),
        (Cr_Player_status.Trophies = Trophies),
        (Cr_Player_status.userLevel = userLevel),
        (Cr_Player_status.favouriteCardName = favouriteCardName);
      Cr_Player_status.statsroyaleprofile = clashRoyaleUrl;

      // let channels = [];
      // channels.push(Cr_Player_status);
      resolve(Cr_Player_status);
    });
  });
}

function cr_status_page_update(url, elementToClick, path_mouse_click_png) {
  try {
    async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // set the viewport so we know the dimensions of the screen
      await page.setViewport({ width: 800, height: 600 });

      // go to a page setup for mouse event tracking
      await page.goto(url);

      // click an area
      // await page.mouse.click(132, 103, { button: 'left' })
      await page.click(elementToClick);

      // the screenshot should show feedback from the page that right part was clicked.
      await page.screenshot({ path: path_mouse_click_png });
      await browser.close();
      console.log("cr_status_page_update Done!");
    };
  } catch (error) {
    console.log("catch Error => " + error);
  }
}
