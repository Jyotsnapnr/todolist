//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

var items = [];

const app= express();
var workItems = [];
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {

let day = date.getDate();

res.render("list", {ListTitle: day, newListItems: items});

});

app.post("/", function(req, res) {
  let item = req.body.newItem;

  if(req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");

  } else {
    items.push(item);
    res.redirect("/");
  }
});


app.get("/work", function(req, res) {
  res.render("list", {ListTitle: "work List", newListItems: workItems});
})

app.post("/work", function(req, res) {


  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function() {
  console.log("server started on port 3000");
});
