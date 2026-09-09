const API_URL = 'http://localhost:3000/produtos';

        // 1. Buscar e Listar Produtos (GET)
        async function buscarProdutos() {
            try {
                const resposta = await fetch(API_URL);
                const produtos = await resposta.json();
                
                const lista = document.getElementById('lista-produtos');
                lista.innerHTML = '';

                produtos.forEach(produto => {
                    const item = document.createElement('li');
                    
                    item.innerHTML = `
                        <span>${produto.nome} - R$ ${produto.preco}</span>
                        <div>
                            <button class="btn-editar" onclick="prepararEdicao(${produto.id}, '${produto.nome}', ${produto.preco})">Editar</button>
                            <button class="btn-excluir" onclick="deletarProduto(${produto.id})">Excluir</button>
                        </div>
                    `;
                    lista.appendChild(item);
                });
            } catch (erro) {
                console.error('Erro ao buscar produtos:', erro);
            }
        }

        // 2. Criar (POST) ou Editar (PUT) ao submeter o formulário
        document.getElementById('form-produto').addEventListener('submit', async (e) => {
            e.preventDefault();

            const id = document.getElementById('produto-id').value;
            const nome = document.getElementById('nome').value;
            const preco = Number(document.getElementById('preco').value).toFixed(2);

            const dadosProduto = { nome, preco};

            try {
                let resposta;
                
                if (id) {
                    // Se tem ID, envia PUT para editar
                    resposta = await fetch(`${API_URL}/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(dadosProduto)
                    });
                } else {
                    // Se não tem ID, envia POST para criar novo
                    resposta = await fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(dadosProduto)
                    });
                }

                if (resposta.ok) {
                    buscarProdutos();
                    resetarFormulario();
                }
            } catch (erro) {
                console.error('Erro ao salvar produto:', erro);
            }
        });

        // 3. Deletar Produto (DELETE)
        async function deletarProduto(id) {
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                try {
                    const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                    if (resposta.ok) {
                        buscarProdutos();
                    }
                } catch (erro) {
                    console.error('Erro ao deletar produto:', erro);
                }
            }
        }

        // 4. Jogar os dados do produto de volta para o formulário
        function prepararEdicao(id, nome, preco) {
            document.getElementById('produto-id').value = id;
            document.getElementById('nome').value = nome;
            document.getElementById('preco').value = preco;
            
            document.getElementById('form-titulo').textContent = 'Editar Produto';
            document.getElementById('btn-salvar').textContent = 'Salvar Alterações';
            document.getElementById('btn-cancelar').style.display = 'inline-block';
        }

        // Helper para limpar e resetar o formulário
        function resetarFormulario() {
            document.getElementById('form-produto').reset();
            document.getElementById('produto-id').value = '';
            document.getElementById('form-titulo').textContent = 'Adicionar Produto';
            document.getElementById('btn-salvar').textContent = 'Adicionar';
            document.getElementById('btn-cancelar').style.display = 'none';
        }

        buscarProdutos();