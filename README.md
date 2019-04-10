### Web-Scraping ###

### Install dependencies:  ###
npm install 

### Start the server: ###
npm start 

### Start the server dev: ###
npm run dev 

### About the project: ###

```sh
This project has a clash royale module where the client can insert delete and update content to manage the day to day game.
All the crud is in one page so no refresh page.
the user can adjust the panels (create and update Panels) the way they want for better work. So you can adjust the panels in the page, setting side by side so you can create, update, see and delete the data with no refreshing pages and clicking a lotta links.
For security the use needs to genarate a token key for  CUD (create, upodate and delete content)
Has an API that web scraping content from Royale Status, bring users information like Name, Highest_Trophies,Trophies, userLevel, favouriteCardName, and a link to go to statsroyale profile to check and update profile .
```

```sh
orchestrator
Microservices
```

```sh
Tracking
```
```sh
Links
http://localhost:5000/
http://localhost:5002/
```
check the app on heroku
https://webscrapingnode.herokuapp.com/

### APIs ###

http://localhost:5000/api/v1/weather/Itacoatiara48forecast

### WebScraping - Node js (javascript)   ###
```sh
 
* Link Prod: https://webscrapingnode.herokuapp.com/ 
* Repository : https://github.com/appchto/Web-Scraping 
* kills Used: javascript, mongoDB, Ejs, Express, Jwt, Passport

Software hosted on Heroku.
```
This system has modules:

### Home  ###
```sh
Info about the developer
Has descriptions about the system
```
### Clash Royale  ###
```sh


When you click at the menu, you will see 2 links on the left menu.
 
#### Clash Royale  ###

Allows you to insert your number of trophies, victories, defeat to keep a log for analysis and computer number of trophies gained or lost.
Access to manage the day to day gaming.
Can insert, read, update and delete the content
Has an api that brings data directly from clash royale servers.
Data from you profile and other players
Data like name, level favorite cards, and link to access and update you clash royale profile.

#### Reset Layout  ###

The panels to insert and update clash royale data can be adjusted in the page, so you can use this Link to reset the layout to defeat state.
```

### API to provide data for 3th parties.  ###
```sh

https://webscrapingnode.herokuapp.com/api/v1/clashroyale/clashroyaleapi

Result from this API that brings data from clash royale page.

{"Player": "karlmb ",
"Highest_Trophies": "4040",
"Trophies": "4019",
"userLevel": "11",
"favouriteCardName": "Bowler",
"statsroyaleprofile": "https://statsroyale.com/profile/9UG2R28R2"},
```
```sh
https://webscrapingnode.herokuapp.com/api/v1/clashroyale/clashs

With this api,  the user can get his data to any software and wish.

{"_id": "5c734ba69225a22938ba0925",
"Name": "chto@outlook",
"Started_Trophies": 10,
"Trophies": 20,
"Victory": 10,
"Defeat": 1,
"Played_at": "2019-02-25T01:57:58.510Z",
"Owner": "chto@outlook.com",
"__v": 0,
"Total_Trophies": 10},
```

#### Weather 
```sh

This module brings data from weather sites using web scraping.
The data is transforme in a API that could be used for any software by the link/endpoint https://webscrapingnode.herokuapp.com/api/v1/weather/Itacoatiara48forecast

It brings a Itacoatiara’s 48 hours forecast  of Sea and Weather temperature,  Time and wave’s size.
If wave’s size is greater than 1,2, it will be highlighted in red “1,2” , so you can spot rightway the better day to go surfing.
API to provide data for 3th parties.

https://webscrapingnode.herokuapp.com/api/v1/weather/Itacoatiara48forecast
https://webscrapingnode.herokuapp.com/api/v1/weather/WebScraping
```

