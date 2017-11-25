# skiMountains
JSON api served up by scraping OnTheSnow.com. NodeJS

# API
### List mountains that this api has been tested against.
*NOTE:*(also currently all mountains included in /washingtonMtns)
```
http:172.0.0.1:8081/validMtns
```
### Get data for specific Mountain.
```
http:172.0.0.1:8081/<mountain-name>
 ```
Where `<mountain-name>` should match the name used in the url from onthesnow.com

#### For example:
Stevens pass has the url:https://www.onthesnow.com/washington/stevens-pass-resort/skireport.html
which means our api endpoint must be:
```
http://127.0.0.1:8081/stevens-pass-resort
```
Which should yield a response of something like this:
``` javascript
{
  "name": "stevens-pass-resort",
  "snowTodayInches": 0,
  "temperatureSummit": "27\u00b0F",
  "temperatureBase": "31\u00b0F",
  "weatherSummit": "Snow",
  "weatherBase": "Snow",
  "open": false
}
```
 ### Get data for all Mountains in Washington State (Currently just around Seattle)
 ```
 http://127.0.0.1:8081/washingtonMtns
 ```
 Which should respond with some data that looks like:
 ``` javascript
 {
  "crystal-mountain-wa": {
    "name": "crystal-mountain-wa",
    "snowTodayInches": 2,
    "temperatureSummit": "26\u00b0F",
    "temperatureBase": "32\u00b0F",
    "weatherSummit": "Snow Showers",
    "weatherBase": "",
    "open": true
  },
  "mt-baker": {
    "name": "mt-baker",
    "snowTodayInches": 4,
    "temperatureSummit": "33\u00b0F",
    "temperatureBase": "31\u00b0F",
    "weatherSummit": "Snow Showers",
    "weatherBase": "Snow Showers",
    "open": true
  },
  "stevens-pass-resort": {
    "name": "stevens-pass-resort",
    "snowTodayInches": 0,
    "temperatureSummit": "27\u00b0F",
    "temperatureBase": "31\u00b0F",
    "weatherSummit": "Snow",
    "weatherBase": "Snow",
    "open": false
  },
  "the-summit-at-snoqualmie": {
    "name": "the-summit-at-snoqualmie",
    "snowTodayInches": 0,
    "temperatureSummit": "30\u00b0F",
    "temperatureBase": "37\u00b0F",
    "weatherSummit": "Cloudy",
    "weatherBase": "Cloudy",
    "open": false
  }
}
```
