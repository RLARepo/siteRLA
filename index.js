const pg = require('pg');
const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const pool = new pg.Pool({
    connectionString : process.env.DB_URL,
    ssl : { rejectUnauthorized: false }
})

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'views/static/uploads/')
    },
    filename: function(req, file, cb){
        const nomeProduto = req.body.produto;
        const descricaoProduto = req.body.descricao;
        const caminhoProduto = `${file.originalname + Date.now() + path.extname(file.originalname)}`;
        criarProduto(nomeProduto, caminhoProduto, descricaoProduto);
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage})

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/views/static')));

app.get('/', (req, res) => {
    res.render('../views/index', {env : process.env.DIRETORIO});
});

app.post('/upload_files', upload.single('file'), (req, res) => {
    res.render('../views/upload_img', {env : process.env.DIRETORIO});
});

app.get('/upload', (req, res) => {
    res.render('../views/upload_img', {env : process.env.DIRETORIO});
});

app.get('/itens', async (req, res) => {
    const result = await pool.query(
        `SELECT * FROM "Item";`);
    return res.json(result.rows);
})

async function criarProduto(nome, caminho, descricao){
    const ultimo = await pool.query(
        `SELECT id FROM "Item" ORDER BY id DESC LIMIT 1;`);
    const ultimoIndice = ultimo.rows[0] == undefined ? 0 : ultimo.rows[0].id;
    await pool.query(
        `INSERT INTO "Item"
            (id, caminho, nome, descricao) 
        VALUES
            ($1, $2, $3, $4);`, 
        [ultimoIndice + 1, caminho, nome, descricao]);
};

app.get('/a', (req, res) => {
    return res.json({a : 'a'});
});

app.listen(3000);