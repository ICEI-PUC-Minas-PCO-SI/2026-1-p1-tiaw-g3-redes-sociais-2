fetch("../sidebar/sidebar.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("sidebar-container").innerHTML = data;

        const paginaAtual =
            window.location.pathname.split("/").pop();

        const links =
            document.querySelectorAll(".sidebar a");

        links.forEach(link => {

            if(link.getAttribute("href") === paginaAtual){
                link.classList.add("active");
            }

        });

    });