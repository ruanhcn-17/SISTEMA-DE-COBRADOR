// Variáveis para armazenar os números das catracas e as quantidades de passageiros por viagem
let catracas = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0
};

let totalPassageiros = 0;
let totalDinheiro = 0;
let totalCartao = 0;
let totalPix = 0;

// Histórico de viagens
let historicoViagens = [];

document.addEventListener("DOMContentLoaded", () => {
    // Exibe a data atual
    document.getElementById("data-atual").textContent = new Date().toLocaleDateString();
});

function login() {
    // Oculta tela de login e exibe a aplicação principal
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
}

function calcularTotal() {
    // Calcula o total de passageiros (ida + volta)
    let ida = parseInt(document.getElementById("ida").value);
    let volta = parseInt(document.getElementById("volta").value);
    totalPassageiros = ida + volta;
    document.getElementById("total").textContent = totalPassageiros;
}

let cronometro;
let segundos = 0;

function iniciarViagem() {
    // Reseta o cronômetro e zera os dados do histórico
    resetarHistorico();
    segundos = 0;
    atualizarCronometro();
    cronometro = setInterval(() => {
        segundos++;
        atualizarCronometro();
    }, 1000);
    
    verificarLocalizacao();
    atualizarCatraca();
}

function finalizarViagem() {
    // Salva os dados da viagem no histórico
    let viagem = document.getElementById("viagem").value;
    let catraca = document.getElementById("catraca").value;
    let totalPassageiros = document.getElementById("total").textContent;
    let tempoViagem = document.getElementById("tempo").textContent;
    let totalPagamento = document.getElementById("total-pagamento").textContent;

    let viagemData = {
        viagem: viagem,
        catraca: catraca,
        totalPassageiros: totalPassageiros,
        tempoViagem: tempoViagem,
        totalPagamento: totalPagamento
    };

    // Adiciona os dados da viagem ao histórico
    historicoViagens.push(viagemData);

    // Reseta os dados da viagem atual
    resetarHistorico();
    clearInterval(cronometro);
}

function visualizarHistorico() {
    // Cria uma lista de todas as viagens feitas até o momento
    let historicoHTML = "<h3>Histórico Diário</h3>";
    historicoHTML += "<table><tr><th>Viagem</th><th>Catraca</th><th>Total Passageiros</th><th>Tempo</th><th>Total Pagamento</th></tr>";
    
    historicoViagens.forEach(viagem => {
        historicoHTML += `
            <tr>
                <td>${viagem.viagem}</td>
                <td>${viagem.catraca}</td>
                <td>${viagem.totalPassageiros}</td>
                <td>${viagem.tempoViagem}</td>
                <td>${viagem.totalPagamento}</td>
            </tr>
        `;
    });

    historicoHTML += "</table>";

    // Exibe o histórico na tela
    document.getElementById("historico-container").innerHTML = historicoHTML;
}

function alternarModoNoturno() {
    // Alterna entre os modos claro e escuro
    document.body.classList.toggle("modo-noturno");
}

function atualizarCatraca() {
    // Atualiza o número da catraca com base na viagem selecionada e no pagamento via cartão
    let viagem = document.getElementById("viagem").value;
    let quantidadeCartao = parseInt(document.getElementById("cartao-pass").value) || 0;

    // Somamos o número de passageiros do cartão ao número da catraca
    catracas[viagem] += quantidadeCartao;

    // Exibe o número atualizado da catraca na tela
    document.getElementById("catraca").value = catracas[viagem];
}

function calcularPagamentoTotal() {
    // Calcula o total recebido nas 3 formas de pagamento
    let valorPassagem = 7
