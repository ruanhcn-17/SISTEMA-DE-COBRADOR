document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("data-atual").textContent = new Date().toLocaleDateString();
});

function login() {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
}

function calcularTotal() {
    let ida = parseInt(document.getElementById("ida").value) || 0;
    let volta = parseInt(document.getElementById("volta").value) || 0;
    document.getElementById("total").textContent = ida + volta;
}

function calcularPagamentoTotal() {
    let valorPassagem = 7.40;
    let dinheiro = (parseInt(document.getElementById("dinheiro-pass").value) || 0) * valorPassagem;
    let cartao = (parseInt(document.getElementById("cartao-pass").value) || 0) * valorPassagem;
    let pix = (parseInt(document.getElementById("pix-pass").value) || 0) * valorPassagem;

    document.getElementById("total-dinheiro").textContent = `R$ ${dinheiro.toFixed(2)}`;
    document.getElementById("total-cartao").textContent = `R$ ${cartao.toFixed(2)}`;
    document.getElementById("total-pix").textContent = `R$ ${pix.toFixed(2)}`;

    let total = dinheiro + cartao + pix;
    document.getElementById("total-pagamento").textContent = `R$ ${total.toFixed(2)}`;
}

function alternarModoNoturno() {
    document.body.classList.toggle("modo-noturno");
}
