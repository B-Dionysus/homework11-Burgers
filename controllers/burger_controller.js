

// 4. Create the `router` for the app, and export the `router` at the end of your file.

const burger=require("../models/burger.js");

function findAll(req, res){
   burger.all((data=>{
      console.log(data);res.render("index",{burgers:data});}));
}

module.exports={
   findAll
}

