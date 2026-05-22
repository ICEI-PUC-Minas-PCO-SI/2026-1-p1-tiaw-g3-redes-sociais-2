
if (!localStorage.getItem("uso_redes")) {

    const dadosExemplo = {
        usuario_id: 452,
        data_referencia: "2026-05-22",

        uso_por_plataforma: [
            { rede: "Instagram", minutos: 90 },
            { rede: "TikTok", minutos: 50 },
            { rede: "YouTube", minutos: 20 }
        ]
    };

    localStorage.setItem(
        "uso_redes",
        JSON.stringify(dadosExemplo)
    );
}

const dadosSalvos = JSON.parse(
    localStorage.getItem("uso_redes")
);

let totalMinutos = 0;

dadosSalvos.uso_por_plataforma.forEach(plataforma => {

    totalMinutos += plataforma.minutos;

});

const horas = Math.floor(totalMinutos / 60);

const minutos = totalMinutos % 60;

document.getElementById("tempo-hoje").innerText =
    `${horas} h ${minutos} m`;


const totalDia = 24 * 60;

const porcentagem =
    (totalMinutos / totalDia) * 100;

document.getElementById("barra-progresso")
    .style.width = `${porcentagem}%`;


document.getElementById("barra-progresso")
    .setAttribute("aria-valuenow", porcentagem);