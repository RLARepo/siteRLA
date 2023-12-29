const pg = require('pg');
const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
  
const patha = "./uploads";
  
fs.access(patha, (error) => {
   
  // To check if the given directory 
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(patha, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
      }
    });
  } else {
    console.log("Given Directory already exists !!");
  }
});

const patha2 = "./uploads/img";

fs.access(patha2, (error) => {
   
    // To check if the given directory 
    // already exists or not
    if (error) {
      // If current directory does not exist
      // then create it
      fs.mkdir(patha2, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("New Directory created successfully !!");
        }
      });
    } else {
      console.log("Given Directory already exists !!");
    }
  });

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/')));

const pool = new pg.Pool({
    connectionString : process.env.DB_URL,
    ssl : { rejectUnauthorized: false }
});

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'uploads/img/');
    },
    filename: function(req, file, cb){
        const nomeProduto = req.body.produto;
        const descricaoProduto = req.body.descricao;
        const caminhoProduto = `${nomeProduto + Date.now() + path.extname(file.originalname)}`;
        cb(null, nomeProduto + Date.now() + path.extname(file.originalname));
        criarProduto(nomeProduto, caminhoProduto, descricaoProduto);
    }
});

const upload = multer({storage})

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

app.get('/', (req, res) => {
    res.render('../views/index', {env : process.env.DIRETORIO});
});

app.get('/itens', async (req, res) => {
    const result = await pool.query(
        `SELECT * FROM "Item";`);
    return res.json(result.rows);
});

app.get('/upload', (req, res) => {
    res.render('../views/upload_img', {env : process.env.DIRETORIO});
});

app.post('/upload_files', upload.single('file'), (req, res) => {
    res.render('../views/upload_img', {env : process.env.DIRETORIO});
});

app.get('/delete_files/:id', async (req, res) => {
    const id = req.params.id;
    const item = await pool.query(
        `SELECT * FROM "Item" WHERE id = $1 LIMIT 1;`, [id]);
    const caminho = item.rows[0];
    if(caminho == undefined) return res.json({status : false})
    fs.unlink(`uploads/img/${caminho.caminho}`, function(err){
        if (err);
    });
    await pool.query(
        `DELETE FROM "Item" WHERE id = $1;`, [id]);
    return res.json({status : true})
});

app.listen(3000);