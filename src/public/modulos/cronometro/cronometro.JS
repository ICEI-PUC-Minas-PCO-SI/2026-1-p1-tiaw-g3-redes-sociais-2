let timer;
let seconds = 0;
let isRunning = false;


function getUsuarioLogado() {
    return JSON.parse(sessionStorage.getItem("usuario")) || null;
}

const timerDisplay = document.getElementById('timer-display');
const btnStart = document.getElementById('btn-start');
const btnReset = document.getElementById('btn-reset');
const socialSelect = document.getElementById('social-select');
const historyList = document.getElementById('history-list');

const metaSocialSelect = document.getElementById('meta-social-select');
const metaInput = document.getElementById('meta-input');
const btnSalvarMeta = document.getElementById('btn-salvar-meta');

const tempoTotalGeral = document.getElementById('tempo-total-geral');
const dashboardGraficos = document.getElementById('dashboard-graficos');


window.addEventListener('DOMContentLoaded', () => {
    updateHistoryDOM();
    renderizarDashboard();
});


btnStart.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        btnStart.textContent = 'Pausar';
        btnStart.classList.remove('btn-success');
        btnStart.classList.add('btn-warning');

        timer = setInterval(() => {
            seconds++;
            timerDisplay.textContent = formatTime(seconds);
        }, 1000);

    } else {
        isRunning = false;
        btnStart.textContent = 'Iniciar';
        btnStart.classList.remove('btn-warning');
        btnStart.classList.add('btn-success');

        clearInterval(timer);

        saveSession(socialSelect.value, formatTime(seconds));
    }
});

btnReset.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;

    timerDisplay.textContent = '00:00';

    btnStart.textContent = 'Iniciar';
    btnStart.classList.remove('btn-warning');
    btnStart.classList.add('btn-success');
});


function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function saveSession(rede, tempo) {
    if (seconds === 0) return;

    const usuario = getUsuarioLogado();
    if (!usuario) return;

    let sessoes = JSON.parse(localStorage.getItem('historico_sessoes')) || [];

    const agora = new Date();
    const hoje = agora.toISOString().split("T")[0];

    const partes = tempo.split(':');
    const minutos = parseInt(partes[0]) + (parseInt(partes[1]) / 60);

    sessoes.unshift({
        id_usuario: usuario.id,
        rede: rede,
        tempo: tempo,
        tempo_gasto_minutos: minutos,
        data: hoje
    });

    localStorage.setItem('historico_sessoes', JSON.stringify(sessoes));

    updateHistoryDOM();
    renderizarDashboard();
}


function updateHistoryDOM() {
    const usuario = getUsuarioLogado();
    if (!usuario || !historyList) return;

    let sessoes = JSON.parse(localStorage.getItem('historico_sessoes')) || [];

    sessoes = sessoes.filter(sessao => {
        return sessao.id_usuario === usuario.id;
    });

    historyList.innerHTML = '';

    if (sessoes.length === 0) {
        historyList.innerHTML = `
            <li class="list-group-item text-muted text-center py-3">
                Nenhuma sessão gravada ainda.
            </li>`;
        return;
    }

    sessoes.forEach(sessao => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center py-2';

        li.innerHTML = `
            <span class="fw-bold">${sessao.rede}</span>
            <span class="badge bg-secondary rounded-pill">${sessao.tempo}</span>
        `;

        historyList.appendChild(li);
    });
}


function renderizarDashboard() {
    const usuario = getUsuarioLogado();
    if (!usuario || !dashboardGraficos) return;

    let sessoes = JSON.parse(localStorage.getItem('historico_sessoes')) || [];

    sessoes = sessoes.filter(sessao => {
        return sessao.id_usuario === usuario.id;
    });

    let tempoPorRede = {
        "Instagram": 0,
        "Facebook": 0,
        "WhatsApp": 0,
        "TikTok": 0
    };

    let minutosTotaisGerais = 0;

    sessoes.forEach(sessao => {
        if (tempoPorRede[sessao.rede] !== undefined) {

            const minutosDaSessao = sessao.tempo_gasto_minutos || 0;

            tempoPorRede[sessao.rede] += minutosDaSessao;
            minutosTotaisGerais += minutosDaSessao;
        }
    });


    if (tempoTotalGeral) {
        const horas = Math.floor(minutosTotaisGerais / 60).toString().padStart(2, '0');
        const mins = Math.floor(minutosTotaisGerais % 60).toString().padStart(2, '0');
        tempoTotalGeral.textContent = `${horas}h ${mins}min`;
    }

    dashboardGraficos.innerHTML = '';

    for (let rede in tempoPorRede) {

        const tempoGasto = Math.round(tempoPorRede[rede]);
        const metaDefinida = parseInt(localStorage.getItem(`meta_${rede}`)) || 0;

        if (tempoGasto > 0 || metaDefinida > 0) {

            let percentual = 0;
            let barraCorClass = 'bg-success';
            let statusTexto = 'Status: Dentro do Limite';

            if (metaDefinida > 0) {
                percentual = (tempoGasto / metaDefinida) * 100;

                if (tempoGasto > metaDefinida) {
                    barraCorClass = 'bg-danger';
                    statusTexto = 'Status: Limite Diário Excedido!';
                }
            } else {
                percentual = 100;
                barraCorClass = 'bg-secondary';
                statusTexto = 'Status: Sem limite diário definido.';
            }

            const percentualBarra = Math.min(percentual, 100);

            dashboardGraficos.innerHTML += `
                <div class="mb-4">

                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="fw-bold">${rede}</span>
                        <span class="text-muted small fw-semibold">
                            ${tempoGasto}m / ${metaDefinida > 0 ? metaDefinida + 'm' : 'Sem limite'}
                        </span>
                    </div>

                    <div class="progress mb-1" style="height: 16px;">
                        <div class="progress-bar ${barraCorClass}"
                             style="width: ${percentualBarra}%"></div>
                    </div>

                    <div class="small fw-semibold text-muted">
                        ${statusTexto}
                    </div>

                </div>
            `;
        }
    }

    if (dashboardGraficos.innerHTML === '') {
        dashboardGraficos.innerHTML = `
            <p class="text-muted text-center py-3 mb-0">
                Inicie o cronômetro para visualizar métricas.
            </p>`;
    }
}