const Module = require("module");
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',  //Database username
    host: 'localhost',  //Database host
    database: 'tenant', //Database database
    password: 'admin12345', //Database password
    port: 5432//Database port
  });

module.exports = pool;