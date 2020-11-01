const burger_controller=require("../controllers/burger_controller.js");
const router = require('express').Router();


router.get("/", function(req, res){
    burger_controller.findAll(req, res);
});



module.exports=router;