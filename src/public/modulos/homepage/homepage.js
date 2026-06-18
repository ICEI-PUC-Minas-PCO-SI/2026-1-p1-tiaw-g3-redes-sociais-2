let noticias = JSON.parse(localStorage.getItem("noticias")) || [
    {
        titulo: "Uso excessivo de redes sociais aumenta ansiedade",
        categoria: "Saúde Mental",
        favorito: false,
        autor: "Camila Andrade",
        fonte: "Redação OnLife",
        data: "12 de junho de 2026",
        hora: "09:42",
        tempoLeitura: "3 min",
        texto: "Pesquisas recentes em psicologia clínica vêm associando o uso prolongado de redes sociais a níveis mais altos de ansiedade, especialmente entre adolescentes e jovens adultos.\n\nUm dos principais fatores apontados é a comparação social constante: ao rolar o feed, é comum se comparar com versões editadas e idealizadas da vida de outras pessoas, o que pode gerar sentimentos de inadequação.\n\nEspecialistas recomendam estabelecer limites diários de uso, desativar notificações não essenciais e reservar momentos do dia totalmente livres de telas. Pequenas pausas ao longo do dia já demonstraram reduzir significativamente os níveis de estresse percebido.\n\nO OnLife pode te ajudar nesse processo, mostrando exatamente quanto tempo você gasta em cada rede e sugerindo atividades alternativas no momento certo."
    },
    {
        titulo: "Como reduzir o tempo no celular",
        categoria: "Produtividade",
        favorito: false,
        autor: "Rafael Souza",
        fonte: "Redação OnLife",
        data: "8 de junho de 2026",
        hora: "14:15",
        tempoLeitura: "3 min",
        texto: "Reduzir o tempo de tela não significa abandonar o celular, mas sim recuperar o controle sobre quando e por que ele é usado.\n\nUma estratégia simples e eficaz é a regra das 'três perguntas': antes de abrir um aplicativo, pergunte-se por que está abrindo, o que espera encontrar e quanto tempo pretende gastar. Esse pequeno hábito de consciência já reduz o uso automático e impulsivo.\n\nOutras táticas úteis incluem remover aplicativos da tela inicial, usar modo escala de cinza para tornar o celular menos atrativo visualmente, e definir horários fixos para checar mensagens e redes sociais em vez de checar a cada notificação.\n\nCom o tempo, essas pequenas mudanças se tornam hábitos, e o celular volta a ser uma ferramenta, não uma distração constante."
    },
    {
        titulo: "Vício digital cresce entre jovens",
        categoria: "Vício Digital",
        favorito: false,
        autor: "Beatriz Lima",
        fonte: "Redação OnLife",
        data: "3 de junho de 2026",
        hora: "11:30",
        tempoLeitura: "4 min",
        texto: "O vício em dispositivos digitais tem se tornado uma preocupação crescente entre profissionais de saúde, especialmente quando o assunto envolve crianças e adolescentes.\n\nDiferente do consumo recreativo comum, o vício digital se caracteriza pela incapacidade de controlar o tempo de uso mesmo quando há consequências negativas claras, como queda no rendimento escolar, isolamento social e alterações no sono.\n\nUm dos sinais de alerta é a chamada 'abstinência digital': irritação, ansiedade ou desconforto intenso quando o acesso ao celular ou às redes é interrompido.\n\nEspecialistas reforçam que o diálogo aberto em casa, aliado a ferramentas de acompanhamento de uso como o OnLife, pode ajudar famílias a identificar padrões preocupantes antes que se tornem um problema maior."
    },
    {
        titulo: "Dicas para melhorar o foco",
        categoria: "Produtividade",
        favorito: false,
        autor: "Rafael Souza",
        fonte: "Redação OnLife",
        data: "29 de maio de 2026",
        hora: "16:50",
        tempoLeitura: "3 min",
        texto: "Manter o foco em um mundo cheio de notificações é um desafio real, mas algumas técnicas simples podem fazer grande diferença no dia a dia.\n\nA técnica Pomodoro, por exemplo, propõe blocos de 25 minutos de foco total seguidos de pequenas pausas, ajudando o cérebro a manter a atenção sem se esgotar.\n\nOutro ponto importante é o ambiente: notificações visuais e sonoras são gatilhos constantes de distração. Silenciar o celular ou deixá-lo fora do campo de visão durante tarefas importantes aumenta consideravelmente a produtividade.\n\nPor fim, dormir bem e fazer pausas reais (sem tela) ao longo do dia são fatores subestimados, mas essenciais, para manter a mente afiada e o foco sustentável a longo prazo."
    }
];

let indiceAtual = null;

function salvar() {
    localStorage.setItem("noticias", JSON.stringify(noticias));
}

function renderizar() {
    let busca = document.getElementById("busca").value.toLowerCase();
    let filtro = document.getElementById("filtro").value;
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    let filtradas = noticias
        .map((n, indiceOriginal) => ({ ...n, indiceOriginal }))
        .filter(n =>
            n.titulo.toLowerCase().includes(busca) &&
            (filtro === "" || n.categoria === filtro)
        );

    if (filtradas.length === 0) {
        lista.innerHTML = "<p>Nenhum conteúdo encontrado.</p>";
        return;
    }

    filtradas.forEach((n) => {
        lista.innerHTML += `
            <div class="col-md-6">
                <div class="card card-noticia p-3 d-flex justify-content-between" onclick="abrirNoticia(${n.indiceOriginal})">
                    <div>
                        <h6>${n.titulo}</h6>
                        <span class="badge bg-secondary">${n.categoria}</span>
                    </div>
                    <button class="btn btn-sm btn-outline-warning mt-2" onclick="event.stopPropagation(); favoritar(${n.indiceOriginal})">
                        ${n.favorito ? "★" : "☆"}
                    </button>
                </div>
            </div>
        `;
    });
}

function favoritar(index) {
    noticias[index].favorito = !noticias[index].favorito;
    salvar();
    renderizar();

    if (indiceAtual === index) {
        atualizarBotaoModal();
    }
}

function abrirNoticia(index) {
    indiceAtual = index;
    const n = noticias[index];

    document.getElementById("modalTitulo").textContent = n.titulo;
    document.getElementById("modalCategoria").textContent = n.categoria;
    document.getElementById("modalAutor").textContent = n.autor || "Redação OnLife";
    document.getElementById("modalFonte").textContent = n.fonte || "OnLife";
    document.getElementById("modalData").textContent = n.data || "Data não informada";
    document.getElementById("modalHora").textContent = n.hora || "--:--";
    document.getElementById("modalTempoLeitura").textContent = n.tempoLeitura || "3 min";
    document.getElementById("modalTexto").textContent = n.texto || "Conteúdo não disponível para esta notícia.";
    atualizarBotaoModal();

    const modal = new bootstrap.Modal(document.getElementById("modalNoticia"));
    modal.show();
}

function atualizarBotaoModal() {
    const btn = document.getElementById("modalFavoritoBtn");
    btn.textContent = noticias[indiceAtual].favorito ? "★" : "☆";
}

function favoritarModal() {
    if (indiceAtual !== null) {
        favoritar(indiceAtual);
    }
}

document.getElementById("busca").addEventListener("input", renderizar);
document.getElementById("filtro").addEventListener("change", renderizar);

renderizar();