const Sequelize = require('sequelize');
const connection = require('./database');


// Definir o nome do model=>tabela
const Pergunta = connection.define('pergunta', {
  titulo: {
    type: Sequelize.STRING,
    /* Impede campos vazios */
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

// Sincronizar o conteudo com o banco de dados
// Se não existe, cria!
// Não force a criação!
Pergunta.sync({force: false}).then(() => {
  console.log('Tabela criada com sucesso');
});

module.exports = Pergunta;