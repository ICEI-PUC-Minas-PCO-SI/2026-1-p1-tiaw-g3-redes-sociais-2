let usuarioPerfil = null;

function getUsuarioSessao() {
    return JSON.parse(sessionStorage.getItem("usuario")) || null;
}

function carregarUsuario() {
    usuarioPerfil = getUsuarioSessao();

    if (!usuarioPerfil) {
        location.href = "../login/login.html";
        return;
    }
}

function getTarefas() {
    return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function salvarTarefas(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


function renderizarTarefas() {
    const tarefas = getTarefas();

    const tarefasDoUsuario = tarefas.filter(function(tarefa) {
        return tarefa.id_usuario === usuarioPerfil.id;
    });

    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    if (tarefasDoUsuario.length === 0) {
        lista.innerHTML = `<li class="list-group-item text-muted">Nenhuma tarefa encontrada</li>`;
        return;
    }

    tarefasDoUsuario.forEach(function(tarefa) {
        lista.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${tarefa.titulo}</strong><br>
                    <small>${tarefa.descricao || "Sem descrição"}</small>
                </div>

                <div class="text-end">
                    <span class="badge bg-primary">
                        ${tarefa.tempo_estimado_minutos} min
                    </span>
                </div>
            </li>
        `;
    });
}

function adicionarTarefa() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const tarefas = getTarefas();

        const novaTarefa = {
            id: Date.now(),
            id_usuario: usuarioPerfil.id,
            titulo: document.getElementById("taskName").value.trim(),
            descricao: "",
            tempo_estimado_minutos: Number(
                document.getElementById("taskTime").value
            ),
            data: new Date().toISOString().split("T")[0],
            prioridade_id: 1,
            concluida: false
        };

        tarefas.push(novaTarefa);
        salvarTarefas(tarefas);

        form.reset();
        renderizarTarefas();
    });
}


function init() {
    carregarUsuario();
    renderizarTarefas();
    adicionarTarefa();
}

init();