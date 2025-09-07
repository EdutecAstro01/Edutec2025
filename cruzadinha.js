const perguntas = [
  { dica: "1. Brilho distante no escuro do céu. O que sou eu?", resposta: "ESTRELA" },
  { dica: "2. O que estuda planetas, estrelas e todo o universo, buscando desvendar sua origem e evolução?", resposta: "ASTRONOMIA" },
  { dica: "3. Sou um corpo celeste, que passa rapidamente pelo céu. Às vezes, deixo um rastro brilhante. O que sou?", resposta: "METEORO" },
  { dica: "4. Sou um elemento que brilha em joias e em peças de foguetes e em rocha sou encontrado. O que sou?", resposta: "TITANIO" },
  { dica: "5. Branco como nuvem, azul como o mar, no dia fico claro e de noite escuro. O que sou eu?", resposta: "CEU" },
  { dica: "6. Brilho intenso no céu e sou maior do sistema solar, e muito importante para a galáxia. O que eu sou?", resposta: "SOL" }
];

let indiceAtual = 0;

const cruzadinhaDiv = document.getElementById("cruzadinha");
const dicaDiv = document.getElementById("dica");
const resultadoDiv = document.getElementById("resultado");
const perguntaAtualSpan = document.getElementById("perguntaAtual");
const totalPerguntasSpan = document.getElementById("totalPerguntas");
const mensagemFinalDiv = document.getElementById("mensagemFinal");

totalPerguntasSpan.innerText = perguntas.length;

function carregarPergunta() {
  resultadoDiv.innerText = "";
  mensagemFinalDiv.style.display = "none";
  cruzadinhaDiv.innerHTML = "";

  const perguntaAtual = perguntas[indiceAtual];
  dicaDiv.innerText = perguntaAtual.dica;
  perguntaAtualSpan.innerText = indiceAtual + 1;

  // Ajusta dinamicamente o número de colunas da grid
  cruzadinhaDiv.style.gridTemplateColumns = `repeat(${perguntaAtual.resposta.length}, 3rem)`;

  for (let letra of perguntaAtual.resposta) {
    const input = document.createElement("input");
    input.setAttribute("maxlength", "1");
    input.setAttribute("data-resposta", letra);
    cruzadinhaDiv.appendChild(input);
  }
}

function verificar() {
  const inputs = document.querySelectorAll(".cruzadinha input");
  let acertos = 0;

  inputs.forEach(input => {
    if (input.value.toUpperCase() === input.getAttribute("data-resposta")) {
      input.style.background = "#90EE90"; // verde
      acertos++;
    } else {
      input.style.background = "#FFB6C1"; // rosa
    }
  });

  resultadoDiv.innerText = `Você acertou ${acertos} de ${inputs.length} letras.`;
}

document.getElementById("verificarBtn").addEventListener("click", verificar);

document.getElementById("proximaBtn").addEventListener("click", () => {
  if (indiceAtual < perguntas.length - 1) {
    indiceAtual++;
    carregarPergunta();
  } else {
    resultadoDiv.innerText = "Você completou todas as perguntas!";
    mensagemFinalDiv.style.display = "block"; // mostra mensagem de parabéns
  }
});

// Botão "Jogar Novamente"
document.getElementById("reiniciarBtn").addEventListener("click", () => {
  indiceAtual = 0;
  carregarPergunta();
  resultadoDiv.innerText = "";
  mensagemFinalDiv.style.display = "none";
});

// Carrega a primeira pergunta ao iniciar
carregarPergunta();
