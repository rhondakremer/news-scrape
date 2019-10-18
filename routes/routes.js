// Routes
module.exports = function(app) {

// Require all models
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
//get route to root, populating index.handlebars with articles
app.get('/', (req,res) => {
    db.Article
      .find({})
      .then(articles => res.render('index', {articles}))
      .catch(err=> res.json(err));
  });

  app.get('/saved', (req,res) => {
    db.Article
      .find({"isSaved": true})
      .then(articles => res.render('saved', {articles}))
      .catch(err=> res.json(err));
  });

// A GET route for scraping the echoJS website
// app.get("/scrape", function(req, res) {
//     // First, we grab the body of the html with axios
//     axios.get("https://southfloridaclassicalreview.com/").then(function(response) {
//       // Then, we load that into cheerio and save it to $ for a shorthand selector
//       var $ = cheerio.load(response.data);
  
//       // Now, we grab every h2 within an article tag, and do the following:
//       let ps=[];
//       $("div h3").first().siblings("p").each(function(i, element) {
//           ps.push($(element).text())
//       });
//       //console.log(ps)
//       $("div h3").each(function(i, element) {
//         // Save an empty result object
//         var result = {};
  
//         // Add the text and href of every link, and save them as properties of the result object
//         result.title = $(this)
//           .children("a")
//           .text();
//         result.link = $(this)
//           .children("a")
//           .attr("href");
        
//         result.summary = ps[i];
//         result.isSaved = false;
//         console.log(result)
  
//         // Create a new Article using the `result` object built from scraping
//         db.Article.create(result)
//           .then(function(dbArticle) {
//             // View the added result in the console
//             //console.log(dbArticle);
//           })
//           .catch(function(err) {
//             // If an error occurred, log it
//             console.log(err);
//           });
//       });
  
//       // Send a message to the client
//       res.send("Scrape Complete");
//     });
//   });
app.get("/scrape", function (req, res) {
    axios.get("https://www.positive.news/").then(function (response) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);



        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $("div.card__content").each(function (i, element) {
            // An empty array to save the data that we'll scrape
            var result = {};
            // Save the text of the element in a "title" variable
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            result.summary = $(this)
                .children("span")
                .text();
            result.isSaved = false;

            //console.log(result);

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        // Send a message to the client
        res.send("Scrape Complete");
    });
});


  // Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
          console.log(dbArticle)
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  
  // Route for grabbing a specific Article by id, populate it with its note
  app.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // route to save article
  app.post('/articles/:id', (req,res) => {
    db.Article.update(req.body)
    .then(function(dbArticle) {
        return db.Article.update({ _id: req.params.id }, { isSaved: true });
    })
    .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  
  // Create a new note
app.post("/notes/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
    .then(function (dbNote) {
        // View the added result in the console
        console.log(dbNote);
    })
    .catch(function (err) {
        // If an error occurred, log it
        console.log(err);
    });
  });
};