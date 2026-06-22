// ===== SCORE.JS — Sistema central de pontuação OnLife =====

const PONTOS_TAREFA = 10; // pontos ganhos por tarefa concluída

// ─── Pega o nome do usuário logado ───────────────────────────────────────────

function getNomeUsuario() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  return usuario?.nome ?? null;
}

// ─── Lê os pontos atuais do usuário no placar ────────────────────────────────

function getPontosUsuario() {
  const nome = getNomeUsuario();
  if (!nome) return 0;

  const placar = JSON.parse(localStorage.getItem('placar'));
  if (!placar) return 0;

  const usuario = placar.usuarios.find(u => u.nome === nome);
  return usuario?.pontos.total ?? 0;
}

// ─── Atualiza os pontos do usuário no placar ─────────────────────────────────

function setPontosUsuario(novoTotal) {
  const nome = getNomeUsuario();
  if (!nome) return;

  const placar = JSON.parse(localStorage.getItem('placar'));
  if (!placar) return;

  const usuario = placar.usuarios.find(u => u.nome === nome);
  if (!usuario) return;

  usuario.pontos.tarefas = novoTotal;
  usuario.pontos.total   = usuario.pontos.tarefas + (usuario.pontos.tempo ?? 0);

  localStorage.setItem('placar', JSON.stringify(placar));
}

// ─── Adiciona ou remove pontos ───────────────────────────────────────────────

function adicionarPontos(quantidade) {
  const atual = getPontosUsuario();
  const novo  = Math.max(0, atual + quantidade); // nunca fica negativo
  setPontosUsuario(novo);
  return novo;
}

// ─── Recalcula pontos do zero com base nas tarefas concluídas ────────────────
// Chamada ao carregar a página de tarefas para garantir consistência

function sincronizarPontosTarefas() {
  const tarefas = JSON.parse(localStorage.getItem('onlife_tarefas')) ?? [];
  const concluidas = tarefas.filter(t => t.concluida).length;
  const total = concluidas * PONTOS_TAREFA;

  const nome = getNomeUsuario();
  if (!nome) return;

  const placar = JSON.parse(localStorage.getItem('placar'));
  if (!placar) return;

  const usuario = placar.usuarios.find(u => u.nome === nome);
  if (!usuario) return;

  usuario.pontos.tarefas = total;
  usuario.pontos.total   = usuario.pontos.tarefas + (usuario.pontos.tempo ?? 0);

  localStorage.setItem('placar', JSON.stringify(placar));
}