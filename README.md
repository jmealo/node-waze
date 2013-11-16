## node-waze

fetch your commute data

[![Build Status](https://travis-ci.org/tphummel/node-waze.png)](https://travis-ci.org/tphummel/node-waze)  
[![NPM](https://nodei.co/npm/waze.png?downloads=true)](https://nodei.co/npm/waze)

## install

    npm install waze

## usage

```javascript
var waze = require("waze");

var wazeLogin = {
  user_id: "myusername",
  password: "mypassword"
}

waze.createClient(wazeLogin, function(err, client) {
  
  client.trips.get(function(err, trips) {

    console.log("trip count: ", trips.length);

    var lastTrip = trips.shift();
    console.log("lastTrip: ", lastTrip);

    client.trip.get(lastTrip.id, function(err, trip){
      trip.forEach(function(segment){
        console.log("trip segment detail: ", segment);
      });  
    });

  });
});
```

## api

    client#trips.get(cb)
      returns an array of user trip metadata

    client#trip.get(id, cb)
      id = string trip id (from trips[i].id metadata)
      returns an array of segment objects that make up the trip

    cb = function(err, data){}

## tests

    npm test
