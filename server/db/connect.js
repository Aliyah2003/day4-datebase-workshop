//require('dotenv').config();
//console.log(process.env)

const { createPool }=require('mysql2')
const db=createPool({
    host:process.env.HOST,
    user:process.env.USER1,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
}).promise()

// db.query("SELECT * FROM country;")
// .then(data=>console.log(data))
// .catch(err=>console.log(err));

module.exports=db;