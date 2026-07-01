document.getElementById("formLogin").addEventListener("submit", (event) => {

            event.preventDefault();

            const login = document.getElementById("loginInput").value;
            const senha = document.getElementById("senhaInput").value;

            if (loginUser(login, senha)) {
                location.href = "../dashboard/dashboard.html";
            } else {
                alert("Login ou senha incorretos.");
            }

        });
