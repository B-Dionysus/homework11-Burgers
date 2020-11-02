const burger_controller=require("../controllers/burger_controller.js");
const router = require('express').Router();


router.get("/", function(req, res){
    burger_controller.findAll(req, res);
});
router.post("/api/devour/:id",(req,res)=>  burger_controller.devour(req, res, req.params.id))

router.post("api/addBurger/", (req, res)=>{})


module.exports=router;