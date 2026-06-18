
let timer;
let seconds = 0;
let isRunning = false;


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


if (btnSalvarMeta) {
    btnSalvarMeta.addEventListener('click', () => {
        const rede = metaSocialSelect.value;
        const minutos = parseInt(metaInput.value);

        if (isNaN(minutos) || minutos <= 0) {
            alert('Por favor, insira um valor de minutos válido.');
            return;
        }

        
        localStorage.setItem(`meta_${rede}`, minutos);
        metaInput.value = ''; 
        
        
        renderizarDashboard();
    });
}


function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}


function saveSession(rede, tempo) {
    if (seconds === 0) return; 

    let sessoes = JSON.parse(localStorage.getItem('historico_sessoes')) || [];
    sessoes.unshift({ rede: rede, tempo: tempo }); 
    
    localStorage.setItem('historico_sessoes', JSON.stringify(sessoes));
    
    
    updateHistoryDOM();
    renderizarDashboard();
}


function updateHistoryDOM() {
    let sessoes = JSON.parse(localStorage.getItem('historico_sessoes')) || [];
    if (!historyList) return;
    
    historyList.innerHTML = '';
    
    if (sessoes.length === 0) {
        historyList.innerHTML = '<li class="list-group-item text-muted text-center py-3">Nenhuma sessão gravada ainda.</li>';
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
    if (!dashboardGraficos) return;

    
    let sessoes = JSON.parse(localStorage.getItem('historico_sessoes')) || [];
    

    let tempoPorRede = { "Instagram": 0, "Facebook": 0, "WhatsApp": 0, "TikTok": 0 };
    let minutosTotaisGerais = 0;

    
    sessoes.forEach(sessao => {
        if (tempoPorRede[sessao.rede] !== undefined) {
            const partes = sessao.tempo.split(':');
            const minutosDaSessao = parseInt(partes[0]) + (parseInt(partes[1]) / 60);
            
            tempoPorRede[sessao.rede] += minutosDaSessao;
            minutosTotaisGerais += minutosDaSessao;
        }
    });

    
    if (tempoTotalGeral) {
        const horasGerais = Math.floor(minutosTotaisGerais / 60).toString().padStart(2, '0');
        const minsGerais = Math.floor(minutosTotaisGerais % 60).toString().padStart(2, '0');
        tempoTotalGeral.textContent = `${horasGerais}h ${minsGerais}min`;
    }

    
    dashboardGraficos.innerHTML = '';

    
    for (let rede in tempoPorRede) {
        const tempoGasto = Math.round(tempoPorRede[rede]); 
        const metaDefinida = parseInt(localStorage.getItem(`meta_${rede}`)) || 0; 
        
        
        if (tempoGasto > 0 || metaDefinida > 0) {
            let percentual = 0;
            let barraCorClass = 'bg-success'; 
            let statusTexto = 'Status: Dentro do Limite ';

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

            const graficoHTML = `
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="fw-bold">${rede}</span>
                        <span class="text-muted small fw-semibold">${tempoGasto} / ${metaDefinida > 0 ? metaDefinida + 'm' : '⏱️ Sem Limite'}</span>
                    </div>
                    <div class="progress mb-1" style="height: 16px; border-radius: 4px;">
                        <div class="progress-bar ${barraCorClass} progress-bar-striped progress-bar-animated" 
                             role="progressbar" 
                             style="width: ${percentualBarra}%" 
                             aria-valuenow="${percentualBarra}" 
                             aria-valuemin="0" 
                             aria-valuemax="100"></div>
                    </div>
                    <div class="small fw-semibold text-${barraCorClass === 'bg-danger' ? 'danger' : (barraCorClass === 'bg-success' ? 'success' : 'muted')}">
                        ${statusTexto}
                    </div>
                </div>
            `;
            dashboardGraficos.innerHTML += graficoHTML;
        }
    }

    
    if (dashboardGraficos.innerHTML === '') {
        dashboardGraficos.innerHTML = '<p class="text-muted text-center py-3 mb-0">Estipule uma meta ou inicie o cronômetro para visualizar o painel de métricas.</p>';
    }
}