const express = require('express');
var cors = require('cors');
require("dotenv").config();
const db = require("./config/db-config");
const app = express();
const pool = require('./config/dbConnect');

//impot classes
const routes = require("./routes/routes");

var corsOptions = {
    origin: "*"
  };
  //app.use(cors(corsOptions));


//starting the servers
// app.use(cors());
app.use(express.json());
app.use(cors(corsOptions));
app.listen(8080,() => {console.log('Server running on port 8080');});


app.get('/', (req, res) => {
  pool.connect((err, client, done) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ success: false, data: err });
      }
      client.query('SELECT NOW()', (err, result) => {
          done();
          if (err) {
              console.log(err);
              return res.status(500).json({ success: false, data: err });
          }
          return res.status(200).json({ success: true, data: result });
      });
  });
});

if(db)
{
    console.log("Database is connected");
}
app.use('/api', routes)


