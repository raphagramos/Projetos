import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'padaria',
  connectionLimit: 10,
  waitForConnections: true,
});

app.get('/', (req, res) => {
  return res.json("From Backend Side");
});

app.get('/clientes', (req, res) => {
  const sql = "SELECT * FROM clientes";
  pool.query(sql, (err, data) => {
    if (err) {
      console.error('Erro na consulta ao banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    console.log('Resposta do banco de dados:', data);
    return res.json(data);
  });
});

app.post('/clientes', (req, res) => {
  try {

    const { nome, endereco, telefone } = req.body;


    if (!nome || !endereco || !telefone) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }


    const sql = 'INSERT INTO clientes (nm_cliente, endereco, telefone) VALUES (?, ?, ?)';

 
    pool.query(sql, [nome, endereco, telefone], (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados no banco de dados:', err);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }


      console.log('Cliente cadastrado com sucesso. ID do Cliente:', result.insertId);
      return res.json({ success: true, insertedId: result.insertId });
    });
  } catch (error) {

    console.error('Erro no processamento da requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log("Servidor ouvindo na porta", PORT);
});
