const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

var openDb = new sqlite3.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  function () {
    console.log("Db opened");
  }
);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/')));

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'views/static/uploads/');
    },
    filename: function(req, file, cb){
        const fileName = Date.now() + path.extname(file.originalname);
        openDb.run(
          'INSERT INTO produto(nome, descricao, caminho) VALUES (?, ?, ?);',
          req.body.nome,
          req.body.descricao,
          fileName
        );
        cb(null, fileName);
    }
});

const upload = multer({storage})

app.get('/', (req, res) => {
  res.render('../views/index');
});

app.get('/arquivos', async (req, res) => {
  openDb.all('SELECT * FROM produto;', [], (err, rows) => {
    return res.json({arquivos : rows, status : true});
  });
});

app.get('/upload', (req, res, file) => {
  res.render('../views/upload');
});

app.post('/upload_files', upload.single('file'), (req, res) => {
  res.redirect(process.env.DIRETORIO + '/upload');
});

app.get('/delete_files/:id', async (req, res) => {
  openDb.get('SELECT * FROM produto WHERE id = ?;', req.params.id, (err, row) => {
    let retorno = res.json({status : true});
    fs.unlink(`views/static/uploads/${row.caminho}`, function(err){
      if (err){retorno = res.json({status : false})};
    });
    openDb.run(
      'DELETE FROM produto WHERE id = ?;',
      row.id
    );
    return retorno;
  });
});

app.listen(3000);