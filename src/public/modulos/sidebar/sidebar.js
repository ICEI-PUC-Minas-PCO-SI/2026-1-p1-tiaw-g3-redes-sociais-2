fetch("../sidebar/sidebar.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("sidebar-container").innerHTML = data;

        const paginaAtual = window.location.pathname;

        document.querySelectorAll(".sidebar .menu a").forEach(link => {

            const linkURL = new URL(link.href, window.location.origin);

            if (linkURL.pathname === paginaAtual) {
                link.classList.add("active");
            }

        });

    });
    