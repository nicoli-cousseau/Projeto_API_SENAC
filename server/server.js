require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.MINHA_PORT;

app.use(cors());
app.use(express.json());

let produtos = [
    { id: 1, nome: 'Teclado Mecânico', preco: 250 },
    { id: 2, nome: 'Mouse Gamer', preco: 150 }
];

// GET: Listar todos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// POST: Criar novo
app.post('/produtos', (req, res) => {
    const novoProduto = {
        id: produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1,
        nome: req.body.nome,
        preco: req.body.preco
    };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// PUT: Editar um produto pelo ID
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index !== -1) {
        produtos[index] = {
            id: id,
            nome: req.body.nome,
            preco: req.body.preco
        };
        res.json(produtos[index]);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
});

// DELETE: Remover um produto pelo ID
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index !== -1) {
        const deletado = produtos.splice(index, 1);
        res.json({ mensagem: 'Produto removido com sucesso', produto: deletado[0] });
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor atualizado em http://localhost:${PORT}`);
});