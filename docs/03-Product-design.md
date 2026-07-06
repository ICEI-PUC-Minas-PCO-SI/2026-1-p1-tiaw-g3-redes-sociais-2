# Product design

<span style="color:red">Pré-requisitos: <a href="02-Product-discovery.md"> Product discovery</a></span>


## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário (Mariana) | visualizar quanto tempo passo nas redes sociais | ter consciência do meu uso               |
|Usuário (Lucas) | definir um limite diário de uso | reduzir o tempo gasto nas redes sociais |
|Usuário (Juliana)  | receber alertas quando uso redes sociais por muito tempo    | evitar uso excessivo     |
|Usuário (Mariana)      | visualizar relatórios semanais do meu uso  | analisar meus hábitos |
|Usuário (Lucas)  | reduzir meu tempo de tela       | me dedicar a atividades com maior importância  |
|Usuário (Juliana)     | receber sugestões de pausas      | evitar uso contínuo prolongado |
|Usuário (Mariana)  | desativar notificações de redes sociais em horários específicos      | substituí-los por outras atividades e hobbies mais produtivos             |
|Usuário (Lucas)     | definir metas de redução de uso    | melhorar minha produtividade    |
|Usuário (Juliana)  | desativar notificações de redes sociais em horários específicos| evitar distrações         |
|Usuário (Mariana)    | ativar um "modo foco"  | minimizar distrações enquanto realizo tarefas (estudo/tarefas/trabalho) |
|Usuário (Lucas) | registrar minhas tarefas realizadas    |  avaliar e analisar meu progresso   |
|Administrador       | visualizar dados agregados de uso | entender o comportamento geral dos usuários do sistema |




## Proposta de valor

**✳️✳️✳️ APRESENTE O DIAGRAMA DA PROPOSTA DE VALOR PARA CADA PERSONA ✳️✳️✳️**

##### Proposta para a persona Mariana

![Proposta de valor - Mariana](images/propostadevalorMariana.png)

##### Proposta para a persona Lucas Oliveira

![Proposta de valor - Lucas Oliveira](images/propotadevalorLucas.png)

##### Proposta para a persona Juliana

![Proposta de valor - Juliana](images/propostadevalorJuliana.png)



## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

| ID     | Descrição do Requisito                                                              | Prioridade |
| ------ | ----------------------------------------------------------------------------------- | ---------- |
| RF-001 | Permitir o cadastro e autenticação de usuários.                                     | ALTA       |
| RF-002 | Permitir que o usuário edite suas informações de perfil.                            | ALTA       |
| RF-004 | Exibir conteúdos personalizados de acordo com os interesses do usuário.             | ALTA       |
| RF-005 | Permitir que o usuário pesquise conteúdos por título ou categoria.                  | ALTA       |
| RF-006 | Permitir que o usuário visualize conteúdos completos (artigos, vídeos e materiais). | ALTA       |
| RF-007 | Permitir que o usuário acompanhe seu progresso de utilização da plataforma.         | MÉDIA      |
| RF-008 | Permitir o cadastro, edição e exclusão de tarefas.                                  | ALTA       |
| RF-009 | Permitir que o usuário marque tarefas como concluídas.                              | ALTA       |
| RF-010 | Exibir recomendações de conteúdos relacionadas ao perfil do usuário.                | MÉDIA      |
| RF-011 | Permitir que o usuário visualize o tempo diário de uso das redes sociais.           | ALTA       |
| RF-012 | Permitir que o usuário defina um limite diário de uso das redes sociais.            | ALTA       |


### Requisitos não funcionais

| ID      | Descrição do Requisito                                                                                                              | Prioridade |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | O tempo de resposta das principais operações deve ser inferior a 3 segundos em condições normais de uso.                            | ALTA       |
| RNF-002 | A interface deve seguir princípios de usabilidade, facilitando a navegação dos usuários.                                            | MÉDIA      |
| RNF-003 | O sistema deve estar disponível 99% do tempo, exceto durante manutenções programadas.                                               | MÉDIA      |
| RNF-004 | O código deve ser organizado de forma modular para facilitar manutenção e evolução do sistema.                                      | MÉDIA      |
| RNF-005 | O sistema deve ser compatível com as versões mais recentes dos principais navegadores (Chrome, Edge e Firefox).                     | MÉDIA      |
| RNF-006 | O sistema deve atender aos princípios da Lei Geral de Proteção de Dados (LGPD) no tratamento das informações pessoais dos usuários. | ALTA       |



## Restrições

O projeto está restrito aos itens apresentados na tabela a seguir.

| ID | Restrição |
|----|-----------|
| R-001 | O projeto deverá ser desenvolvido e entregue dentro do cronograma definido para a disciplina. |
| R-002 | A solução deverá ser desenvolvida utilizando apenas tecnologias estudadas durante o curso. |
| R-003 | O projeto terá como público-alvo usuários individuais, não contemplando funcionalidades corporativas ou multiempresa. |
