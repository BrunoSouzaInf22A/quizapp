import { verificarTema, trocarTema } from "../../helpers/tema-helpers.js"

const botaoTema = document.querySelector(".tema button");
const body = document.querySelector("body");

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema);
});

verificarTema(body, botaoTema);

const assunto = localStorage.getItem("assunto");

if (assunto) {
    alterarAssunto();
} else {
    console.warn("Assunto não definido no localStorage");
}

function alterarAssunto() {
    const divIcone = document.querySelector(".assunto_icone");
    const iconeImg = document.querySelector(".assunto_icone img");
    const assuntoTitulo = document.querySelector(".assunto h1");

    divIcone.classList.add(assunto.toLowerCase());
    iconeImg.setAttribute("alt", `ícone de ${assunto}`);
    iconeImg.setAttribute("src", `../../assets/images/icon-${assunto.toLowerCase()}.svg`);
    assuntoTitulo.textContent = assunto.charAt(0).toUpperCase() + assunto.slice(1);
}