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
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log("Connected to Database !");
    });
});

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

app.get('/trochoi', cors(corsOptions), async (req, res) => {
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

app.post('/trochoi', cors(corsOptions), async (req, res) => {
    const { title, typeid, author, cost, description, storedNumber, image, link } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO trochoi (tieude, idtl, nhaphathanh, giaban, mota, slkho, hinhanh, duongdan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [title, typeid, author, cost, description, storedNumber, image, link]
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

app.put('/trochoi/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    const { title, typeid, author, cost, description, storedNumber, image, link } = req.body;
    try {
        const result = await pool.query(
            'UPDATE trochoi SET tieude = $1, idtl = $2, nhaphathanh = $3, giaban = $4, mota = $5, slkho = $6, hinhanh = $7, duongdan = $8 WHERE idtc = $9 RETURNING *',
            [title, typeid, author, cost, description, storedNumber, image, link, id]
        );
        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (err) {
        console.error('Database update error:', err);
        res.status(500).json({
            success: false,
            error: 'Database update failed'
        });
    }
});

app.delete('/trochoi/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM trochoi WHERE idtc = $1', [id]);
        res.status(200).json({
            success: true,
            message: 'Record deleted successfully'
        });
    } catch (err) {
        console.error('Database delete error:', err);
        res.status(500).json({
            success: false,
            error: 'Database delete failed'
        });
    }
});

app.get('/theloaitrochoi', cors(corsOptions), async (req, res) => {
    try {
        const result = await pool.query('SELECT * from theloaitrochoi');
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

app.post('/theloaitrochoi', cors(corsOptions), async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO theloaitrochoi (tentheloai, motatl) VALUES ($1, $2) RETURNING *',
            [name, description]
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

app.put('/theloaitrochoi/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const result = await pool.query(
            'UPDATE theloaitrochoi SET tentheloai = $1, motatl = $2 WHERE idtl = $3 RETURNING *',
            [name, description, id]
        );
        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (err) {
        console.error('Database update error:', err);
        res.status(500).json({
            success: false,
            error: 'Database update failed'
        });
    }
});

app.delete('/theloaitrochoi/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM theloaitrochoi WHERE idtl = $1', [id]);
        res.status(200).json({
            success: true,
            message: 'Record deleted successfully'
        });
    } catch (err) {
        console.error('Database delete error:', err);
        res.status(500).json({
            success: false,
            error: 'Database delete failed'
        });
    }
});

app.get('/donhang', cors(corsOptions), async (req, res) => {
    try {
        const result = await pool.query('SELECT * from donhang');
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

app.post('/donhang', cors(corsOptions), async (req, res) => {
    const { userId, date, amount, state } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO donhang (idnd, ngaydat, tonggiatri, trangthai) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, date, amount, state]
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

app.put('/donhang/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    const { userId, date, amount, state } = req.body;
    try {
        const result = await pool.query(
            'UPDATE donhang SET idnd = $1, ngaydat = $2, tonggiatri = $3, trangthai = $4 WHERE iddh = $5 RETURNING *',
            [userId, date, amount, state, id]
        );
        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (err) {
        console.error('Database update error:', err);
        res.status(500).json({
            success: false,
            error: 'Database update failed'
        });
    }
});

app.delete('/donhang/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM donhang WHERE iddh = $1', [id]);
        res.status(200).json({
            success: true,
            message: 'Record deleted successfully'
        });
    } catch (err) {
        console.error('Database delete error:', err);
        res.status(500).json({
            success: false,
            error: 'Database delete failed'
        });
    }
});

app.get('/chitietdonhang', cors(corsOptions), async (req, res) => {
    try {
        const result = await pool.query('SELECT * from chitietdonhang');
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

app.post('/chitietdonhang', cors(corsOptions), async (req, res) => {
    const { orderId, productId, quantity, price } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO chitietdonhang (iddh, idtc, soluong, giatungtc) VALUES ($1, $2, $3, $4) RETURNING *',
            [orderId, productId, quantity, price]
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

app.put('/chitietdonhang/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    const { orderId, productId, quantity, price } = req.body;
    try {
        const result = await pool.query(
            'UPDATE chitietdonhang SET iddh = $1, idtc = $2, soluong = $3, giatungtc = $4 WHERE idctdh = $5 RETURNING *',
            [orderId, productId, quantity, price, id]
        );
        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (err) {
        console.error('Database update error:', err);
        res.status(500).json({
            success: false,
            error: 'Database update failed'
        });
    }
});

app.delete('/chitietdonhang/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM chitietdonhang WHERE idctdh = $1', [id]);
        res.status(200).json({
            success: true,
            message: 'Record deleted successfully'
        });
    } catch (err) {
        console.error('Database delete error:', err);
        res.status(500).json({
            success: false,
            error: 'Database delete failed'
        });
    }
});

app.get('/hotrokhachhang', cors(corsOptions), async (req, res) => {
    try {
        const result = await pool.query('SELECT * from hotrokhachhang');
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

app.post('/hotrokhachhang', cors(corsOptions), async (req, res) => {
    const { customerId, issue, status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO hotrokhachhang (idnd, issue, status) VALUES ($1, $2, $3) RETURNING *',
            [customerId, issue, status]
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

app.put('/hotrokhachhang/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    const { customerId, issue, status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE hotrokhachhang SET idnd = $1, issue = $2, status = $3 WHERE id = $4 RETURNING *',
            [customerId, issue, status, id]
        );
        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (err) {
        console.error('Database update error:', err);
        res.status(500).json({
            success: false,
            error: 'Database update failed'
        });
    }
});

app.delete('/hotrokhachhang/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM hotrokhachhang WHERE id = $1', [id]);
        res.status(200).json({
            success: true,
            message: 'Record deleted successfully'
        });
    } catch (err) {
        console.error('Database delete error:', err);
        res.status(500).json({
            success: false,
            error: 'Database delete failed'
        });
    }
});

app.get('/nguoidung', cors(corsOptions), async (req, res) => {
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

const generateUniqueId = async () => {
    let idnd;
    let exists = true;
    while (exists) {
        idnd = Math.floor(Math.random() * (100000 - 101 + 1)) + 101;
        const result = await pool.query('SELECT idnd FROM nguoidung WHERE idnd = $1', [idnd]);
        if (result.rows.length === 0) {
            exists = false;
        }
    }
    return idnd;
};

app.post('/nguoidung', cors(corsOptions), async (req, res) => {
    const { username, email, password } = req.body;
    const role = "khachhang"; 
    try {
        const idnd = await generateUniqueId();
        console.log(username + email+idnd+password)
        const result = await pool.query(
            'INSERT INTO nguoidung (idnd, tennguoidung, email, mk, vaitro) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [idnd, username, email, password, role]
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

app.put('/nguoidung/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role, transactionHistory } = req.body;
    try {
        const result = await pool.query(
            'UPDATE nguoidung SET tennguoidung = $1, email = $2, matkhau = $3, vaitro = $4, lsgiaodich = $5 WHERE idnd = $6 RETURNING *',
            [username, email, password, role, transactionHistory, id]
        );
        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (err) {
        console.error('Database update error:', err);
        res.status(500).json({
            success: false,
            error: 'Database update failed'
        });
    }
});

app.delete('/nguoidung/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM nguoidung WHERE idnd = $1', [id]);
        res.status(200).json({
            success: true,
            message: 'Record deleted successfully'
        });
    } catch (err) {
        console.error('Database delete error:', err);
        res.status(500).json({
            success: false,
            error: 'Database delete failed'
        });
    }
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
});

