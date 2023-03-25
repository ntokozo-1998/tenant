const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getRentals = (req, res) => {
    pool.query('SELECT * FROM "public"."Rentals" ORDER BY "rentalsID" ASC ', (error, results) => {
      res.status(200).send(results.rows)
    }),handleErr
}

const getPostedRentals = (req, res) => {
    pool.query('SELECT d."categoryID", d."categoryName",l.description,l."createdAT",l."UserID",l."rentalID",l.image,l.price,l.status,l.address,l  FROM "Rentals" l, "Category" d WHERE d."categoryID" = l."categoryID', (error, results) => {
        res.status(200).send(results.rows)
    }),handleErr
}

const getPostedRentalsByUser = (req, res) => {
    pool.query('SELECT d."categoryID", d."categoryName", b.description,l."createdAT",l."UserID",l."rentalsID",l.image,l.price,l.status, u.address, u.email,u.fullname,u.phone,u.usertype FROM "rentals" l, "Category" d, "Users" u WHERE d."categoryID" = l."categoryID" = u."Userid";', (error, results) => {
        res.status(200).send(results.rows)
    }),handleErr
}

const postRentals = (req, res) => {

    const {UserID, image, price, status, categoryID, description, address}  = req.body

    pool.query('INSERT INTO "public"."Rentals"("UserID", image, price, status, "categoryID", description, address) VALUES ($1, $2, $3, $4, $5, $6, $7 )',  [UserID, image, price, status, categoryID, description, address], (error, results) => {
      if (error) {
      }
      res.status(201).send(`Rentals added`)
    })
}

const updateRentals = (request, response) => {
  const id = parseInt(request.params.id)
  const {UserID, image, price, status, categoryID, description, address}  = request.body

  pool.query('UPDATE public."Rentals" SET "UserID"=$1, image=$2, price=$3, status=$4, "categoryID"=$5, description=$6, address=$7 WHERE "rentalsID" =$8;',[UserID, image, price, status, categoryID, description, address, id],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Rentals modified with ID: ${id}`)
    }
  )
}

const deleteRentals= (req, res) => {

  

  const id = req.params.id;
  const { status } = req.body
  console.log('deleteRentals', id, status);

  pool.query('UPDATE "public"."Rentals" SET status=$1 WHERE "rentalsID" = $2;',[status,id], (error, results) => {

        console.log('Backend status',status)
        console.log(id)
        res.status(200).send('rentals archived')
      //response.send(JSON.stringify(results));

    }
  )
}

module.exports = {
    postRentals,
    getRentals,
    updateRentals,
    getPostedRentals,
    getPostedRentalsByUser,
    deleteRentals
}

