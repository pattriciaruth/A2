const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',  // Use your MySQL username
    password: '#Beyourself08',  // Use your MySQL password
    database: 'crowdfunding_db'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Example query to retrieve all fundraisers
db.query('SELECT * FROM FUNDRAISER', (err, result) => {
    if (err) throw err;
    console.log(result);
});

module.exports = db;
