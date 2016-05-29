var request = require('request');
var sleep = require('sleep');

var requestData = {
    "timestamp": new Date().getTime(),
    "car_data": {
        "plate": "ABC-123-ABD",
        "driving_license": "abc1234abc"
    },
    "user_id": 125648987984151,
    "geotag": {
        "lat": 45.58,
        "lon": 78.85
    },
    "inst_speed": 120.5,
    "heart_rate": 75,
    "weight_distribution": [78, 55, 78, 78, 52, 52, 12, 32, 32]
}

function genData(prevData) {

    var random1 = Math.random();
    var random2 = Math.random() * 5;
    var newSpeed = prevData.inst_speed;
    if(random1 > 0.33) {
        newSpeed += random2;
    } else if(random1 > 0.66) {
        newSpeed -= random2;
    }

    var random4 = Math.random() * 0.1;
    var newLat = (Math.random() > 0.5) ? (prevData.geotag.lat + random4) : (prevData.geotag.lat - random4);

    var random6 = Math.random() * 0.1;
    var newLong = (Math.random() > 0.5) ? (prevData.geotag.long + random6) : (prevData.geotag.long - random6);

    var random7 = Math.floor(Math.random() * 10);
    var newHeart = (Math.random() > 0.5) ? (prevData.heart_rate + random7) : (prevData.heart_rate - random7);

    var newWeight = [];
    for(var i = 0; i < 9; i++) {
        newWeight.push(Math.floor(Math.random() * 100));
    }

    var newData = {
        "timestamp" : new Date().getTime(),
        "car_data" : prevData.car_data,
        "user_id" : prevData.user_id,
        "geotag" : {
            "lat" : newLat,
            "long" : newLong
        },
        "inst_speed" : newSpeed,
        "heart_rate" : newHeart,
        "weight_distribution" : newWeight
    }

    return newData;
}

var oldData = requestData;
var dataToSend = [];
for(var i = 0; i < 100; i++) {
    var newData = genData(requestData);
    oldData = newData;
    dataToSend.push(newData);
}

console.log(dataToSend);

dataToSend.forEach( (requestData) => {

    var postData = JSON.stringify(requestData);

    console.log(requestData);

    var request = require('request');
    request.post({
        url:     'http://40.69.29.211:3000/sit_sense/dati_sedile',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        },
        body:    postData
    }, function(error, res, body){
        if (error) {
            return console.error('upload failed:', error);
        } else {
            return console.log(body);
        }
    });

});