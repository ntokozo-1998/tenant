const jwt = require("jsonwebtoken");
const Pool = require('pg').Pool;
const pool =  require('../../config/dbConnect')
const saltRounds = 12;

// const db = new Pool({
//     user: 'admin',  //Database username
//     host: 'localhost',  //Database host
//     database: 'tenant', //Database database
//     password: 'admin12345', //Database password
//     port: 5432//Database port
//   });

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getCategory = (req, res) => {
    pool.query('SELECT * FROM public.category ORDER BY "categoryID" ASC ', (error, results) => {

      res.status(200).send(results.rows)

    }),handleErr
}


const postCategory = (req, res) => {

    const {categoryName} = req.body;

    pool.query('INSERT INTO public.category( "categoryName") VALUES ($1);',  [categoryName], (error, results) => {
      if (error) {
      }
      res.status(201).send(`categoryName added`)
    })
}


const updateCategory = (req, res) => {
    const categoryID = parseInt(req.params.id);
    const { categoryName } = req.body

    console.log(categoryName)
  
    pool.query('UPDATE "public"."Category" SET "categoryName"=$1 WHERE "categoryID" = $2',[categoryName, categoryID], (error, results) => {
        
          res.status(200).send()
        //response.send(JSON.stringify(results));
        
      }
    )
  }

module.exports = {
    postCategory,
    getCategory,
    updateCategory
}