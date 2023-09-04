const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'',
    user:'',
    password:'',
    port:3306,
    database:''
});

export default connection;