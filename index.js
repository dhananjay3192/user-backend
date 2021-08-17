const express = require('express')
const app = express();
const fs = require("fs");
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '192.168.44.35',
  user: 'globalids',
  password: 'Globalids@2001',
  database: 'mysql',
  // port: '3306'
});

console.log("conection", connection)
connection.connect((err) => {
  if (err) {
    console.log("err", err)
  }
  else{
    console.log('Connected to MySQL Server!');
  }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const routesPath = require('./app/routes/users');
routesPath(app);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
