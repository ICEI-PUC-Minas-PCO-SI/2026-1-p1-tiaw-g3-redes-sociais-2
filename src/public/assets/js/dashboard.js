
if (!localStorage.getItem("uso_redes")) {

    const dadosExemplo = {
        usuario_id: 1,
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

//Card conteúdos recomendados
if (!localStorage.getItem("conteudos_recomendados")) {

    const dadosExemploConteudos = {
        conteudos_recomendados: [
            {
                id: 1,
                interesses_id: 1,
                titulo: "@devmais",
                descricao: "Conteúdos de programação",
                link: "instagram.com/devmais"
            },
            {
                id: 2,
                interesses_id: 2,
                titulo: "Saúde e bem estar",
                descricao: "Site com conteúdos para a saúde do corpo",
                link: "www.saudebemestar.com.br"
            }
        ]
    };

    localStorage.setItem(
        "conteudos_recomendados",
        JSON.stringify(dadosExemploConteudos)
    );
}

const dadosSalvosConteudos = JSON.parse(
    localStorage.getItem("conteudos_recomendados")
);

/////


if (!localStorage.getItem("usuario")) {

    const dadosExemploUsuario = {
        usuario: [
            {
            id: 1,
            foto_perfil: "/images/users/joao.jpg",
            nome: "João Silva",
            email: "joao@email.com",
            interesses_ids: [
                1,
                2
            ],
            redes_sociais_ids: [
                1,
                2
            ]
            }
        ]
    };

    localStorage.setItem(
        "usuario",
        JSON.stringify(dadosExemploUsuario)
    );
}

const dadosSalvosUsuario = JSON.parse(
    localStorage.getItem("usuario")
);

const conteudosFiltrados =
    dadosSalvosConteudos.conteudos_recomendados.filter(
        conteudo =>
            dadosSalvosUsuario.usuario[0].interesses_ids.includes(
                conteudo.interesses_id
            )
    );

    let html = "";

conteudosFiltrados.forEach(conteudo => {

    html += `
        <div class="card mb-2">
            <div class="card-body">
                <h6>${conteudo.titulo}</h6>
                <p>${conteudo.descricao}</p>
            </div>
        </div>
    `;
});

document.getElementById("conteudos-recomendados").innerHTML = html;