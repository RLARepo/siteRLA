const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const openDb = new sqlite3.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  function () {
    console.log("Db opened");
  }
);

var i = 0;

const storage = multer.diskStorage({
  destination : function(req, file, cb){
      cb(null, 'views/static/uploads/');
  },
  filename: async function(req, file, cb){
    const Tarquivo = file.mimetype.replaceAll(/\/[a-zA-z +0-9.\/,-^~*\\]+/g, '');
    const fileName = i + Date.now() + path.extname(file.originalname);
    const id_produto = req.body.idProduto == 'null' ? 1 : parseInt(req.body.idProduto) + 1;
    const listaItens = req.body.antesDepois.split(',');
    const tipo = req.body.tipo
    if(i == 0){
      openDb.run(
        'INSERT INTO produto(id, nome, descricao, caminho, tipo, referencia, Tarquivo) VALUES (?, ?, ?, ?, ?, ?, ?);',
        id_produto,
        req.body.nome,
        req.body.descricao,
        fileName,
        tipo,
        '',
        Tarquivo
      );
    }else{
      const subItem = i;
      
      if(listaItens.includes(`${i - 1}`)){
        openDb.get('SELECT MAX(id) AS id FROM subImagem WHERE id_produto = ?;', id_produto, (err, row) => {
          if(subItem == 1){
            openDb.run(
              `UPDATE produto SET referencia = ?, Tarquivo = Tarquivo || '-' || ? WHERE id = ?;`,
              fileName,
              Tarquivo,
              id_produto
            );
          }else{
            openDb.run(
              `UPDATE subImagem SET referencia = ?, Tarquivo = Tarquivo || '-' || ? WHERE id = ?;`,
              fileName,
              Tarquivo,
              row.id
            );
          }
        });
      }else{
        openDb.run(
          'INSERT INTO subImagem(id_produto, caminho, referencia, Tarquivo) VALUES (?, ?, ?, ?);',
          id_produto,
          fileName,
          '',
          Tarquivo
        );
      }
    }
    i += 1;
    cb(null, fileName);
  }
});

const upload = multer({storage});

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
  res.render('../views/index', {FUNCAO : "inicial", URLBASE : process.env.DIRETORIO, PARAMS : JSON.stringify(req.query)});
});

app.get('/:funcao', (req, res) => {
  res.render('../views/index', {FUNCAO : req.params.funcao, URLBASE : process.env.DIRETORIO, PARAMS : JSON.stringify(req.query)});
});

app.get('/funcao/servicos', async (req, res) => {
  openDb.all(`SELECT * FROM produto WHERE tipo = 'servico';`, [], (err, rows) => {
    return res.json({arquivos : rows, status : true});
  });
});

app.get('/funcao/servico/:id', async (req, res) => {
  openDb.get(`SELECT * FROM produto WHERE id = ? AND tipo = 'servico';`, req.params.id, (err, row) => {
    if(!row){return res.json({status : false});}
    return res.json({arquivo : row, status : true});
  });
});

app.get('/funcao/produtos', async (req, res) => {
  openDb.all(`SELECT * FROM produto WHERE tipo = 'produto';`, [], (err, rows) => {
    return res.json({arquivos : rows, status : true});
  });
});

app.get('/funcao/produto/:id', async (req, res) => {
  openDb.get(`SELECT * FROM produto WHERE id = ? AND tipo = 'produto';`, req.params.id, (err, row) => {
    if(!row){return res.json({status : false});}
    return res.json({arquivo : row, status : true});
  });
});

app.get('/funcao/sub_arquivos/:id', async (req, res) => {
  openDb.all('SELECT * FROM subImagem WHERE id_produto = ?;', req.params.id, (err, rows) => {
    if(!rows){return res.json({status : false});}
    return res.json({subArquivos : rows, status : true});
  });
});

app.get('/funcao/ultimo_arquivo', async (req, res) => {
  openDb.get('SELECT MAX(id) AS id FROM produto;', [], (err, row) => {
    return res.json({arquivo : row.id, status : true});
  });
});

app.get('/funcao/upload', (req, res, file) => {
  res.render('../views/upload', {URLBASE : process.env.DIRETORIO});
});

app.post('/funcao/upload_files', upload.array('file[]'), (req, res) => {
  i = 0
  res.json({status : true});
});

app.get('/funcao/delete_files/:id', (req, res) => {
  let retorno = {status : true};
  openDb.all('SELECT * FROM subImagem WHERE id_produto = ?;', req.params.id, (err, rows) => {
    for(const row of rows){
      fs.unlink(`views/static/uploads/${row.caminho}`, function(err){
        if (err){retorno = {status : false}};
      });
      if(row.referencia){
        fs.unlink(`views/static/uploads/${row.referencia}`, function(err){
          if (err){retorno = {status : false}};
        });
      }
    }
    openDb.get('SELECT * FROM produto WHERE id = ?;', req.params.id, (err, row) => {
      fs.unlink(`views/static/uploads/${row.caminho}`, function(err){
        if (err){retorno = {status : false}};
      });
      if(row.referencia){
        fs.unlink(`views/static/uploads/${row.referencia}`, function(err){
          if (err){retorno = {status : false}};
        });
      }
      openDb.run(
        'DELETE FROM produto WHERE id = ?;',
        req.params.id
      );
      openDb.run(
        'DELETE FROM subImagem WHERE id_produto = ?;',
        req.params.id
      );
      
      return res.json(retorno);
    });
  });
});

app.listen(process.env.PORT | 3000);