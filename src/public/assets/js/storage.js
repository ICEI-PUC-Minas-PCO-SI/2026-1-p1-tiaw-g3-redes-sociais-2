function getInteresses() {
    return JSON.parse(localStorage.getItem("interesses")) || [];
}

function salvarInteresses(interesses) {
    localStorage.setItem("interesses", JSON.stringify(interesses));
}

function getRedesSociais() {
    return JSON.parse(localStorage.getItem("redes_sociais")) || [];
}

function salvarRedesSociais(redesSociais) {
    localStorage.setItem("redes_sociais", JSON.stringify(redesSociais));
}

function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function salvarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function getTarefas() {
    return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function salvarTarefas(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function getEstadosBrasil() {
    return JSON.parse(localStorage.getItem("estados_brasil")) || [];
}

function salvarEstadosBrasil(estados) {
    localStorage.setItem("estados_brasil", JSON.stringify(estados));
}

function getLugares() {
    return JSON.parse(localStorage.getItem("lugares")) || [];
}

function salvarLugares(lugares) {
    localStorage.setItem("lugares", JSON.stringify(lugares));
}

function getConteudosRecomendados() {
    return JSON.parse(localStorage.getItem("conteudos_recomendados")) || [];
}

function salvarConteudosRecomendados(conteudos) {
    localStorage.setItem("conteudos_recomendados", JSON.stringify(conteudos));
}

function getPrioridades() {
    return JSON.parse(localStorage.getItem("prioridades")) || [];
}

function salvarPrioridades(prioridades) {
    localStorage.setItem("prioridades", JSON.stringify(prioridades));
}

function getHistoricoCronometro() {
    return JSON.parse(localStorage.getItem("historico_sessoes_cronometro")) || [];
}

function salvarHistoricoCronometro(historico) {
    localStorage.setItem("historico_sessoes_cronometro", JSON.stringify(historico));
}