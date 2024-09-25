const express = require('express');
const db = require('./crowdfunding_db');  // Import MySQL connection
const app = express();
app.use(express.json());

app.get('/api/fundraisers', (req, res) => {
    db.query('SELECT * FROM FUNDRAISER WHERE ACTIVE = TRUE', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/api/fundraiser/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ?', [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.post('/api/search_fundraisers', (req, res) => {
    const { category, organizer, city } = req.body;
    let query = 'SELECT * FROM FUNDRAISER WHERE ACTIVE = TRUE';
    const conditions = [];
    
    if (category) {
        query += ' AND CATEGORY_ID = (SELECT CATEGORY_ID FROM CATEGORY WHERE NAME = ?)';
        conditions.push(category);
    }
    if (organizer) {
        query += ' AND ORGANIZER LIKE ?';
        conditions.push(`%${organizer}%`);
    }
    if (city) {
        query += ' AND CITY LIKE ?';
        conditions.push(`%${city}%`);
    }

    db.query(query, conditions, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

const PORT = 3306;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
