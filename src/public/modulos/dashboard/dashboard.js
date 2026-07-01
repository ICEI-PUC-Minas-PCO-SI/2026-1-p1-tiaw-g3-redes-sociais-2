function getUsuarioLogado(){

    return JSON.parse(
        sessionStorage.getItem("usuario")
    ) || null;

}

function calcularTempoHoje(){

    const usuario = getUsuarioLogado();

    if(!usuario){
        return 0;
    }

    const historico = getHistoricoCronometro();

    const hoje = new Date()
        .toISOString()
        .split("T")[0];

    const sessoesHoje = historico.filter(sessao => {

        return (
            sessao.id_usuario === usuario.id &&
            sessao.data === hoje
        );

    });



    const totalMinutos = sessoesHoje.reduce((total, sessao)=>{

        return total + sessao.tempo_gasto_minutos;

    },0);

    return totalMinutos;

}

function formatarTempo(minutos){

    const horas = Math.floor(minutos / 60);

    const minutosRestantes = minutos % 60;


    return `${horas} h ${minutosRestantes} m`;

}

function atualizarTempoHoje(){

    const elementoTempo = document.getElementById("tempo-hoje");

    const barra = document.getElementById("barra-progresso");

    if(!elementoTempo || !barra){
        return;
    }

    const minutosHoje = calcularTempoHoje();

    elementoTempo.innerText = formatarTempo(minutosHoje);

    // Limite usado para preencher a barra
    // 240 minutos = 4 horas
    const limiteDiario = 240;

    let porcentagem = 
        (minutosHoje / limiteDiario) * 100;


    if(porcentagem > 100){
        porcentagem = 100;
    }

    barra.style.width = `${porcentagem}%`;

    barra.setAttribute(
        "aria-valuenow",
        porcentagem
    );

}

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        atualizarTempoHoje();

    }
);

