//Access the Router functionality from express
const { Router } =require('express')

//Add the controller
const countryController=require("../controllers/countries")

//Initiate my router
const countryRouter=Router()

//Define routes or endpoints
countryRouter.get("/",countryController.index);
countryRouter.delete("/:id", countryController.destroy)
countryRouter.get("/:id",countryController.show);
countryRouter.post("/",countryController.create);


module.exports=countryRouter