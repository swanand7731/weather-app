const express = require("express");
const app = express();
const path = require("path");
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {title:"Weather", name:"Swan"});
});

app.get("/about", (req, res) => {
    res.render("about", {title:"About", name:"Swan"});
});

app.get("/help", (req, res) => {
    res.render("help", {title:'Help', message:'How can I help you?', name:"Swan"});
});

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error:'Please provide an address in the query string'
    });
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
    if(error){
      return res.send({error});
    }
    forecast(latitude, longitude, (error, forecastData)=>{
      if(error){
        return res.send({error});
      }
      res.send({
        forecast:`It is currently ${forecastData.temperature} degrees out. And feels like ${forecastData.feelslike}`,
        location,
        address:req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  res.send({
    products:[]
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title:"Help not found",
    message:"Help article not found",
    name:"Swanand"
  });
});

app.get("*", (req, res) => {
  res.render("404",{
    title:"Page Not Found",
    message:"Page Not Found",
    name:"Swanand"
  });
});

app.listen(3000, () => {
  console.log("Up and Running!");
});
