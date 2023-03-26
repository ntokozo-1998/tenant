const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getUsers = (req, res) => {
    pool.query('SELECT * FROM public."Users" ORDER BY "Userid" ASC ', (error, results) => {
      res.status(200).send(results.rows)
    }),handleErr
}




const postUsers = (req, res) => {   

    const { fullname, email, password ,phone ,address , usertype} = req.body;

    pool.query('INSERT INTO public."Users" (fullname, email, password, phone, address, usertype) VALUES ($1, $2, $3, $4, $5,$6)',  [fullname, email, password, phone, address, usertype], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateUser = (req, res) => {

    const Userid = req.params.id;
    const { fullname, email, phone ,address ,status, id_document, agric_document } = req.body
  
    pool.query('UPDATE "public"."Users" SET fullname=$1, email=$2, phone=$3, address=$4, status=$5, id_document =$6, agric_document= $7 WHERE "Userid" = $8;',[fullname, email, phone ,address ,status, id_document, agric_document, Userid], (error, results) => {
        
          res.status(200).send('User updated')
        //response.send(JSON.stringify(results));
  
      }
    )
  }

  const deleteUser = (req, res) => {

    const Userid = req.params.id;
    const { status } = req.body
  
    pool.query('UPDATE "public"."Users" SET status=$1 WHERE "Userid" = $2;',[status,Userid], (error, results) => {
        
          res.status(200).send('User archived')
        //response.send(JSON.stringify(results));
        
      }
    )
  }

module.exports = {
    getUsers,
    postUsers,
    updateUser,
    deleteUser
  }
