const tarefas = [
  {
    id: 1,
    titulo: "Estudar",
    data: "2026-05-24",
    tempo: 60,
    concluida: false
  },
  {
    id: 2,
    titulo: "Cozinhar",
    data: "2026-05-25",
    tempo: 90,
    concluida: true
  },
  {
    id: 3,
    titulo: "Ler um livro",
    data: "2026-05-26",
    tempo: 30,
    concluida: false
  }
];

function renderizarTarefas(lista = tarefas) {

  const ul =
    document.getElementById("listaTarefas");

  ul.innerHTML = "";

  lista.forEach((tarefa) => {

    ul.innerHTML += `

      <li class="list-group-item d-flex justify-content-between align-items-center">

        <div class="${tarefa.concluida ? 'text-decoration-line-through text-secondary' : ''}">

          <strong>${tarefa.titulo}</strong>

          <br>

          <small>
            ${tarefa.tempo} minutos
          </small>

        </div>

        <input
          type="checkbox"
          class="form-check-input"
          ${tarefa.concluida ? "checked" : ""}
          onchange="toggleConclusao(${tarefa.id})"
        >

      </li>

    `;
  });
}

function toggleConclusao(id) {

  const tarefa =
    tarefas.find(t => t.id === id);

  tarefa.concluida =
    !tarefa.concluida;

  renderizarTarefas();
}

function filtrarPorData() {

  const dataFiltro =
    document.getElementById("filtroData").value;

  if (!dataFiltro) {

    renderizarTarefas();
    return;
  }

  const filtradas =
    tarefas.filter(
      tarefa => tarefa.data === dataFiltro
    );

  renderizarTarefas(filtradas);
}

renderizarTarefas();