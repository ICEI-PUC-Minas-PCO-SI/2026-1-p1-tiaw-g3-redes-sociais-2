let lugares = JSON.parse(localStorage.getItem("lugares")) || [

    {
        nome: "Parque Central",
        categoria: "Natureza",
        endereco: "Avenida Central, 1200 - Centro",
        imagem: "https://picsum.photos/600/400?random=1",
        descricao: "Ambiente ideal para caminhadas e contato com a natureza.",
        favorito: false
    },

    {
        nome: "Jardim Botânico",
        categoria: "Natureza",
        endereco: "Avenida Verde, 800 - Jardim Primavera",
        imagem: "https://picsum.photos/600/400?random=2",
        descricao: "Espaço com áreas verdes e trilhas para caminhada.",
        favorito: false
    },

    {
        nome: "Lago Municipal",
        categoria: "Natureza",
        endereco: "Rua do Lago, 100 - Bairro Lago Azul",
        imagem: "https://picsum.photos/600/400?random=3",
        descricao: "Local tranquilo para relaxar e apreciar a paisagem.",
        favorito: false
    },

    {
        nome: "Praça da Cidade",
        categoria: "Natureza",
        endereco: "Praça Central, 50 - Centro",
        imagem: "https://picsum.photos/600/400?random=4",
        descricao: "Ótimo local para passeios e momentos ao ar livre.",
        favorito: false
    },

    {
        nome: "Café Aurora",
        categoria: "Social",
        endereco: "Avenida Brasil, 45 - Centro",
        imagem: "https://picsum.photos/600/400?random=5",
        descricao: "Espaço confortável para conversar e relaxar.",
        favorito: false
    },

    {
        nome: "Café Cultural",
        categoria: "Social",
        endereco: "Rua da Cultura, 78 - Centro",
        imagem: "https://picsum.photos/600/400?random=6",
        descricao: "Ambiente agradável para encontros e leitura.",
        favorito: false
    },

    {
        nome: "Centro Cultural",
        categoria: "Social",
        endereco: "Praça das Artes, 10 - Centro",
        imagem: "https://picsum.photos/600/400?random=7",
        descricao: "Eventos e atividades culturais para todas as idades.",
        favorito: false
    },

    {
        nome: "Centro Esportivo",
        categoria: "Social",
        endereco: "Avenida dos Esportes, 500 - Parque Esportivo",
        imagem: "https://picsum.photos/600/400?random=8",
        descricao: "Espaço para esportes e lazer.",
        favorito: false
    },

    {
        nome: "Biblioteca Municipal",
        categoria: "Leitura",
        endereco: "Rua dos Livros, 15 - Centro",
        imagem: "https://picsum.photos/600/400?random=9",
        descricao: "Lugar silencioso perfeito para leitura.",
        favorito: false
    },

    {
        nome: "Biblioteca Comunitária",
        categoria: "Leitura",
        endereco: "Avenida Educação, 300 - Bairro Escolar",
        imagem: "https://picsum.photos/600/400?random=10",
        descricao: "Ambiente tranquilo para estudos e leitura.",
        favorito: false
    }

];

function salvar() {
    localStorage.setItem("lugares", JSON.stringify(lugares));
}

function renderizar() {

    let busca = document.getElementById("busca").value.toLowerCase();
    let filtro = document.getElementById("filtro").value;
    let somenteFavoritos = document.getElementById("somenteFavoritos").checked;

    let filtrados = lugares.filter(lugar =>
        lugar.nome.toLowerCase().includes(busca) &&
        (filtro === "" || lugar.categoria === filtro) &&
        (!somenteFavoritos || lugar.favorito)
    );

    document.getElementById("contador").innerText =
        filtrados.length + " lugar(es) encontrado(s)";

    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    if (filtrados.length === 0) {
        lista.innerHTML = "<p class='text-muted'>Nenhum lugar encontrado.</p>";
        return;
    }

    filtrados.forEach((lugar, index) => {

        lista.innerHTML += `

<div class="col-md-6">

<div class="card h-100 shadow-sm border-0">

<img src="${lugar.imagem}" class="card-img-top" style="height:220px;object-fit:cover;">

<div class="card-body">

<div class="d-flex justify-content-between align-items-start">

<div>

<h5>${lugar.nome}</h5>

<span class="badge bg-secondary mb-2">
${lugar.categoria}
</span>

<p class="small text-secondary">
📍 ${lugar.endereco}
</p>

</div>

<button
class="btn btn-outline-warning btn-sm"
onclick="favoritar(${lugares.indexOf(lugar)})">

${lugar.favorito ? "★" : "☆"}

</button>

</div>

<p class="text-muted">
${lugar.descricao}
</p>

</div>

</div>

</div>

`;

    });

}

function favoritar(index) {
    lugares[index].favorito = !lugares[index].favorito;
    salvar();
    renderizar();
}

document.getElementById("busca").addEventListener("input", renderizar);
document.getElementById("filtro").addEventListener("change", renderizar);
document.getElementById("somenteFavoritos").addEventListener("change", renderizar);

renderizar();