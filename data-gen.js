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



console.log(requestData);
var oldData = requestData;
for(i = 0; i < 100; i++) {
    var newData = genData(requestData);
    oldData = newData;
    JSON.stringify(newData);
}
