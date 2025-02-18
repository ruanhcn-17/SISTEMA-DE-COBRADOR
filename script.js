document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("data-atual").textContent = new Date().toLocaleDateString();
});

// Variáveis globais
let tempo = 0, intervalo;
let viagemAtual = 1;

function login() {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
}

function iniciarViagem() {
    let catraca = document.getElementById("catraca").value;
    if (!catraca) {
        alert("Por favor, insira o número da catraca antes de iniciar a viagem.");
        return;
    }

    tempo = 0;
    document.getElementById("tempo").textContent = "00:00:00";

    intervalo = setInterval(() => {
        tempo++;
        let horas = Math.floor(tempo / 3600).toString().padStart(2, '0');
        let minutos = Math.floor((tempo % 3600) / 60).toString().padStart(2, '0');
        let segundos = (tempo % 60).toString().padStart(2, '0');
        document.getElementById("tempo").textContent = `${horas}:${minutos}:${segundos}`;
    }, 1000);

    let finalizarBtn = document.createElement("button");
    finalizarBtn.textContent = "Finalizar Viagem";
    finalizarBtn.onclick = finalizarViagem;
    document.getElementById("finalizar-container").innerHTML = "";
    document.getElementById("finalizar-container").appendChild(finalizarBtn);
}

function finalizarViagem() {
    clearInterval(intervalo);
    salvarDados();
    zerarCampos();
    viagemAtual = viagemAtual < 8 ? viagemAtual + 1 : 1;
    document.getElementById("viagem").value = viagemAtual;
}

// Função para calcular total de passageiros
function calcularTotal() {
    let ida = parseInt(document.getElementById("ida").value) || 0;
    let volta = parseInt(document.getElementById("volta").value) || 0;
    let total = ida + volta;
    document.getElementById("total").textContent = total;
}

// Função para calcular automaticamente o total recebido
function calcularPagamentoTotal() {
    let valorPassagem = 7.40;
    let dinheiro = (parseInt(document.getElementById("dinheiro-pass").value) || 0) * valorPassagem;
    let cartao = (parseInt(document.getElementById("cartao-pass").value) || 0) * valorPassagem;
    let pix = (parseInt(document.getElementById("pix-pass").value) || 0) * valorPassagem;

    let total = dinheiro + cartao + pix;

    document.getElementById("total-pagamento").textContent = `R$ ${total.toFixed(2)}`;
}

// Monitorar campos de pagamento e atualizar total automaticamente
document.getElementById("dinheiro-pass").addEventListener("input", calcularPagamentoTotal);
document.getElementById("cartao-pass").addEventListener("input", calcularPagamentoTotal);
document.getElementById("pix-pass").addEventListener("input", calcularPagamentoTotal);

function salvarDados() {
    let catraca = document.getElementById("catraca").value;
    let totalPagamento = document.getElementById("total-pagamento").textContent;
    let totalPassageiros = document.getElementById("total").textContent;
    let tempoViagem = document.getElementById("tempo").textContent;

    localStorage.setItem(`viagem${viagemAtual}`, JSON.stringify({ catraca, totalPagamento, totalPassageiros, tempoViagem }));
}

function zerarCampos() {
    document.getElementById("catraca").value = "";
    document.getElementById("ida").value = "0";
    document.getElementById("volta").value = "0";
    document.getElementById("dinheiro-pass").value = "0";
    document.getElementById("cartao-pass").value = "0";
    document.getElementById("pix-pass").value = "0";
    document.getElementById("total").textContent = "0";
    document.getElementById("total-pagamento").textContent = "R$ 0,00";
}

function exportarPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    let dados = JSON.parse(localStorage.getItem(`viagem${viagemAtual}`)) || {};
    doc.text(`Catraca: ${dados.catraca || "N/A"}`, 10, 10);
    doc.text(`Total Pago: ${dados.totalPagamento || "R$ 0,00"}`, 10, 20);
    doc.text(`Passageiros: ${dados.totalPassageiros || "0"}`, 10, 30);
    doc.text(`Duração: ${dados.tempoViagem || "00:00:00"}`, 10, 40);
    
    doc.save(`Viagem_${viagemAtual}.pdf`);
}
