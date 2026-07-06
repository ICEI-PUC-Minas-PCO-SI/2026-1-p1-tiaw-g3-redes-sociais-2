let usuarioPerfil = null;

function getUsuarioSessao() {
    return JSON.parse(sessionStorage.getItem('usuario')) || null;
}

function salvarUsuarioPerfil(usuarioAtualizado) {
    const usuarios = getUsuarios();
    const indiceUsuario = usuarios.findIndex(function(usuario) {
        return usuario.id === usuarioAtualizado.id;
    });

    if (indiceUsuario !== -1) {
        usuarios[indiceUsuario] = usuarioAtualizado;
        salvarUsuarios(usuarios);
    }

    sessionStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
    usuarioPerfil = usuarioAtualizado;
}

function getNomesInteresses(usuario) {
    const interesses = getInteresses();

    return interesses
        .filter(function(interesse) {
            return (usuario.interesses_ids || []).includes(interesse.id);
        })
        .map(function(interesse) {
            return interesse.nome;
        });
}

function getNomesRedes(usuario) {
    const redes = getRedesSociais();
    const redesUsuario = usuario.redes_sociais || [];

    return redesUsuario.map(function(redeUsuario) {
        const rede = redes.find(function(item) {
            return item.id === redeUsuario.id;
        });

        return rede ? rede.nome : null;
    }).filter(Boolean);
}

function carregarDados() {
    usuarioPerfil = getUsuarioSessao();

    if (!usuarioPerfil) {
        location.href = '../login/login.html';
        return;
    }

    preencherCampos(usuarioPerfil);
}

function preencherCampos(usuario) {
    document.getElementById('campo-nome').textContent = usuario.nome || '';
    document.getElementById('campo-email').textContent = usuario.email || '';

    if (usuario.foto) {
        document.getElementById('foto-perfil').src = usuario.foto;
    }

    renderizarLista('lista-interesses', getNomesInteresses(usuario));
    renderizarLista('lista-redes', getNomesRedes(usuario));

    if (typeof atualizarScoreUI === 'function') {
        atualizarScoreUI();
    }
}

function renderizarLista(idLista, itensSelecionados) {
    const lista = document.getElementById(idLista);
    lista.innerHTML = '';

    if (itensSelecionados.length === 0) {
        lista.innerHTML = '<li class="text-muted">Nenhum item selecionado.</li>';
        return;
    }

    itensSelecionados.forEach(function(item) {
        lista.innerHTML += `<li>${item}</li>`;
    });
}

function renderizarCheckboxes(idLista, itensDisponiveis, idsSelecionados, nomeCampo) {
    const lista = document.getElementById(idLista);
    lista.innerHTML = '';

    itensDisponiveis.forEach(function(item) {
        const marcado = idsSelecionados.includes(item.id) ? 'checked' : '';

        lista.innerHTML += `
            <li>
                <label>
                    <input type="checkbox" name="${nomeCampo}" value="${item.id}" ${marcado}>
                    ${item.nome}
                </label>
            </li>`;
    });
}

document.getElementById('input-foto').addEventListener('change', function() {
    if (!this.files || !this.files[0] || !usuarioPerfil) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const foto = event.target.result;
        document.getElementById('foto-perfil').src = foto;

        salvarUsuarioPerfil({
            ...usuarioPerfil,
            foto: foto
        });
    };

    reader.readAsDataURL(this.files[0]);
});

function ativarEdicao() {
    if (!usuarioPerfil) {
        return;
    }

    ['campo-nome', 'campo-email'].forEach(function(idCampo) {
        const campo = document.getElementById(idCampo);
        const textoAtual = campo.textContent.trim();
        campo.innerHTML = `<input type="text" value="${textoAtual}" style="border:none; outline:none; width:100%; background:transparent;">`;
    });

    renderizarCheckboxes(
        'lista-interesses',
        getInteresses(),
        usuarioPerfil.interesses_ids || [],
        'interesses'
    );

    renderizarCheckboxes(
        'lista-redes',
        getRedesSociais(),
        (usuarioPerfil.redes_sociais || []).map(function(rede) {
            return rede.id;
        }),
        'redes'
    );

    document.getElementById('btn-editar').style.display = 'none';
    document.getElementById('btn-salvar').style.display = 'inline-block';
}

function salvarEdicao() {
    if (!usuarioPerfil) {
        return;
    }

    const nome = document.querySelector('#campo-nome input').value.trim();
    const email = document.querySelector('#campo-email input').value.trim();
    const interessesIds = lerCheckboxesMarcados('lista-interesses');
    const redesIds = lerCheckboxesMarcados('lista-redes');

    const redesAtuais = usuarioPerfil.redes_sociais || [];
    const redesSociais = redesIds.map(function(idRede) {
        const redeAtual = redesAtuais.find(function(rede) {
            return rede.id === idRede;
        });

        return {
            id: idRede,
            meta_diaria_minutos: redeAtual ? redeAtual.meta_diaria_minutos : 0
        };
    });

    const usuarioAtualizado = {
        ...usuarioPerfil,
        nome: nome,
        email: email,
        interesses_ids: interessesIds,
        redes_sociais: redesSociais
    };

    salvarUsuarioPerfil(usuarioAtualizado);
    preencherCampos(usuarioAtualizado);

    document.getElementById('btn-salvar').style.display = 'none';
    document.getElementById('btn-editar').style.display = 'inline-block';
}

function lerCheckboxesMarcados(idLista) {
    const checkboxes = document.querySelectorAll(`#${idLista} input[type="checkbox"]:checked`);
    const marcados = [];

    checkboxes.forEach(function(checkbox) {
        marcados.push(Number(checkbox.value));
    });

    return marcados;
}

carregarDados();
