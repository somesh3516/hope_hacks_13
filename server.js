const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(express.json());
const port = 5000;
const path = require("path");
const req = require("express/lib/request");
// const uri = process.env.MONGODB_CONNECTION_STRING;
const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

// MongoClient.connect(
//   "mongodb+srv://CatDadJose:password1234@cluster0.vump9.mongodb.net/database",
//   { useUnifiedTopology: true }
// ).then((client) => {
//   console.log("connected to DB");
//   const db = client.db("hopeHacks");
//   const quotesCollection = db.collection("results");

//   app.post("/getResults", (req, res) => {
//     let score = req.body;
//     const hopehacks13 =
//       Number(score.question1) +
//       Number(score.question2) +
//       Number(score.question3) +
//       Number(score.question4);

//       console.log(hopehacks13)
//   });
  
//   app.get("/getResults", (req, res) => {

//     db.collection("results")
//       .find()
//       .toArray()
//       .then((results) => {
//         console.log(results);
//       })
//       .catch((error) => console.error(error));
//   });
// });

// const healthSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
// });
// //connects launchesSchema with the "launches" collection
// const result = mongoose.model("Result", healthSchema);

// //Connecting MongoDB to server.
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB connection established");
// });

app.use(bodyParser.urlencoded({ extended: true }));

// Static Files
app.use(express.static("public"));
// Specific folder example
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

// Set View's
app.set("views", "./views");
app.set("view engine", "ejs");

// Navigation
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/map", (req, res) => {
  res.render("map");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/quiz", (req, res) => {
  res.render("quiz");
});


MongoClient.connect(
    "mongodb+srv://CatDadJose:password1234@cluster0.vump9.mongodb.net/database",
    { useUnifiedTopology: true }
  ).then((client) => {
    console.log("connected to DB");
    const db = client.db("hopeHacks");
    const quotesCollection = db.collection("results");
  
    app.post("/getResults", (req, res) => {
      let answerValues = req.body;
      const score =
        Number(answerValues.question1) +
        Number(answerValues.question2) +
        Number(answerValues.question3) +
        Number(answerValues.question4);
  
        console.log(score);
        
        if(score <= 4) {
          quotesCollection
          .findOne({name: 'Clinical Depression'})
          .then((results) => {
            // res.setHeader('Content-Type', 'text/html');
            // res.status(200).json
            // (`
            // <h1> ${JSON.stringify(results.name)} </h1>
            // <p> ${JSON.stringify(results.description)} </p> 
            // `)
            res.render('getResults', {
              outputTitle: results.name,
              outputDesc: results.description

            })
            
          })
          .catch((error) => console.error(error));
        }

        if(score > 4 && score <= 8 ) {
          quotesCollection
          .findOne({name: 'Anxiety Disorder'})
          .then((results) => {
            res.render('getResults', {
              outputTitle: results.name,
              outputDesc: results.description

            })
          })
          .catch((error) => console.error(error));
        }

        if(score > 8 && score <= 12 ) {
          quotesCollection
          .findOne({name: 'Bipolar Disorder'})
          .then((results) => {
            res.render('getResults', {
              outputTitle: results.name,
              outputDesc: results.description

            })
          })
          .catch((error) => console.error(error));
        }

        if(score > 12 && score <= 16 ) {
          quotesCollection
          .findOne({name: 'Obsessive Compulsive Disorder'})
          .then((results) => {
            res.render('getResults', {
              outputTitle: results.name,
              outputDesc: results.description

            })
          })
          .catch((error) => console.error(error));
        }
    });

  });

// Example for other folders
app.listen(5000, () => console.info(`App listening on port ${port}`));
