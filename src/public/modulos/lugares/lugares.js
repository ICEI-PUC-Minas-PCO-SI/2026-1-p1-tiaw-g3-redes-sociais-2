document.addEventListener("DOMContentLoaded", () => {
    carregarLugares();
});

function carregarLugares(lugares = getLugares()) {

    const lista = document.getElementById("lista");
    const contador = document.getElementById("contador");

    lista.innerHTML = "";

    lugares.forEach(lugar => {

        lista.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5>${lugar.nome}</h5>
                        <p>${lugar.descricao}</p>
                        <p> <i class="bi bi-geo-alt-fill"></i>
                        ${nomeEstado(lugar.id_estado)}</p>
                    </div>
                </div>
            </div>
        `;
    });

    contador.textContent = `${lugares.length} lugar(es) encontrado(s).`;
}

function nomeEstado(idEstado) {

    const estados = getEstadosBrasil();

    const estado = estados.find(e => e.id == idEstado);

    return estado ? estado.nome : "Estado não encontrado";
}

function pesquisarLugares() {

    const texto = document
        .getElementById("busca")
        .value
        .trim()
        .toLowerCase();

    const lugares = getLugares();

    if (texto === "") {
        carregarLugares();
        return;
    }

    const resultado = lugares.filter(lugar =>
        lugar.nome.toLowerCase().includes(texto) ||
        lugar.descricao.toLowerCase().includes(texto)
    );

    carregarLugares(resultado);
}

document
    .getElementById("busca")
    .addEventListener("input", pesquisarLugares);