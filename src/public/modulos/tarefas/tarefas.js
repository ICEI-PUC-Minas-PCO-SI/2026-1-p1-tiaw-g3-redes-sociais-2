const STORAGE_KEY = "onlife_tarefas";

const tarefasIniciais = [
  { id: 1, titulo: "Estudar",      data: "2026-05-24", tempo: 60, concluida: false },
  { id: 2, titulo: "Cozinhar",     data: "2026-05-25", tempo: 90, concluida: true  },
  { id: 3, titulo: "Ler um livro", data: "2026-05-26", tempo: 30, concluida: false }
];

// Carrega do localStorage; se vazio, usa as tarefas iniciais
let tarefas = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? tarefasIniciais;

function salvarNoStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
}

// ─── Renderização ────────────────────────────────────────────────────────────

function renderizarTarefas(lista = tarefas) {
  const ul = document.getElementById("listaTarefas");
  ul.innerHTML = "";

  if (lista.length === 0) {
    ul.innerHTML = `
      <li class="list-group-item text-secondary text-center">
        Nenhuma tarefa encontrada.
      </li>`;
    return;
  }

  lista.forEach((tarefa) => {
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
            title="Marcar como concluída"
          >
          <button
            class="btn btn-sm btn-outline-danger"
            onclick="excluirTarefa(${tarefa.id})"
            title="Excluir tarefa"
          >&#10005;</button>
        </div>
      </li>`;
  });
}

// ─── Adicionar ───────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // impede o envio real do formulário

    const nome  = document.getElementById("taskName").value.trim();
    const tempo = parseInt(document.getElementById("taskTime").value, 10);

    if (!nome || isNaN(tempo) || tempo < 1) return;

    const novaTarefa = {
      id: Date.now(),          // ID único baseado no timestamp
      titulo: nome,
      data: new Date().toISOString().slice(0, 10), // data de hoje
      tempo: tempo,
      concluida: false
    };

    tarefas.push(novaTarefa);
    salvarNoStorage();
    renderizarTarefas();

    form.reset(); // limpa os campos
  });

  renderizarTarefas(); // renderiza as tarefas iniciais
});

// ─── Marcar / desmarcar ──────────────────────────────────────────────────────

function toggleConclusao(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return;
  tarefa.concluida = !tarefa.concluida;
  salvarNoStorage();
  renderizarTarefas();
}

// ─── Excluir ─────────────────────────────────────────────────────────────────

function excluirTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  salvarNoStorage();
  renderizarTarefas();
}