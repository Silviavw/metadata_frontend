var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/author-tool", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});
