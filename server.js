// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var mongoose = require("mongoose");

const port = process.env.PORT || 3000;
mongoose.Promise = Promise;
// var MONGODB_URI =
//   process.env.MONGODB_URI || "mongodb://localhost/portfoliomessages";
// mongoose.connect(MONGODB_URI);

var app = express();

// Set the app up with morgan.
// morgan is used to log our HTTP Requests. By setting morgan to 'dev'
// the :status token will be colored red for server error codes,
// yellow for client error codes, cyan for redirection codes,
// and uncolored for all other codes.
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost/portfoliomessages")

//   .then(() => console.log("portfoliomessages connected ^_^"))
//   .catch(err => console.log(err));
var db = process.env.MONGODB_URI || "mongodb://Localhost/portfoliomessages";

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_7df7drh5";

// "mongodb://localhost:27017/portfoliomessages";

mongoose.connect(db, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("mongoose connection is successful");
  }
});

// Database configuration
var databaseUrl = "portfoliomessages";
var collections = ["message"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// // Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Routes
// ======
mongoose.connect("mongodb://localhost:27017/portfoliomessages", {
  useNewUrlParser: true
});
// Simple index route
app.get("/", function(req, res) {
  res.send(index.html);
});

// // Handle form submission, save submission to mongo
app.post("/submit", function(req, res) {
  console.log(req.body);
  // Insert the note into the message collection
  db.message.insert(req.body, function(error, saved) {
    // Log any errors
    if (error) {
      console.log(error);
    } else {
      // Otherwise, send the message back to the browser
      // This will fire off the success function of the ajax request
      res.send(saved);
    }
  });
});

// Retrieve results from mongo
app.get("/all", function(req, res) {
  // Find all messages in the message collection
  db.message.find({}, function(error, found) {
    // Log any errors
    if (error) {
      console.log(error);
    } else {
      // Otherwise, send json of the message back to user
      // This will fire off the success function of the ajax request
      res.json(found);
    }
  });
});

// // Select just one note by an id
// app.get("/find/:id", function(req, res) {
//   // When searching by an id, the id needs to be passed in
//   // as (mongojs.ObjectId(IdYouWantToFind))

//   // Find just one result in the notes collection
//   db.messages.findOne(
//     {
//       // Using the id in the url
//       _id: mongojs.ObjectId(req.params.id)
//     },
//     function(error, found) {
//       // log any errors
//       if (error) {
//         console.log(error);
//         res.send(error);
//       } else {
//         // Otherwise, send the note to the browser
//         // This will fire off the success function of the ajax request
//         console.log(found);
//         res.send(found);
//       }
//     }
//   );
// });

// // Update just one note by an id
// app.post("/update/:id", function(req, res) {
//   // When searching by an id, the id needs to be passed in
//   // as (mongojs.ObjectId(IdYouWantToFind))

//   // Update the note that matches the object id
//   db.messages.update(
//     {
//       _id: mongojs.ObjectId(req.params.id)
//     },
//     {
//       // Set the title, note and modified parameters
//       // sent in the req body.
//       $set: {
//         name: req.body.name,
//         email: req.body.email,
//         comment: req.body.comment,
//         modified: Date.now()
//       }
//     },
//     function(error, edited) {
//       // Log any errors from mongojs
//       if (error) {
//         console.log(error);
//         res.send(error);
//       } else {
//         // Otherwise, send the mongojs response to the browser
//         // This will fire off the success function of the ajax request
//         console.log(edited);
//         res.send(edited);
//       }
//     }
//   );
// });

// // Delete One from the DB
// app.get("/delete/:id", function(req, res) {
//   // Remove a note using the objectID
//   db.messages.remove(
//     {
//       _id: mongojs.ObjectID(req.params.id)
//     },
//     function(error, removed) {
//       // Log any errors from mongojs
//       if (error) {
//         console.log(error);
//         res.send(error);
//       } else {
//         // Otherwise, send the mongojs response to the browser
//         // This will fire off the success function of the ajax request
//         console.log(removed);
//         res.send(removed);
//       }
//     }
//   );
// });

// // Clear the DB
// app.get("/clearall", function(req, res) {
//   // Remove every note from the notes collection
//   db.messages.remove({}, function(error, response) {
//     // Log any errors to the console
//     if (error) {
//       console.log(error);
//       res.send(error);
//     } else {
//       // Otherwise, send the mongojs response to the browser
//       // This will fire off the success function of the ajax request
//       console.log(response);
//       res.send(response);
//     }
//   });
// // });
// const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
// Listen on port 3000
