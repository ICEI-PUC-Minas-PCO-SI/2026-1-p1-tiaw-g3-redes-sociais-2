if(!localStorage.getItem("interesses")){
    const interesses = [
    {
        id: 1,
        nome: "Estudos"
    },
    {
        id: 2,
        nome: "Saúde"
    },
    {
        id: 3,
        nome: "Esportes"
    },
    {
        id: 4,
        nome: "Tecnologia"
    }
];

    localStorage.setItem("interesses", JSON.stringify(interesses));
}

if(!localStorage.getItem("redes_sociais")){
    const redesSociais = [
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
        nome: "Facebook"
    },
    {
        id: 4,
        nome: "X"
    }
];

    localStorage.setItem("redes_sociais", JSON.stringify(redeSociais));
}

if(!localStorage.getItem("usuarios")){
    const usuarios = [
        {
            "id":1,
            "foto": "../images/users/joao.jpg",
            "nome": "João Silva",
            "login": "joaosilva",
            "email": "joao@gmail.com",
            "interesses_ids": [],
            "redes_sociais": [
                {
                    id:1,
                    meta_diaria_minutos:60
                },
                {
                    id:2,
                    meta_diaria_minutos:30
                }
            ]
        },
        {
            "id":2,
            "foto": "../images/users/maria.jpg",
            "nome": "Maria Fernanda",
            "login": "mafe",
            "email": "maria@email.com",
            "interesses_ids": [],
            "redes_sociais": [
                {
                    id:1,
                    meta_diaria_minutos:90
                },
                {
                    id:3,
                    meta_diaria_minutos:40
                }
            ]
        },
        {
            "id":3,
            "foto":"../images/users/carlos.jpg",
            "nome":"Carlos Henrique",
            "login":"carlos",
            "email":"carlos@email.com",
            "interesses_ids":[2,3],
            "redes_sociais":[
                {
                    id:2,
                    meta_diaria_minutos:45
                }
            ]
        },
        {
            "id":4,
            "foto":"../images/users/ana.jpg",
            "nome":"Ana Paula",
            "login":"anapaula",
            "email":"ana@email.com",
            "interesses_ids":[1,2,4],
            "redes_sociais":[
                {
                    id:1,
                    meta_diaria_minutos:30
                },
                {
                    id:4,
                    meta_diaria_minutos:20
                }
            ]
        }
    ];

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

if(!localStorage.getItem("tarefas")){
    const tarefas = [
        {
            "id": 1,
            "id_usuario": 1,
            "titulo": "Ler um livro",
            "descricao": "Ler 30 páginas",
            "tempo_estimado_minutos": 35,
            "data": "2026-07-01",
            "prioridade_id": 1,
            "concluida": false
        },
        {
            "id": 2,
            "id_usuario": 1,
            "titulo": "Fazer exercício fisíco",
            "descricao": "Cardio e musculação",
            "tempo_estimado_minutos": 60,
            "data": "2026-07-01",
            "prioridade_id": 1,
            "concluida": false
        },
        {
            "id":3,
            "id_usuario":2,
            "titulo":"Estudar JavaScript",
            "descricao":"Praticar LocalStorage",
            "tempo_estimado_minutos":90,
            "data":"2026-07-01",
            "prioridade_id":2,
            "concluida":false
        },
        {
            "id":4,
            "id_usuario":3,
            "titulo":"Meditação",
            "descricao":"Sessão de 15 minutos",
            "tempo_estimado_minutos":15,
            "data":"2026-07-02",
            "prioridade_id":1,
            "concluida":false
        },
        {
            "id":5,
            "id_usuario":4,
            "titulo":"Revisar Matemática",
            "descricao":"Resolver exercícios",
            "tempo_estimado_minutos":60,
            "data":"2026-07-03",
            "prioridade_id":3,
            "concluida":false
        }
    ];

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

if (!localStorage.getItem("estados_brasil")) {
    const estadosBrasil = [
        {
            id: 1,
            nome: "Acre",
            sigla: "AC"
        },
        {
            id: 2,
            nome: "Alagoas",
            sigla: "AL"
        },
        {
            id: 3,
            nome: "Amapá",
            sigla: "AP"
        },
        {
            id: 4,
            nome: "Amazonas",
            sigla: "AM"
        },
        {
            id: 5,
            nome: "Bahia",
            sigla: "BA"
        },
        {
            id: 6,
            nome: "Ceará",
            sigla: "CE"
        },
        {
            id: 7,
            nome: "Distrito Federal",
            sigla: "DF"
        },
        {
            id: 8,
            nome: "Espírito Santo",
            sigla: "ES"
        },
        {
            id: 9,
            nome: "Goiás",
            sigla: "GO"
        },
        {
            id: 10,
            nome: "Maranhão",
            sigla: "MA"
        },
        {
            id: 11,
            nome: "Mato Grosso",
            sigla: "MT"
        },
        {
            id: 12,
            nome: "Mato Grosso do Sul",
            sigla: "MS"
        },
        {
            id: 13,
            nome: "Minas Gerais",
            sigla: "MG"
        },
        {
            id: 14,
            nome: "Pará",
            sigla: "PA"
        },
        {
            id: 15,
            nome: "Paraíba",
            sigla: "PB"
        },
        {
            id: 16,
            nome: "Paraná",
            sigla: "PR"
        },
        {
            id: 17,
            nome: "Pernambuco",
            sigla: "PE"
        },
        {
            id: 18,
            nome: "Piauí",
            sigla: "PI"
        },
        {
            id: 19,
            nome: "Rio de Janeiro",
            sigla: "RJ"
        },
        {
            id: 20,
            nome: "Rio Grande do Norte",
            sigla: "RN"
        },
        {
            id: 21,
            nome: "Rio Grande do Sul",
            sigla: "RS"
        },
        {
            id: 22,
            nome: "Rondônia",
            sigla: "RO"
        },
        {
            id: 23,
            nome: "Roraima",
            sigla: "RR"
        },
        {
            id: 24,
            nome: "Santa Catarina",
            sigla: "SC"
        },
        {
            id: 25,
            nome: "São Paulo",
            sigla: "SP"
        },
        {
            id: 26,
            nome: "Sergipe",
            sigla: "SE"
        },
        {
            id: 27,
            nome: "Tocantins",
            sigla: "TO"
        }
    ];

    localStorage.setItem("estados_brasil", JSON.stringify(estadosBrasil));
}

if(!localStorage.getItem("lugares")){
    const lugares = [
        {
            "id": 1,
            "nome": "Parque central",
            "descricao": "Ambiente ideal para caminhadas e contato com a natureza.",
            "id_estado": 1
        },
        {
            "id": 2,
            "nome": "Museu",
            "descricao": "Ambiente ideal para conhecer e entender sobre a arte.",
            "id_estado": 2
        },
        {
            "id":3,
            "nome":"Biblioteca Pública",
            "descricao":"Local silencioso para estudos.",
            "id_estado":13
        },
        {
            "id":4,
            "nome":"Praça da Liberdade",
            "descricao":"Excelente para caminhadas e lazer.",
            "id_estado":13
        },
        {
            "id":5,
            "nome":"Parque Ibirapuera",
            "descricao":"Ideal para atividades ao ar livre.",
            "id_estado":25
        }

    ];

    localStorage.setItem("lugares", JSON.stringify(lugares));
}

if(!localStorage.getItem("conteudos_recomendados")){
    const conteudosRecomendados = [
        {
            "id": 1,
            "interesses_id": 1,
            "titulo": "@devmais",
            "descricao": "Conteúdos de programação",
            "link": "instagram.com/devmais"
        },
        {
            "id": 2,
            "interesses_id": 2,
            "titulo": "Saúde e bem estar",
            "descricao": "Site com conteúdos para a saúde do corpo",
            "link": "www.saudebemestar.com.br"
        },
        {
            "id":3,
            "interesses_id":4,
            "titulo":"Rocketseat",
            "descricao":"Cursos de programação",
            "link":"https://www.rocketseat.com.br"
        },
        {
            "id":4,
            "interesses_id":3,
            "titulo":"Canal Corrida Perfeita",
            "descricao":"Treinos para corrida",
            "link":"https://www.youtube.com/@corridaperfeita"
        },
        {
            "id":5,
            "interesses_id":1,
            "titulo":"Alura",
            "descricao":"Cursos online",
            "link":"https://www.alura.com.br"
        }
    ];

    localStorage.setItem("conteudos_recomendados", JSON.stringify(conteudosRecomendados));
}

if(!localStorage.getItem("prioridades")){
    const prioridades = [
        {
            "id": 1,
            "titulo": "Sem prioridade",
            "cor": "Verde"
        },
        {
            "id": 2,
            "titulo": "Importante",
            "cor": "Laranja"
        },
        {
            "id": 3,
            "titulo": "Urgente",
            "cor": "Vermelho"
        }
    ];

    localStorage.setItem("prioridades", JSON.stringify(prioridades));
}

if(!localStorage.getItem("historico_sessoes_cronometro")){
    const historico_sessoes_cronometro = [
        {
            "id": 1,
            "id_usuario": 1,
            "id_rede_social": 1,
            "tempo_gasto_minutos": 45,
            "data": "2026-05-23"
        },
        {
            "id": 2,
            "id_usuario": 1,
            "id_rede_social": 2,
            "tempo_gasto_minutos": 15,
            "data": "2026-05-23"
        },
        {
            "id":3,
            "id_usuario":2,
            "id_rede_social":1,
            "tempo_gasto_minutos":70,
            "data":"2026-05-24"
        },
        {
            "id":4,
            "id_usuario":3,
            "id_rede_social":2,
            "tempo_gasto_minutos":20,
            "data":"2026-05-24"
        },
        {
            "id":5,
            "id_usuario":4,
            "id_rede_social":4,
            "tempo_gasto_minutos":35,
            "data":"2026-05-25"
        }
  ];

  localStorage.setItem("historico_sessoes_cronometro", JSON.stringify(historico_sessoes_cronometro));
}

if(!localStorage.getItem("progresso_diario")){
    const progressoDiario = [
        {
            id:1,
            id_usuario:1,
            data:"2026-07-01",
            tarefas_concluidas:3,
            minutos_redes:52,
            meta_atingida:true
        },
        {
            id:2,
            id_usuario:2,
            data:"2026-07-01",
            tarefas_concluidas:1,
            minutos_redes:95,
            meta_atingida:false
        }
    ];

    localStorage.setItem("progresso_diario", JSON.stringify(progressoDiario));
}



