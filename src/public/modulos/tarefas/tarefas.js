const STORAGE_KEY = "tarefas";

let usuarioLogado = null;
let tarefas = [];


function getUsuarioSessao() {
    return JSON.parse(sessionStorage.getItem("usuario")) || null;
}


function getTarefasStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function salvarTarefasStorage(todasTarefas) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todasTarefas));
}


function carregarDados() {
    usuarioLogado = getUsuarioSessao();

    if (!usuarioLogado) {
        location.href = "../login/login.html";
        return;
    }

    const todasTarefas = getTarefasStorage();

    tarefas = todasTarefas.filter(function (tarefa) {
        return tarefa.id_usuario === usuarioLogado.id;
    });

    renderizarTarefas();
}


function renderizarTarefas(lista) {
    const ul = document.getElementById("listaTarefas");
    ul.innerHTML = "";

    if (!lista || lista.length === 0) {
        ul.innerHTML = `
            <li class="list-group-item text-center text-secondary">
                Nenhuma tarefa encontrada.
            </li>
        `;
        return;
    }

    lista.forEach(function (tarefa) {
        ul.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="${tarefa.concluida ? "text-decoration-line-through text-secondary" : ""}">
                    <strong>${tarefa.titulo}</strong>
                    <br>
                    <small>${tarefa.tempo} minutos</small>
                </div>

                <div class="d-flex align-items-center gap-3">
                    <input 
                        type="checkbox"
                        class="form-check-input"
                        ${tarefa.concluida ? "checked" : ""}
                        onchange="toggleConclusao(${tarefa.id})"
                    >

                    <button 
                        class="btn btn-sm btn-outline-danger"
                        onclick="excluirTarefa(${tarefa.id})"
                    >
                        ✕
                    </button>
                </div>
            </li>
        `;
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("taskName").value.trim();
        const tempo = parseInt(document.getElementById("taskTime").value, 10);

        if (!nome || isNaN(tempo) || tempo < 1) return;

        const todasTarefas = getTarefasStorage();

        const novaTarefa = {
            id: Date.now(),
            id_usuario: usuarioLogado.id,
            titulo: nome,
            data: new Date().toISOString().slice(0, 10),
            tempo: tempo,
            concluida: false
        };

        todasTarefas.push(novaTarefa);

        salvarTarefasStorage(todasTarefas);

        tarefas = todasTarefas.filter(function (tarefa) {
            return tarefa.id_usuario === usuarioLogado.id;
        });

        renderizarTarefas(tarefas);

        form.reset();
    });

    carregarDados();
});


function toggleConclusao(id) {
    const todasTarefas = getTarefasStorage();

    const tarefa = todasTarefas.find(function (t) {
        return t.id === id && t.id_usuario === usuarioLogado.id;
    });

    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;

    salvarTarefasStorage(todasTarefas);

    tarefas = todasTarefas.filter(function (t) {
        return t.id_usuario === usuarioLogado.id;
    });

    renderizarTarefas(tarefas);
}


function excluirTarefa(id) {
    let todasTarefas = getTarefasStorage();

    todasTarefas = todasTarefas.filter(function (t) {
        return !(t.id === id && t.id_usuario === usuarioLogado.id);
    });

    salvarTarefasStorage(todasTarefas);

    tarefas = todasTarefas.filter(function (t) {
        return t.id_usuario === usuarioLogado.id;
    });

    renderizarTarefas(tarefas);
}