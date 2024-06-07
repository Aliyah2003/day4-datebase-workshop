const db=require("../db/connect")

class Country{

    constructor({country_id, country_name, capital, country_population, languages, fun_fact, map_image_url}){
        this.country_id=country_id;
        this.country_name=country_name;
        this.capital=capital;
        this.country_population=country_population;
        this.languages=languages;
        this.fun_fact=fun_fact;
        this.map_image_url=map_image_url;

    }

    static async getAll(){
        const [response]=await db.query("SELECT * FROM country;");
        console.log(response);
        if(response.length===0){
            throw new Error("No countries available!")
        }

        return response.map(c=>new Country(c));
    }

    static async getCountryById(id){

        const [response]=await db.query(`SELECT * FROM country WHERE country_id=?;`,[id]);
        if(response.length!=1){
            throw new Error("Unable to locate country");
        }
        return new Country(response[0]);


    }

    static async create(data){
        const { country_name, capital, country_population, languages}=data;
        const [existingCountry]=await db.query(`SELECT country_name FROM country WHERE LOWER(country_name)=?;`,[country_name]);
        //console.log(existingCountry.length);
        if(existingCountry.length ===0){
              let [response]=await db.query(`INSERT INTO country(country_name, capital, country_population, languages) VALUES(?,?,?,?);`,[country_name, capital,country_population, languages]);
            const id=response.insertId;
            const result=await Country.getCountryById(parseInt(id));
            return result;
        }else{
            throw new Error("Country with same name already exists");
        }
    }

    async destroy(){
        console.log(this.country_id);
        let [response]=await db.query(`DELETE FROM country WHERE country_id=?;`,[this.country_id]);
        console.log(response)
        const result=response.affectedRows;
        if(result===0){
            throw new Error("Country could not be deleted");
        }
        else{
            return result;
        console.log("result::"+result);
        }
        


    }



}

module.exports=Country

