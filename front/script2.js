const API_URL = 'http://localhost:3001/api/usuarios';

const listaUsuarios = document.getElementById ('listaUsuarios');

const form = document.getElementById("formUsuario");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const botaoSalvar = document.getElementById("botaoSalvar");

// Listar usuários.
async function carregarUsuarios () {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) 
            {throw new Error (`Erro HTTP ${res.status}`);}

        const data = await resposta.json ();

        listaUsuarios.innerHTML = "";

        data.forEach(usuario => {
            const linha = document.createElement("tr");

            linha.innerHTML = `<td>${usuario.id}</td><td>${usuario.nome}</td><td>${usuario.email}</td>`;

            listaUsuarios.appendChild(linha);
        })

    }
    catch (erro){
        console.error('Erro:', erro);
    }
}

form.addEventListener("submit", async (evento) => { // Inicia a leitura do botão salvar.
    evento.preventDefault(); // Não deixa a página atualizar.

    const nome = nomeInput.value;
    const email = emailInput.value;

    const usuario = {
        nome,
        email
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)

    });
carregarUsuarios(); 
});

// Inicia já com nossa listagem.
carregarUsuarios();                                                         