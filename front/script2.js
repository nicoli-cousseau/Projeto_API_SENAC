const mensagem = document.getElementById("Mensagem");
const backend = document.getElementById("Atividade_Back-End");

async function UC4 () {
    try {
        const res = await fetch('http://localhost:3000/api/mensagem');
        if (!res.ok) 
            {throw new Error ("Erro HTTP ${res.status}");}

        const data = await res.json ();
        backend.innerHTML = data.description;
        mensagem.innerHTML= data.mensagem;        
    }
    catch (erro){
        console.error('Erro:', erro);
    }
}

UC4();                                                         