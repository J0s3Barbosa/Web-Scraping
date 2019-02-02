const ClashRoyale = require('../models/cr');
const request_promise = require('request-promise')
var request = require('request');
var cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const jwt = require('jsonwebtoken');

var obj = [];
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
        // var link = '/api/v1/clashRoyale/cr'
        // res.redirect(link);
        res.json(clashroyale);

    });

};


// Display ClashRoyale delete form on GET.
exports.clashroyale_delete_get = function (req, res) {

    ClashRoyale.findByIdAndRemove(req.params.id, function (err, clashroyale) {
        if (err) {
            res.send(err);
        }
        // var link = '/api/v1/clashRoyale/cr'
        // res.redirect(link);
        res.send({ status: 200, DataDeleted: clashroyale })
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

    // jwt.verify(req.token, 'secretkey', (err, authData) => {
    //     if (err) {
    //         res.sendStatus(403);
    //     } else {
    //         ClashRoyale.findByIdAndRemove(req.params.id, function (err, clashroyale) {
    //             if (err)
    //                 res.send(err);
    //             res.json(clashroyale);
    //         });
    //     }
    // })

};

// Display ClashRoyale update form on GET.
exports.clashroyale_update_get = function (req, res) {
    ClashRoyale.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, clashroyale) {
        if (err)
            res.send(err);
        res.json(clashroyale);
    });
};

// Handle ClashRoyale update on POST.
exports.clashroyale_update_post = function (req, res) {
    ClashRoyale.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, clashroyale) {
        if (err) res.send(err);

        res.json(clashroyale);
    });

};
exports.cr = function (req, res) {
    try {
        res.render('pages/indexcr')
    } catch (error) {
        console.log(error)
    }
}

exports.clashroyaleapi = async function (req, res) {
    try {
        var clashRoyaleUrl = ["https://statsroyale.com/profile/9JUUVGLQQ",
            "https://statsroyale.com/profile/9UG2R28R2",
            "https://statsroyale.com/profile/QCYVUL",
            "https://statsroyale.com/profile/2R900UR",
            "https://statsroyale.com/profile/UULQLJU",
            // "https://statsroyale.com/profile/2R900UR/decks?type=ladder",

        ];
        // var url = 'https://statsroyale.com/profile/9UG2R28R2'
        // var path_mouse_click_png = '9JUUVGLQQ_status.png'
        // var elementToClick = '.profile__refreshNotificationButton'
        // // cr_status_page_update(url,elementToClick, path_mouse_click_png)
        // ClickAndGetPrint(cr_url, elementToClick)

        var listcr = []
        await Promise.all(clashRoyaleUrl.map(async (cr_url) => {
            let result = await clashroyaleStatus(cr_url);
            listcr.push(result)
        }));


        res.send(listcr);

    } catch (error) {
        console.log('catch Error => ' + error)
    }
};


exports.ClashRoyaleClickAndGetPrint = function (req, res) {
    try {
        var url = 'https://statsroyale.com/profile/9JUUVGLQQ'
        var elementToClick = '.profile__refreshNotificationButton'
        var path_mouse_click_png = '9JUUVGLQQ_status.png'
        ClickAndGetPrint(url, elementToClick, path_mouse_click_png)
    } catch (error) {
        console.log('catch Error => ' + error)
    }


};

async function ClickAndGetPrint(url, elementToClick, path_mouse_click_png) {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        // go to a page setup for mouse event tracking
        await page.goto(url)
        console.log('goto Done!' + url)

        // click an area
        // await page.mouse.click(132, 103, { button: 'left' })
        await page.click(elementToClick, { button: 'left' })
        console.log('click Done!')

        await browser.close()
        console.log('browser.close Done!')
    } catch (error) {
        console.log('catch Error => ' + error)
    }
}

