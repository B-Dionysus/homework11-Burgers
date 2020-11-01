const express = require('express');
const exphbs = require('express-handlebars')

const db = require('./models/burger.js');

const routes = require('./routes/api-routes.js');

// create an instance of express
const app = express();

// either heroku or localhost
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);


    app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });