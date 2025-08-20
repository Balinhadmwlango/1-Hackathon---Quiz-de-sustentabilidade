const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // sua senha, se tiver
  database: 'banco_quiz_sustentabilidade'
}).promise();

// Salvar pontuação
router.post('/salvar', async (req, res) => {
  const { nome, pontuacao } = req.body;

  try {
    // Consulta pelo nome correto: nomeJogadores
    const [rows] = await pool.query('SELECT idjogadores FROM jogadores WHERE nomeJogadores = ?', [nome]);

    let jogadorId;

    if (rows.length > 0) {
      jogadorId = rows[0].idjogadores;
    } else {
      // Inserir novo jogador com nomeJogadores
      const [result] = await pool.query('INSERT INTO jogadores (nomeJogadores) VALUES (?)', [nome]);
      jogadorId = result.insertId;
    }

    // Inserir partida
    await pool.query(
      'INSERT INTO partidas (jogadores_idjogadores, pontuacao, dataPartida) VALUES (?, ?, NOW())',
      [jogadorId, pontuacao]
    );

    res.status(200).json({ message: 'Pontuação salva com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar pontuação:', error);
    res.status(500).json({ error: 'Erro ao salvar pontuação' });
  }
});

// Retornar ranking
router.get('/listar', async (req, res) => {
  try {
    // Selecionar nomeJogadores como nome para facilitar no front
    const [rows] = await pool.query(`
      SELECT j.nomeJogadores AS nome, MAX(p.pontuacao) AS pontuacao
      FROM jogadores j
      JOIN partidas p ON j.idjogadores = p.jogadores_idjogadores
      GROUP BY j.idjogadores
      ORDER BY pontuacao DESC
      LIMIT 10
    `);

    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    res.status(500).json({ error: 'Erro ao buscar ranking' });
  }
});

module.exports = router;
