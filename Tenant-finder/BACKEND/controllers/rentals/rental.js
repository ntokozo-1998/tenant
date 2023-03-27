//const bcrypt = require("bcrypt")
const pool = require("../../config/dbConnect");
const jwt = require("jsonwebtoken");
const Pool = require('pg').Pool;

const saltRounds = 12;

// const db = new Pool({
//     user: 'admin',  //Database username
//     host: 'localhost',  //Database host
//     database: 'tenant', //Database database
//     password: 'admin12345', //Database password
//     port: 5432//Database port
//   });

  const postRental = (req, res) => {

    // const {UserID, image, price, age, status, weight, categoryID, breedID,} = req.body;
    const {UserID, image, price, status, categoryID, description,address}  = req.body

    pool.query('INSERT INTO "public"."Rental"("UserID", image, price, status, "categoryID",  description, address) VALUES ($1, $2, $3, $4, $5, $6, $7 )',  [UserID, image, price, status, categoryID, description, address], (error, results) => {
      if (error) {
      }
      res.status(201).send(`Rental added`)
    })
}

const getRental = (req, res) => {
    pool.query('SELECT * FROM "public"."rental" ORDER BY "rentalID" ASC ', (error, results) => {
      res.status(200).send(results.rows)
    }),handleErr
}

const getPostedRental = (req, res) => {
    pool.query('SELECT d."categoryID", d."categoryName",r.description,r."createdAT",r."UserID",r."rentalID",r.image,r.price,r.status, r.address  FROM "Rental" l AND "Category" d WHERE d."categoryID" = l."categoryID";', (error, results) => {
        res.status(200).send(results.rows)
    }),handleErr
}

const getPostedRentalByUser = (req, res) => {
    pool.query('SELECT c."categoryID", c."categoryName",r."createdAT",r."UserID",r."rentalID",r.image,r.price,r.status, u.address, u.email,u.fullname,u.phone,u.usertype FROM "Rental" r, "Category" d, "Breed" b,"Users" u WHERE d."categoryID" = l."categoryID" AND r."UserID" = u."Userid";', (error, results) => {
        res.status(200).send(results.rows)
    }),handleErr
}

const updateRental = (request, response) => {
  const id = parseInt(request.params.id)
  const {UserID, image,status,categoryID, description, address}  = request.body

  pool.query('UPDATE public."Rental" SET "UserID"=$1, image=$2, price=$3,status=$4,"categoryID"=$5, description=$6,address=$7 WHERE "rentalID" =$8;',[UserID, image, status, categoryID, description, address, id],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Rental modified with ID: ${id}`)
    }
  )
}

const deleteRental= (req, res) => {

  

  const id = req.params.id;
  const { status } = req.body
  console.log('deleteRental', id, status);

  pool.query('UPDATE "public"."Rental" SET status=$1 WHERE "rentalID" = $2;',[status,id], (error, results) => {

        console.log('Backend status',status)
        console.log(id)
        res.status(200).send('transaction archived')
      //response.send(JSON.stringify(results));

    }
  )
}

module.exports = {
    postRental,
    getRental,
    updateRental,
    getPostedRental,
    getPostedRentalByUser,
    deleteRental
}

