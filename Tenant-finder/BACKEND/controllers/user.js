//const bcrypt = require("bcrypt")
const pool = require("../config/dbConnect");
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

exports.register = async (req, res)=>{ 

    const { email , password ,fullname ,phone , address, usertype} = req.body;

    console.log(req.body)

    const sql = 'SELECT * FROM users WHERE email = $1';
    pool.query(sql,[email],(err, results)=>{
        //console.log(results)
        if(results.rowCount == 0)
        {
                pool.query(
                    'INSERT INTO users (email , password ,fullname ,phone , address, usertype) VALUES ($1,$2,$3,$4,$5,$6) RETURNING user_id',[email , password ,fullname ,phone , address, usertype],
                    (db_err,results) => {
                        if(db_err)
                        {
                            res.status(400).json({message:'Query failed'});
                        }else
                        {
                            res.status(200).json({message: fullname+' has been registered, Please login'});
                        }
            })
        }else
        {
            res.status(400).json({message:'User already exists, Please login!'});
        }
    });
}

exports.login =  (req, res)=>{

    const {email,password} = req.body;
    const sql = 'SELECT * FROM users WHERE email = $1';
    pool.query(sql,[email],(err, results)=>{
        if(err) 
        {res.status(400).json({message: "Error communicating with database"})}
        else{
            if(results.rowCount == 0)
            {
                res.status(400).json({message: "User does not exist, Please register"})
            }else{
                    if(password != results.rows[0].password)
                    {
                        res.status(400).json({message: "Invalid Credentials, Please try again"});

                    }else
                    {
                        const token = jwt.sign({
                                user_id: results.rows[0].user_id,
                                email: results.rows[0].email,
                                address: results.rows[0].address,
                                fullname: results.rows[0].fullname,
                                usertype: results.rows[0].usertype,
                                phone: results.rows[0].phone,
                                password: results.rows[0].password,
                            },
                            "process.env.SECRET_KEY",{
                                algorithm: 'HS256',
                                expiresIn: 120
                            });
                            res.status(200).json({message: "Welcome! "+results.rows[0].fullname,token: token,}); 
                   }
                 
                    
                }

            

        }

    })  
}

exports.getOneUser = (req, res) => {

    const user_id = req.params.user_id;

    const sql = 'SELECT * FROM users WHERE user_id = $1';
    db.query(sql,[user_id],(err, results)=>{
        if(err) { res.status(400).json({message:'Query failed'}) }else{
            res.status(200).json(results.rows[0]);
        }
    })
}


exports.updateUser = async (req, res)=>{
   
    const user_id = req.params.user_id;
    const { password ,fullname } = req.body;
  
    db.query(
      'UPDATE users SET password = $1 ,fullname = $ WHERE user_id = $5',
        [password ,fullname , user_id],
       (error,results) => {
        if (error) {
            res.status(400).json({message:'Query failed'});
        }else {res.status(200).json({message:'Your profile was updated successfully'});}
    
      })
}
