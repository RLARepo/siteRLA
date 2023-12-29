const pg = require('pg');
const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
  
const patha = "./uploads";
  
fs.access(patha, (error) => {
  if (error) {
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
    if (error) {
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

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'uploads/img/');
    },
    filename: function(req, file, cb){
        const nomeProduto = req.body.produto;
        cb(null, nomeProduto + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage})

app.get('/', (req, res) => {
    res.render('../views/index', {env : process.env.DIRETORIO});
});

app.get('/upload', (req, res) => {
    fs.readdir('uploads/img', (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(files);
    });
    res.render('../views/upload_img', {env : process.env.DIRETORIO});
});

app.post('/upload_files', upload.single('file'), (req, res) => {
    res.render('../views/upload_img', {env : process.env.DIRETORIO});
});

app.get('/delete_files/:id', async (req, res) => {
    fs.unlink(`uploads/img/${caminho.caminho}`, function(err){
        if (err);
    });
});

app.listen(3000);