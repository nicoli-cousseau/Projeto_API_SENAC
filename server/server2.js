const express = require ('express'); // Inserimos o express.
const cors = require('cors'); //Inserimos o roteamento do cors.
const fs = require ('fs'); //Inserimos edução de arquivos.

const app = express(); // Definimos o app para utilizar o express().

const PORT = 3001; // Definimos a porta do Back.
const ARQUIVO = "./dados.json"; // Definimos o arquivo em que os dados serão persistidos. 

app.use(cors()); // Ativamos o app para usar o cors.
app.use(express.json()); // Ativamos o app para utilizar estruturas json.

 // Funções auxiliares.
 function leituraUsuarios () {
    const dados = fs.readFileSync (ARQUIVO, "utf-8")
    return JSON.parse(dados);
 }

 function salvarUsuarios(usuarios){
    fs.writeFileSync(ARQUIVO, JSON.stringify(usuarios, null, 2)); // Null e 2: para quebrar a linha e ficar visualmente melhor. 
 }

//  GET: Listar todos. 
app.get('/api/usuarios', (req, res) => {
    const usuarios = leituraUsuarios();
    res.json(usuarios);
});

// POST: criar.
app.post('/api/usuarios', (req, res) => {
    const {nome, email} = req.body; // Leitura da req do body.

    if  (!nome || !email) { // Valida campo para não vir vazio. 
        return res.status(400).json ({mensagem: "Nome e email são obrigatórios!"});
    }

    const usuarios = leituraUsuarios (); // Fazemos a leitura dos usuários para a memória. 

    const novoUsuario = {id: Date.now(), nome, email}; // Fazemos os objetos do novo usuário. 

    usuarios.push(novoUsuario); // Adicionamos ao final da lista de usuários. 

    salvarUsuarios(usuarios); // Salvamos o usuário no arquivo.

    res.status(201).json(novoUsuario); // Retorna sucesso ao criar novo usuário.
});

app.listen(PORT, () => {
    console.log(`Servidor atualizado em http://localhost:${PORT}`);
});