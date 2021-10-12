const express = require('express');
const connection = require('./database/database');

const app = express();

// Conecta ao banco de dados
connection.authenticate().then(() => {
  console.log('Conectado ao banco!');
}).catch((err) => {
  console.log(err);
})

// Motor de HTML
app.set('view engine', 'ejs');

// Pasta e uso de rquivos estáticos
app.use(express.static('public'));

// Permite o bodyparser atuar no javascript
app.use(express.urlencoded({extended: false}));

// permite o uso de json
app.use(express.json());

app.listen(8080, () => {
  console.log('rodando');   
})
