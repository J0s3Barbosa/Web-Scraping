const puppeteer = require('puppeteer');
 
exports.youtubeClickAndGetPrint = function (req, res) {
    try {
        var url = 'https://www.youtube.com/?gl=US'
        var elementToClick = '.ytd-menu-renderer'
        var path_mouse_click_png = 'youtube.png'
        ClickAndGetPrint(url, elementToClick, path_mouse_click_png)
    } catch (error) {
        console.log('catch Error => ' + error)
    }


};


function ClickAndGetPrint(url, elementToClick, path_mouse_click_png) {
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
        }
    } catch (error) {
        console.log('catch Error => ' + error)
    }
}

 