function clashroyaleStatus_old(clashRoyaleUrl) {
    try {

        const options = {
            uri: clashRoyaleUrl,
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        request_promise(options)
            .then(($) => {
                var Player = $('.profileHeader__nameCaption').eq(0).text();
                var Highest_Trophies = $('div #profile-metrics .ui__headerExtraSmall').eq(0).html();
                var Trophies = $('div #profile-metrics .ui__headerExtraSmall').eq(1).html();
                var userLevel = $('.profileHeader__userLevel').html();
                var favouriteCardName = $('.profile__favouriteCardName').html();
                // var Winrate = $('.decks__metricValue').html();
                var crStatusObj = {
                    Player: String,
                    Highest_Trophies: Number,
                    Trophies: Number,
                    userLevel: Number,
                    favouriteCardName: String
                }
                crStatusObj.Player = Player.replace('\n', ''),
                    crStatusObj.Highest_Trophies = Highest_Trophies,
                    crStatusObj.Trophies = Trophies,
                    crStatusObj.userLevel = userLevel,
                    crStatusObj.favouriteCardName = favouriteCardName
                // 'Winrate': Winrate,

                if (obj.length == 0) {
                    obj.push(crStatusObj);
                }
                else if (obj.length > 0) {
                    var playerexists = false
                    obj.forEach(element => {
                        if (element.Player === crStatusObj.Player) {
                            playerexists = true
                        }
                    });
                    if (!playerexists) {
                        obj.push(crStatusObj);
                    }

                }

            })

    } catch (error) {
        console.log('catch Error => ' + error)
    }
    return obj

}

function clashroyaleStatus(clashRoyaleUrl) {
    // const clashRoyaleUrl = 'https://statsroyale.com/profile/9JUUVGLQQ';
    return new Promise(function (resolve, reject) {
        request(clashRoyaleUrl, function (err, response, body) {
            if (err) reject(err);
            if (response.statusCode !== 200) {
                reject('Invalid status code: ' + response.statusCode);
            }
            let $ = cheerio.load(body);

            var Player = $('.profileHeader__nameCaption').eq(0).text();
            var Highest_Trophies = $('div #profile-metrics .ui__headerExtraSmall').eq(0).html();
            var Trophies = $('div #profile-metrics .ui__headerExtraSmall').eq(1).html();
            var userLevel = $('.profileHeader__userLevel').html();
            var favouriteCardName = $('.profile__favouriteCardName').html();

            var Cr_Player_status = {
                Player: String,
                Highest_Trophies: Number,
                Trophies: Number,
                userLevel: Number,
                favouriteCardName: String,
                statsroyaleprofile: String
            }
            Cr_Player_status.Player = Player.replace('\n', ''),
                Cr_Player_status.Highest_Trophies = Highest_Trophies,
                Cr_Player_status.Trophies = Trophies,
                Cr_Player_status.userLevel = userLevel,
                Cr_Player_status.favouriteCardName = favouriteCardName
            Cr_Player_status.statsroyaleprofile = clashRoyaleUrl

            // let channels = [];
            // channels.push(Cr_Player_status);
            resolve(Cr_Player_status);

        });
    });
}

function cr_status_page_update(url, elementToClick, path_mouse_click_png) {
    try {
        async () => {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()

            // set the viewport so we know the dimensions of the screen
            await page.setViewport({ width: 800, height: 600 })

            // go to a page setup for mouse event tracking
            await page.goto(url)

            // click an area
            // await page.mouse.click(132, 103, { button: 'left' })
            await page.click(elementToClick)

            // the screenshot should show feedback from the page that right part was clicked.
            await page.screenshot({ path: path_mouse_click_png })
            await browser.close()
            console.log('cr_status_page_update Done!')
        }
    } catch (error) {
        console.log('catch Error => ' + error)
    }
}
// // get the user starlord55
// User.find({ username: 'starlord55' }, function(err, user) {
//     if (err) throw err;

//     // delete him
//     user.remove(function(err) {
//       if (err) throw err;

//       console.log('User successfully deleted!');
//     });
//   });


