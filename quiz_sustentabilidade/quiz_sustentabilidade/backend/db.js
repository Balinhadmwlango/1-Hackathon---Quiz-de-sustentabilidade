const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // sua senha
  database: 'banco_quiz_sustentabilidade',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
