const burger_controller=require("../controllers/burger_controller.js");
const router = require('express').Router();

// Each route passes the user's request, a variable to hold our response, and
// possibly some other data to the appropriate function in burger_controller.

// HTML Route for displaying all the burgers
router.get("/", function(req, res){
    burger_controller.findAll(req, res);
});

// API Routes for devouring and undevouring a burger
router.post("/api/devour/:id",(req,res)=>  burger_controller.devour(req, res, req.params.id))
router.post("/api/undevour/:id",(req,res)=>  burger_controller.undevour(req, res, req.params.id))

// And for adding a new burger
router.post("/api/addBurger/", (req, res)=>burger_controller.add(req, res, req.body.name))


module.exports=router;