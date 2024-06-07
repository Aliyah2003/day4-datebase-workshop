require('dotenv').config()
const db=require('./connect')

db.query("SELECT * FROM country;")
.then((data)=>{
    db.end();
    console.log("Setup complete")
    console.log(data)
})
.catch((error)=>console.log(error))