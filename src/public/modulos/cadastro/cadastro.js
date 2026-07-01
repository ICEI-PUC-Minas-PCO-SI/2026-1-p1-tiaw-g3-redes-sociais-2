document.getElementById("formCadastro").addEventListener("submit", (event) => {

            event.preventDefault();

            const login = document.getElementById("loginInput").value;
            const nome = document.getElementById("nomeInput").value;
            const email = document.getElementById("emailInput").value;
            const senha = document.getElementById("senhaInput").value;

            cadastroUser(login, nome, email, senha);

        });