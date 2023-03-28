
const Pool = require('pg').Pool;
const pool =  require('../config/dbConnect')


exports.addPost = async (req, res)=>{
    const user_id = req.params.user_id;
    const {image, price , description ,address} = req.body;
    //const freelancer = req.params.freelancer;

    //console.log(req.body)
    
    const sql = 'INSERT INTO rental (price, address, image, description, user_id,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING rental_id';
 
    pool.query(sql,[price,image ,address, description , user_id, false,0],(err,results)=>{
        if(err)
        {
            res.status(400).json({message:'Query failed'});

        }else
        {
            res.status(200).json({message: 'Your post was successfully added '});
        }

    });
}

exports.getPosts = async (req, res)=>{

    const sql = 'SELECT * FROM rental WHERE hidden = $1  and status = $2';
    pool.query(sql,[false,0],(error,results)=>{
        if(error)
        {
            //console.log(error)
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getLandlordPosts = async (req, res)=>{


    const user_id = req.params.user_id;

    const sql = 'SELECT * FROM rental WHERE user_id = $1 and hidden = $2';

    pool.query(sql,[user_id,false],(error,results)=>{
        if(error)
        {
            //console.log(error)
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.deletePost = async (req, res)=>{

    const sql = 'UPDATE rental SET hidden = $2 WHERE rental_id = $1';
    pool.query(sql,[req.params.rental_id,true],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json({message:'rental Post Deleted'});

        }

    })
    
}


// exports.getCompleted = async (req, res)=>{
    
//     completed = 100;
//     const sql = 'SELECT * FROM posts WHERE status = $1 and (user_id = $2 or dev_id = $3)';
//     db.query(sql,[completed,req.params.user_id,req.params.user_id],(error,results)=>{
//         if(error)
//         {
//             res.status(400).json({message:'Query failed'});
//         }else{
            

//             res.status(200).json(results.rows);

//         }

//     })
    
// }

// exports.getInProgress = async (req, res)=>{
//     completed = 100;
//     noStatus = 0;
//     const sql = 'SELECT * FROM posts WHERE (user_id = $2 or dev_id = $3) and status <> $1 and status <> $4';
//     db.query(sql,[completed,req.params.user_id,req.params.user_id,noStatus],(error,results)=>{
//         if(error)
//         {
//             res.status(400).json({message:'Query failed'});
//         }else{

//             res.status(200).json(results.rows);

//         }

//     })
    
// }

// exports.getPostStatus = async (req, res)=>{

//     const post_id = req.params.post_id;

//     const sql = 'SELECT * FROM rental WHERE rental_id = $1';
//     db.query(sql,[post_id],(error,results)=>{
//         if(error)
//         {
//             res.status(400).json({message:'Query failed'});
//         }else{

//             res.status(200).json(results.rows);

//         }

//     })

// }

// exports.getOnePost = async (req, res)=>{
//     const user_id = req.params.user_id;

//     const sql = 'SELECT * FROM rental WHERE user_id = $1';
//     db.query(sql,[user_id],(error,results)=>{
//         if(error)
//         {
//             res.status(400).json({message:'Query failed'});
//         }else{

//             res.status(200).json(results.rows);

//         }

//     })
    
// }

// exports.updatePost = async (req, res)=>{
    
//     const post_id = req.params.post_id;
//     const { rental_price, rental_image, rental_desc } = req.body;
  
//     pool.query(
//       'UPDATE rental SET  rental_price = $1, rental_image = $2, rental_desc= $3 WHERE rental_id = $4',
//       [rental_price, rental_image, rental_desc,rental_id],
//       (error, results) => {
//         if (error) {
//             res.status(400).json({message:error.message});
//         }else {res.status(200).json({message:'Your post was successfully updated'});}

        
//       }
//     )
// }

// exports.updateStatus = async (req, res)=>{
    
   
//     const {status,post_id} = req.body;

//     pool.query(
//       'UPDATE rental SET status = $1 WHERE rental_id = $2',
//       [status,post_id],
//       (error, results) => {
//         if (error) {

//             res.status(400).json({message:error.message});

//         }else{res.status(200).json({message:'Your post was successfully updated'});}
//       }
//     )
// }


