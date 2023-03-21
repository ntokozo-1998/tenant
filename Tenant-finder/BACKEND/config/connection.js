const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
    database: 'tenant',
    password: 'admin12345',
    host: 'localhost',
    port: 5432,

  //   user: 'djaklifj',
  // database: 'djaklifj',
  // password: 'DKwTKeY5SZFs8uQ58NDgxxehI16YOAuu',
  // host: 'ruby.db.elephantsql.com',

    
//   max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
})

// -- Table: public.users

// -- DROP TABLE IF EXISTS public.users;

// CREATE TABLE IF NOT EXISTS public.users
// (
//     fullname text COLLATE pg_catalog."default",
//     email text COLLATE pg_catalog."default",
//     usertype text COLLATE pg_catalog."default",
//     phone text COLLATE pg_catalog."default",
//     address text COLLATE pg_catalog."default",
//     user_id integer NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
//     password text COLLATE pg_catalog."default",
//     CONSTRAINT users_pkey PRIMARY KEY (user_id)
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public.users
//     OWNER to admin;

module.exports = pool
