// ===== CARREGAR DADOS =====

fetch('assets/data/placar.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(dados) {

        // salva no LocalStorage na primeira carga
        if (!localStorage.getItem('placar')) {
            localStorage.setItem('placar', JSON.stringify(dados));
        }

        document.getElementById('nome-grupo').textContent = dados.grupo.nome;
        atualizarPlacar();
    });


// ===== ORDENAR USUÁRIOS =====

function ordenarUsuarios(usuarios) {
    return usuarios.sort(function(a, b) {
        if (b.pontos.total > a.pontos.total) return 1;
        if (b.pontos.total < a.pontos.total) return -1;
        return 0;
    });
}


// ===== PÓDIO =====

function renderizarPodio(usuarios) {

    // limpa os 3 slots antes de renderizar
    [1, 2, 3].forEach(function(posicao) {
        document.getElementById(`foto-${posicao}`).src = '';
        document.getElementById(`foto-${posicao}`).alt = '';
        document.getElementById(`nome-${posicao}`).textContent = '';
        document.getElementById(`pts-${posicao}`).textContent = '';
    });

    // pega os 3 primeiros e preenche
    const top3 = usuarios.slice(0, 3);
    top3.forEach(function(usuario, index) {
        const posicao = index + 1;
        document.getElementById(`foto-${posicao}`).src = usuario.foto;
        document.getElementById(`foto-${posicao}`).alt = usuario.nome;
        document.getElementById(`nome-${posicao}`).textContent = usuario.nome;
        document.getElementById(`pts-${posicao}`).textContent = usuario.pontos.total + ' pts';
    });
}


// ===== LISTA COMPLETA =====

function renderizarLista(usuarios) {
    const lista = document.getElementById('lista-placar');
    lista.innerHTML = '';

    usuarios.forEach(function(usuario, index) {
        const posicao = index + 1;
        lista.innerHTML += `
            <div class="lista-row">
                <div class="lista-rank">${posicao}</div>
                <img class="lista-foto" src="${usuario.foto}" alt="${usuario.nome}">
                <div class="lista-nome">${usuario.nome}</div>
                <div class="lista-pts">${usuario.pontos.total} pts</div>
            </div>
        `;
    });
}


// ===== ATUALIZAR PLACAR =====

// sempre lê do LocalStorage para garantir dados atualizados
function atualizarPlacar() {
    const dados = JSON.parse(localStorage.getItem('placar'));
    const ordenados = ordenarUsuarios(dados.usuarios);
    renderizarPodio(ordenados);
    renderizarLista(ordenados);
}


// ===== GERENCIAR GRUPO =====

function toggleGerenciar() {
    const painel = document.getElementById('painel-gerenciar');

    if (painel.style.display === 'none') {
        painel.style.display = 'block';
        renderizarGerenciar();
    } else {
        painel.style.display = 'none';
    }
}


function renderizarGerenciar() {
    const dados = JSON.parse(localStorage.getItem('placar'));
    const lista = document.getElementById('lista-gerenciar');
    lista.innerHTML = '';

    dados.usuarios.forEach(function(usuario) {
        lista.innerHTML += `
            <div class="gerenciar-row">
                <span>${usuario.nome}</span>
                <button class="btn-remover" onclick="removerUsuario('${usuario.id}')">✕</button>
            </div>
        `;
    });
}


function adicionarUsuario() {
    const input = document.getElementById('input-nome');
    const nome = input.value.trim();

    if (!nome) return;

    const dados = JSON.parse(localStorage.getItem('placar'));

    const novoUsuario = {
        id: Date.now().toString(),
        nome: nome,
        foto: 'assets/images/default.jpg',
        pontos: { tempo: 0, tarefas: 0, total: 0 }
    };

    dados.usuarios.push(novoUsuario);
    localStorage.setItem('placar', JSON.stringify(dados));

    input.value = '';
    renderizarGerenciar();
    atualizarPlacar();
}


function removerUsuario(id) {
    const dados = JSON.parse(localStorage.getItem('placar'));

    dados.usuarios = dados.usuarios.filter(function(usuario) {
        return usuario.id !== id;
    });

    localStorage.setItem('placar', JSON.stringify(dados));
    renderizarGerenciar();
    atualizarPlacar();
}