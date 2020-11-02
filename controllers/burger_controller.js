

// 4. Create the `router` for the app, and export the `router` at the end of your file.

const burger=require("../models/burger.js");

// Burger_controller receives the request, a variable to hold our response, and any other
// appropriate data from route.js
// It then calls the appropriate function in our model, /models/burger.js, passing any necessary data 
// as well as a callback function for when the database results are returned

// This callback function says that our response to the user should be the rendered handlebars
// page "index", after we pass it an objects called "burgers" with all of our database data.
function findAll(req, res) {
   burger.all((data=>res.render("index",{burgers:data})));
}
// Here we pass along the id to be devoured, the boolean value (if we wanted to undevour something
// we would call this with "false") and a callback function that says to send the user a json object
// with the data that we receive (in this case, that's just an object with a success key of value "true")
// This is being expected by the code in public/assets/scripts/index.js
function devour(req, res, id){
   burger.update(id, "devoured", true, data=>res.json(data));
}
// And here we just pass it the user's new name, and teh callback function that will send a json object
// with the newly-created id, as well as the name again, and some other data we aren't using. This is also
// going to code in public/assets/scripts/index.js
function add(req, res, name){
   burger.insert(name, data=>res.json(data));
}

module.exports={
   findAll,
   devour,
   add
}

