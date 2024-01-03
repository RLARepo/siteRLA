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
    filename: async function(req, file, cb){
        const fileName = Date.now() + path.extname(file.originalname);
        await openDb.run(
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
    res.render('../views/index', {env : process.env.DIRETORIO});
});

app.get('/arquivos', async (req, res) => {
  const result = await openDb.all('SELECT * FROM produto;');
  return res.json({arquivos : result, status : true});
});

app.get('/upload', (req, res, file) => {
    res.render('../views/upload_img', {env : process.env.DIRETORIO});
});

app.post('/upload_files', upload.single('file'), (req, res) => {
  res.redirect('https://rla-site.onrender.com/upload');
});

app.get('/delete_files/:id', async (req, res) => {
  fs.readdir('views/static/uploads', (err, files) => {
    if (err) {
      console.error(err);
      res.json({status : false});
      return;
    }
    fs.unlink(`views/static/uploads/${files[req.params.id]}`, function(err){
      if (err) return res.json({status : false});
      return res.json({status : true});
    });
  });
});

app.listen(3000);