const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b7d081b33402a457df71890bb0638146&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}`;
    request({url, json:true}, (error, { body } = {})=>{
        if(error){
            callback('Unable to connect to the server', undefined);
        }else if(body.error){
            callback(body.error.info, undefined);
        }else{
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions,
                humidity:body.current.humidity,
                cloudcover:body.current.cloudcover
            });
        }
    });
};

module.exports = forecast;
