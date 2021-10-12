const express = require('express');
const connection = require('./database/database');

// Models
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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

// rotas da aplicação
app.get('/', (req, res) => {
  // raw traz apenas os dados especificos. DESC|ASC
  Pergunta.findAll({raw: true, order:[['id', 'DESC']]}).then(perguntas=>{
    res.render('index', {perguntas: perguntas});
  })
})

app.get('/perguntar', (req, res) => {
  res.render('perguntar');
})

app.post('/salvarpergunta', (req, res)=> {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  // Inserir os dados recebidos
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    // Se der certo, redirecione para a pasta principal
    res.redirect('/');
  })
})

app.get('/pergunta/:id', (req, res) => {
  var id = req.params.id;

  Pergunta.findOne({
    where: {id: id}
  }).then(pergunta => {

    // undefined?
    if(pergunta != undefined) {
      Resposta.findAll({
        where: {perguntaId: pergunta.id},
        order: [['id', 'DESC']]
      }).then(respostas =>{
        res.render('pergunta', {
          pergunta: pergunta,
          respostas: respostas
        });
      });
    } else {
      res.redirect('/');
    }
  })
})


app.post('/responder', (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect("/pergunta/" + perguntaId);
  })
});

app.listen(8080, () => {
  console.log('rodando');   
})
