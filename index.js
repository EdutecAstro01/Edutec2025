// Seleciona o botão e a seção alvo
const botaoMapas = document.querySelector(".btn-mapas");
const secaoMapas = document.querySelector("#mapas");

botaoMapas.addEventListener("click", () => {
  // Pega a posição da seção em relação ao topo da página
  const topoSecao = secaoMapas.getBoundingClientRect().top + window.scrollY;

  // Ajuste: distância extra do topo (50px antes da seção)
  const deslocamento = -50; // negativo para parar um pouco antes do topo

  // Rola suavemente até a posição
  window.scrollTo({
    top: topoSecao + deslocamento,
    behavior: "smooth"
  });
});
