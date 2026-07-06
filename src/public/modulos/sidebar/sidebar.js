fetch("../sidebar/sidebar.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("sidebar-container").innerHTML = data;

        // Recupera o usuário do sessionStorage
        const usuario = JSON.parse(sessionStorage.getItem("usuario"));

        if (usuario) {
            document.getElementById("userName").textContent = usuario.nome;
        }

        const paginaAtual = window.location.pathname;

        document.querySelectorAll(".sidebar .menu a").forEach(link => {

            const linkURL = new URL(link.href, window.location.origin);

            if (linkURL.pathname === paginaAtual) {
                link.classList.add("active");
            }

        });

        document.getElementById("btnLogout").addEventListener("click", function (event) {
            event.preventDefault();
            logoutUser();
        });

        document.body.style.visibility = "visible";

    });