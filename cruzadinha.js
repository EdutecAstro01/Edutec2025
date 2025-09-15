const palavras = [
    { resposta: "ASTRONOMIA", pos: [0,4], direcao: "V", dica: 2 },
    { resposta: "ESTRELA", pos: [2,2], direcao: "H", dica: 1 },   // cruza ASTRONOMIA no R
    { resposta: "METEORO", pos: [4,1], direcao: "H", dica: 3 },   // cruza CEU no E
    { resposta: "CEU", pos: [4,4], direcao: "V", dica: 5 },       // cruza METEORO no E
    { resposta: "SOL", pos: [2,8], direcao: "V", dica: 6 },       // cruza ASTRONOMIA no O
    { resposta: "TITANIO", pos: [0,10], direcao: "V", dica: 4 }
  ];
  
  const cruzadinhaDiv = document.getElementById("cruzadinha");
  const resultadoDiv = document.getElementById("resultado");
  const mensagemFinalDiv = document.getElementById("mensagemFinal");
  
  
  let grade = [];
  for (let i = 0; i < 15; i++) {
    grade[i] = [];
    for (let j = 0; j < 15; j++) {
      grade[i][j] = null;
      const cell = document.createElement("div");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.style.position = "relative";
      cruzadinhaDiv.appendChild(cell);
    }
  }
  
  
  palavras.forEach(p => {
    let [linha, col] = p.pos;
    for (let k = 0; k < p.resposta.length; k++) {
      const cell = cruzadinhaDiv.querySelector(`[data-row="${linha}"][data-col="${col}"]`);
      if (!cell) continue;
  
      
      if (!cell.querySelector("input")) {
        const input = document.createElement("input");
        input.maxLength = 1;
        input.dataset.resposta = p.resposta[k];
        cell.appendChild(input);
      } else {
        
        if (cell.querySelector("input").dataset.resposta !== p.resposta[k]) {
          console.error(`Erro de cruzamento na célula [${linha},${col}]`);
        }
      }
  
      
      if (k === 0 && !cell.querySelector(".numero-dica")) {
        const numero = document.createElement("span");
        numero.classList.add("numero-dica");
        numero.innerText = p.dica;
        cell.appendChild(numero);
      }
  
      if (p.direcao === "H") col++;
      else linha++;
    }
  });
  
  
  document.getElementById("verificarBtn").addEventListener("click", () => {
    let acertos = 0, total = 0;
    document.querySelectorAll(".cruzadinha input").forEach(input => {
      total++;
      if (input.value.toUpperCase() === input.dataset.resposta) {
        input.style.background = "#4caf50";
        acertos++;
      } else {
        input.style.background = "#f44336";
      }
    });
    resultadoDiv.innerText = `Você acertou ${acertos} de ${total} letras.`;
    if (acertos === total) mensagemFinalDiv.style.display = "block";
  });
  
  
  document.getElementById("reiniciarBtn").addEventListener("click", () => {
    document.querySelectorAll(".cruzadinha input").forEach(input => {
      input.value = "";
      input.style.background = "#3c225a";
    });
    resultadoDiv.innerText = "";
    mensagemFinalDiv.style.display = "none";
  });
  