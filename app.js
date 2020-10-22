const express = require('express');
const logger = require('morgan');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const path = require('path');
const socketIo = require("socket.io");
const http = require("http");

const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./app/models/sequelize.js');


const connection = mysql.createPool({
  connectionLimit : 100,
  host: process.env.HOST,
  user: process.env.LOGIN,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

app.use(cors({
  origin: process.env.CORS,
  credentials : true
 }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  

const server = http.createServer(app);
const port = process.env.PORT;
const io = socketIo(server);

server.listen(port, ()=> console.log(`Listening on port ${port}`));

require('./app/routes/routes')(app, io);

module.exports = app;
