const pg = require('pg');
const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

const pool = new pg.Pool({
    connectionString : process.env.DB_URL,
    ssl : true
})

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/views/static')));

app.get('/', (req, res) => {
    res.render('../views/index');
});

app.get('/teste', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    return res.json(result.rows[0]);
});

app.get('/a', (req, res) => {
    return res.json({a : 'a'});
});

app.listen(3000);