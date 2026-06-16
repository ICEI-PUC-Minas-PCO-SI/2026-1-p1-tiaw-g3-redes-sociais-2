// ===== CARREGAR DADOS =====

function carregarDados() {
    const dadosSalvos = localStorage.getItem('usuario');

    if (dadosSalvos) {
        const usuario = JSON.parse(dadosSalvos);
        preencherCampos(usuario);
    } else {
        fetch('assets/data/usuario.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(usuario) {
                // CORRIGIDO: salva o JSON no LocalStorage logo na primeira carga
                localStorage.setItem('usuario', JSON.stringify(usuario));
                preencherCampos(usuario);
            });
    }
}


// ===== PREENCHER OS CAMPOS =====

function preencherCampos(usuario) {
    document.getElementById('campo-nome').textContent = usuario.nome;
    document.getElementById('campo-email').textContent = usuario.email;
    document.getElementById('campo-instagram').textContent = usuario.instagram;
    document.getElementById('campo-facebook').textContent = usuario.facebook;
    document.getElementById('campo-twitter').textContent = usuario.twitter;

    if (usuario.foto) {
        document.getElementById('foto-perfil').src = usuario.foto;
    }

    // NOVO: renderiza os itens selecionados nos cards
    renderizarLista('lista-interesses', usuario.interesses_selecionados);
    renderizarLista('lista-redes', usuario.redes_selecionadas);
}


// ===== RENDERIZAR LISTA (modo visualização) =====

function renderizarLista(idLista, itensSelecionados) {
    const lista = document.getElementById(idLista);
    lista.innerHTML = ''; // limpa a lista antes de preencher

    itensSelecionados.forEach(function(item) {
        lista.innerHTML += `<li>${item}</li>`;
    });
}


// ===== RENDERIZAR CHECKBOXES (modo edição) =====

function renderizarCheckboxes(idLista, itensDisponiveis, itensSelecionados) {
    const lista = document.getElementById(idLista);
    lista.innerHTML = '';

    itensDisponiveis.forEach(function(item) {
        const marcado = itensSelecionados.includes(item) ? 'checked' : '';
        lista.innerHTML += `
            <li>
                <label>
                    <input type="checkbox" value="${item}" ${marcado}>
                    ${item}
                </label>
            </li>`;
    });
}


// ===== FOTO DE PERFIL =====

document.getElementById('input-foto').addEventListener('change', function() {
    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById('foto-perfil').src = e.target.result;

        const dadosSalvos = localStorage.getItem('usuario');
        const usuario = dadosSalvos ? JSON.parse(dadosSalvos) : {};
        usuario.foto = e.target.result;
        localStorage.setItem('usuario', JSON.stringify(usuario));
    };

    reader.readAsDataURL(this.files[0]);
});


// ===== EDITAR =====

function ativarEdicao() {
    // info-boxes viram inputs
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(function(box) {
        const textoAtual = box.textContent.trim();
        box.innerHTML = `<input type="text" value="${textoAtual}" style="border:none; outline:none; width:100%; background:transparent;">`;
    });

    // CORRIGIDO: busca os dados do LocalStorage OU do JSON
    const dadosSalvos = localStorage.getItem('usuario');

    if (dadosSalvos) {
        const usuario = JSON.parse(dadosSalvos);
        renderizarCheckboxes('lista-interesses', usuario.interesses_disponiveis, usuario.interesses_selecionados);
        renderizarCheckboxes('lista-redes', usuario.redes_disponiveis, usuario.redes_selecionadas);

        document.getElementById('btn-editar').style.display = 'none';
        document.getElementById('btn-salvar').style.display = 'inline-block';

    } else {
        // se não tiver no LocalStorage, busca do JSON
        fetch('assets/data/usuario.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(usuario) {
                renderizarCheckboxes('lista-interesses', usuario.interesses_disponiveis, usuario.interesses_selecionados);
                renderizarCheckboxes('lista-redes', usuario.redes_disponiveis, usuario.redes_selecionadas);

                document.getElementById('btn-editar').style.display = 'none';
                document.getElementById('btn-salvar').style.display = 'inline-block';
            });
    }
}


// ===== SALVAR =====

function salvarEdicao() {
    // salva info-boxes
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(function(box) {
        const novoValor = box.querySelector('input').value;
        box.textContent = novoValor;
    });

    // NOVO: lê os checkboxes marcados
    const interessesMarcados = lerCheckboxesMarcados('lista-interesses');
    const redesMarcadas = lerCheckboxesMarcados('lista-redes');

    // volta para modo visualização
    renderizarLista('lista-interesses', interessesMarcados);
    renderizarLista('lista-redes', redesMarcadas);

    // monta o objeto e salva no LocalStorage
    const dadosSalvos = localStorage.getItem('usuario');
    const usuarioAtual = dadosSalvos ? JSON.parse(dadosSalvos) : {};

    const usuario = {
        id: usuarioAtual.id,
        nome: document.getElementById('campo-nome').textContent,
        email: document.getElementById('campo-email').textContent,
        instagram: document.getElementById('campo-instagram').textContent,
        facebook: document.getElementById('campo-facebook').textContent,
        twitter: document.getElementById('campo-twitter').textContent,
        foto: usuarioAtual.foto || null,
        interesses_disponiveis: usuarioAtual.interesses_disponiveis,
        interesses_selecionados: interessesMarcados,
        redes_disponiveis: usuarioAtual.redes_disponiveis,
        redes_selecionadas: redesMarcadas
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));

    document.getElementById('btn-salvar').style.display = 'none';
    document.getElementById('btn-editar').style.display = 'inline-block';
}


// ===== LER CHECKBOXES MARCADOS =====

function lerCheckboxesMarcados(idLista) {
    const checkboxes = document.querySelectorAll(`#${idLista} input[type="checkbox"]:checked`);
    const marcados = [];

    checkboxes.forEach(function(checkbox) {
        marcados.push(checkbox.value);
    });

    return marcados;
}


// ===== INICIA A PÁGINA =====
carregarDados();