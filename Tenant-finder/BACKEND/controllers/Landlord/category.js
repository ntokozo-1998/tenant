const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getCategory = (req, res) => {
    pool.query('SELECT * FROM "public"."Category" ORDER BY "categoryID" ASC ', (error, results) => {
      res.status(200).send(results.rows)
    }),handleErr
}


const postCategory = (req, res) => {

    const {categoryName} = req.body;

    pool.query('INSERT INTO "public"."Category" ("categoryName") VALUES ($1)',  [categoryName], (error, results) => {
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