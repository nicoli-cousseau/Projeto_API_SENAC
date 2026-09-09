const express = require ('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/mensagem', (req, res) => {
    res.json({mensagem: 'Olá do backend com Express!', description: "Descrição"});
});

app.listen(PORT, () => {
    console.log(`Servidor atualizado em http://localhost:${PORT}`);
});