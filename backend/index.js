import express from 'express';
const app = express();
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'QuanLyBanGame',
    password: 'aceproit',
    dialect: 'postgres',
    port: 2381
});

import bodyParser from 'body-parser';
const { json, urlencoded } = bodyParser;

app.use(cors());
app.use(json())
app.use(urlencoded({ extended: false }));


pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

 
let whitelist = ['http://localhost:3000']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.get('/testdata', cors(corsOptions) , async (req, res) => {
    try {
        const result = await pool.query('SELECT * from trochoi');
        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({
            success: false,
            error: 'Database query failed'
        });
    }
});

app.get('/user', cors(corsOptions) , async (req, res) => {
    try {
        const result = await pool.query('SELECT * from nguoidung');
        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({
            success: false,
            error: 'Database query failed'
        });
    }
});

app.get('/testdata/:id', cors(corsOptions) ,function (req, res){
    res.json({msg: 'This is CORS-enabled for only 3000.'})
})

app.post('/insertdata', cors(corsOptions), async (req, res) => {
    const { name, genre, price } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO trochoi (name, genre, price) VALUES ($1, $2, $3) RETURNING *',
            [name, genre, price]
        );
        res.status(201).json({
            success: true,
            data: result.rows[0]
        });
    } catch (err) {
        console.error('Database insert error:', err);
        res.status(500).json({
            success: false,
            error: 'Database insert failed'
        });
    }
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
});

