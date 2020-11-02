

// 4. Create the `router` for the app, and export the `router` at the end of your file.

const burger=require("../models/burger.js");

function findAll(req, res){
   burger.all((data=>{
     res.render("index",{burgers:data});}));
}
function devour(req, res, id){
   burger.update(id, "devoured", true, data=>res.json(data));
}

module.exports={
   findAll,
   devour,
}

