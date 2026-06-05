window.addEventListener("load", function () {

    inicializarDados();
    carregarTempoHoje();
    carregarInteresses();
    carregarConteudos();

});

//insere os dados no LocalStorage

function inicializarDados() {
    //uso de redes sociais
    if (!localStorage.getItem("uso_redes")) {

        const dadosExemplo = {
            usuario_id: 1,
            data_referencia: "2026-05-22",

            uso_por_plataforma: [
                { rede_id: 1, minutos: 90 },
                { rede_id: 2, minutos: 50 },
                { rede_id: 3, minutos: 20 }
            ]
        };

        localStorage.setItem(
            "uso_redes",
            JSON.stringify(dadosExemplo)
        );
    }

    //usuário
    if (!localStorage.getItem("usuario")) {

        const dadosExemploUsuario = {
            id: 1,
            foto_perfil: "/images/users/joao.jpg",
            nome: "João Silva",
            email: "joao@email.com",
            interesses_ids: [1, 2],
            redes_sociais_ids: [1, 2]
        };

        localStorage.setItem(
            "usuario",
            JSON.stringify(dadosExemploUsuario)
        );
    }

    //interesses
    if (!localStorage.getItem("interesses")) {

        const interessesExemplo = {
            interesses: [
                {
                    id: 1,
                    nome: "Estudos"
                },
                {
                    id: 2,
                    nome: "Saúde"
                }
            ]
        };

        localStorage.setItem(
            "interesses",
            JSON.stringify(interessesExemplo)
        );
    }

    //redes sociais
    if (!localStorage.getItem("redes_sociais")) {

        const redesExemplo = {
            redes_sociais: [
                {
                    id: 1,
                    nome: "Instagram"
                },
                {
                    id: 2,
                    nome: "TikTok"
                },
                {
                    id: 3,
                    nome: "YouTube"
                }
            ]
        };

        localStorage.setItem(
            "redes_sociais",
            JSON.stringify(redesExemplo)
        );
    }

    //conteúdos recomendados
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
                },
                {
                    id: 3,
                    interesses_id: 2,
                    titulo: "Mais Você",
                    descricao: "Perfil com dicas para a saúde",
                    link: "instagram.com/maisvoce"
                }
            ]
        };

        localStorage.setItem(
            "conteudos_recomendados",
            JSON.stringify(dadosExemploConteudos)
        );
    }
}



function carregarTempoHoje() {

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

    const porcentagem =
        (totalMinutos / (24 * 60)) * 100;

    document.getElementById("barra-progresso")
        .style.width = `${porcentagem}%`;


    document.getElementById("barra-progresso")
        .setAttribute("aria-valuenow", porcentagem);
}


function carregarInteresses() {
    const dadosSalvosInteresses = JSON.parse(
        localStorage.getItem("interesses")
    );

    const selectInteresse =
        document.getElementById("filtro-interesse");

    dadosSalvosInteresses.interesses.forEach(interesse => {
        selectInteresse.innerHTML += `
            <option value="${interesse.id}">
                ${interesse.nome}
            </option>
        `;

    });
}

//função para exibir os conteúdos 

function exibirConteudo(listaConteudos){
    let html = "";

    listaConteudos.forEach(conteudo => {
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
}

function carregarConteudos() {
    const dadosSalvosUsuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    const dadosSalvosConteudos = JSON.parse(
        localStorage.getItem("conteudos_recomendados")
    );

    const conteudosFiltrados =
        dadosSalvosConteudos.conteudos_recomendados.filter(
            conteudo =>
                dadosSalvosUsuario.interesses_ids.includes(
                    conteudo.interesses_id
                )
        );

    exibirConteudo(conteudosFiltrados);

    document.getElementById("filtro-interesse").addEventListener("change", function () {
        
        if(this.value === "todos"){
            exibirConteudo(conteudosFiltrados);
            return;
        }

        const resultado = conteudosFiltrados.filter(conteudo => conteudo.interesses_id == this.value);

        exibirConteudo(resultado);
    }
    );

    document.getElementById("btn-sugerir").addEventListener("click", function (){
        
        const todosConteudos = dadosSalvosConteudos.conteudos_recomendados;

        const indice = Math.floor(Math.random() * todosConteudos.length);

        document.getElementById("conteudo-aleatorio").innerHTML = `
            <div class="card mt-2">
                <div class="card-body">
                    <h6>${todosConteudos[indice].titulo}</h6>
                    <p>${todosConteudos[indice].descricao}</p>
                </div>
            </div>
        `;
        
    });

}

