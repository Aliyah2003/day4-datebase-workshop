const Country=require("../models/Country")

async function index(req,res){
    try{
        const countries=await Country.getAll();
        res.status(200).json(countries);
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

async function show(req,res){
    try{
        let id=parseInt(req.params.id);
        const country=await Country.getCountryById(id);
        res.status(200).json(country);
    }catch(err){
        res.status(404).json({error:err.message})
    }
}

async function create(req,res){
    try{
        const data=req.body;
        console.log(data);
        const newCountry=await Country.create(data)
        res.status(201).json(newCountry)
    }catch(err){

        res.status(400).json({error:err.message})
    }
}

async function destroy(req,res){
    try{
        const id=parseInt(req.params.id);
        const country=await Country.getCountryById(id);
        const result=await country.destroy();
        res.status(204).end();
    }catch(err){
        res.status(404).json({error:err.message});
    }
}

module.exports={ index, show, create, destroy};

