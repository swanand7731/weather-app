const request = require('postman-request');

const geocode = (address, callback) =>{
    const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3dhbmFuZDc3MzEiLCJhIjoiY2todTduamZrMGh2czJzcDU0ZGw0c3JoeCJ9.ORVqa8JIb3swWP1b4W1ofA`;
    request({url:geoURL,json:true}, (error, { body } = {})=>{
        if(error){
            callback('Unable to connect to the server to get data', undefined);
        }else if(body.features.length === 0){
            callback('Unable to get data for given address, please enter different address', undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;