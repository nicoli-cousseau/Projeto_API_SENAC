const API_URL = 'http://localhost:3001/api/usuarios';

const listaUsuarios = document.getElementById ('listaUsuarios');

const form = document.getElementById("formUsuario");
const usuarioIdInput = document.getElementById("usuarioID");
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

            linha.innerHTML = `<td>${usuario.id}</td><td>${usuario.nome}</td><td>${usuario.email}</td>
            <td>
            <div class = "option">
            <button onclick="editarUsuario(${usuario.id})">Editar</button>
            <button style="color:#fff; background-color:#ff6347" onclick="excluirUsuario(${usuario.id})">Excluir</button>
            </div>
            </td>
            `;

            listaUsuarios.appendChild(linha);
        })

    }
    catch (error) {
        console.error('Erro:', error);
    }
}

form.addEventListener("submit", async (evento) => { // Inicia a leitura do botão salvar.
    evento.preventDefault(); // Não deixa a página atualizar.

    const id = usuarioIdInput.value; // Leitura do Id.
    const nome = nomeInput.value; // Leitura do valor em tela.
    const email = emailInput.value; // Leitura do valor em tela.


    const usuario = {
        nome,
        email
    };

    if(id){
        await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    } else {
    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });
    }
carregarUsuarios(); 
});

async function editarUsuario(id) {
    const resposta = await fetch (`${API_URL}/${id}`);
    const usuario = await resposta.json();
    usuarioIdInput.value = usuario.id;
    nomeInput.value = usuario.nome;
    emailInput.value = usuario.email;
    botaoSalvar.innerHTML = "Salvar alterações";
}

// Inicia já com nossa listagem.
carregarUsuarios();                                                         