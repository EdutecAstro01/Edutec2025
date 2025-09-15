
const botaoMapas = document.querySelector(".btn-mapas");
const secaoMapas = document.querySelector("#mapas");

botaoMapas.addEventListener("click", () => {
 
  const topoSecao = secaoMapas.getBoundingClientRect().top + window.scrollY;


  const deslocamento = -50;

 
  window.scrollTo({
    top: topoSecao + deslocamento,
    behavior: "smooth"
  });
});