#### APIs  
```sh

Apis are use in port 5002 default link http://localhost:5002/

End-points
 
* Weather

* Webscraping

 * http://localhost:5002/api/v1/weather/WebScraping 
 * Return an Object with 4 properties
 * {"temp": "Today's Itacoatiara sea temperature is 28.6 °C.",
    "day": "S&#xE1;bado",
    "wavesSize": "0.5",
    "wavesSizeDetailed": "0.5SE0.5SE0.5SE0.5SE0.6SE0.5SE0.1S0.1S0.1S0.1S0.1S0.1S0.6SW0.6SW0.5SW0.6SSW1.1SSW1.3SSW"}

* Itacoatiara48forecast

 * http://localhost:5002/api/v1/weather/Itacoatiara48forecast  
 *  Return an array with 4 objects
 * "days": ["Sábado 09","Domingo 10","Segunda-feira 11"],
   newtimes": [{"day": "Sábado 09","time": "6AM","wavesize": "0.5SE","weather": "céu limpo"},]
   uniqueweather": ["céu limpo","parcialmente nublado","Risco Trovoada"],
   wavesTimes": [{"day": "","time": "0AM","wavesize": "0.5SE","weather": "céu limpo"},]

* Itacoatiaraseatemp

  * http://localhost:5002/api/v1/weather/Itacoatiaraseatemp  
  * Return an array with 1 objects
  * [{"temp": "Today's Itacoatiara sea temperature is 28.6 °C."}]

* Youtube

* Default
  * sendEmail

```


### Currency Exchange  


```sh
the user should be able to insert a currency and expexted currency exchange, then should see the result
* default link list all available currencies

* Link Prod https://webscrapingnode.herokuapp.com/currencyExchange/Convert/?from=USD&to=BRL
* test
  * npm test .\test\currencyExchange.spec.js

* using querystring

  http://localhost:5000/currencyExchange/Convert/?from=AUD&to=BRL
* http://localhost:5000/currencyExchange/Convert
* http://localhost:5000/currencyExchange/Convert/?from=AUD&to=BRL
* http://localhost:5000/currencyExchange/Convert/?from=USD&to=BRL


* api with all currencies
  * sample
  * https://free.currencyconverterapi.com/api/v6/currencies?apiKey=sample-api-key
        "results": {
    "ALL": {
    "currencyName": "Albanian Lek",
    "currencySymbol": "Lek",
    "id": "ALL"
    },
    "XCD": {
    "currencyName": "East Caribbean Dollar",
    "currencySymbol": "$",
    "id": "XCD"
    },

*

```

```sh

* api with all currencies
  * sample
  * https://free.currencyconverterapi.com/api/v6/currencies?apiKey=sample-api-key
        "results": {
    "ALL": {
    "currencyName": "Albanian Lek",
    "currencySymbol": "Lek",
    "id": "ALL"
    },
    "XCD": {
    "currencyName": "East Caribbean Dollar",
    "currencySymbol": "$",
    "id": "XCD"
    },


*
                


```

```sh

* https://exchangeratesapi.io/

    GET https://api.exchangeratesapi.io/latest HTTP/1.1

    {
      "base": "EUR",
      "date": "2018-04-08",
      "rates": {
        "CAD": 1.565,
        "CHF": 1.1798,
        "GBP": 0.87295,
        "SEK": 10.2983,
        "EUR": 1.092,
        "USD": 1.2234,
        ...
      }
    }
```



### Dht Sensor  


```sh
 * arduino sends data to the api to be saved in the database and generated a report and graphs
 * Data comes as following   
      * data = "temperature=" + temp + "&humidity=" + hum;// data sent must be under this form //name1=value1&name2=value2.


* API Link Prod https://webscrapingnode.herokuapp.com/api/v1/dhtsensorhouse/

* test
  * npm test .\test\dhtsensorhouse.spec.js

* using querystring

  http://localhost:5000/api/v1/dhtsensorhouse/?temperature=value1&humidity=value2

* api default
  http://localhost:5000/api/v1/dhtsensorhouse



```




### chatbot  
```sh
 * testing chatbot 
https://docs.botui.org/guide.html

* API Link Prod https://webscrapingnode.herokuapp.com/indexRouters/chatbot

* test
  * npm test .\test\chatbot.spec.js

* api default
http://localhost:5000/indexRouters/chatbot



```




### OS  
```sh
 * Os field API
 * to be integrated to android app 

* API Link Prod https://webscrapingnode.herokuapp.com/api/v1/os

* test
  * npm test .\test\os.spec.js

* api default
http://localhost:5000/api/v1/os
http://localhost:5000/api/v1/os/all


```





