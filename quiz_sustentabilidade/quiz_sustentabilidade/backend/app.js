const express = require('express');
const cors = require('cors');
const rankingRoutes = require('./routes/ranking');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/ranking', rankingRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});

//cd C:\xampp\htdocs\quiz_sustentabilidade\backend
//npm install express mysql2 cors
//node app.js
