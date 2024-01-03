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
        cb(null, 'views/static/uploads/');
    },
    filename: function(req, file, cb){
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({storage})

app.get('/', (req, res) => {
    res.render('../views/index', {env : process.env.DIRETORIO});
});

app.get('/arquivos', (req, res) => {
  fs.readdir('views/static/uploads', (err, files) => {
    if (err) {
      console.error(err);
      res.json({status : false});
      return;
    }
    return res.json({arquivos : files, status : true});
  });
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