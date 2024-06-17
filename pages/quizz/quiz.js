import { verificarTema, trocarTema } from "../../helpers/tema-helpers.js";

const botaoTema = document.querySelector(".tema button");
const body = document.querySelector("body");
const assunto = localStorage.getItem("assunto");

let quiz = {};
let pontos = 0;
let pergunta = 1;

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema);
});

verificarTema(body, botaoTema);

if (!assunto) {
    console.warn("Assunto não definido no localStorage");
}

function alterarAssunto() {
    if (!assunto) return;

    const divIcone = document.querySelector(".assunto_icone");
    const iconeImg = document.querySelector(".assunto_icone img");
    const assuntoTitulo = document.querySelector(".assunto h1");

    divIcone.classList.add(assunto.toLowerCase());
    iconeImg.setAttribute("alt", `ícone de ${assunto}`);
    iconeImg.setAttribute("src", `../../assets/images/icon-${assunto.toLowerCase()}.svg`);
    assuntoTitulo.textContent = assunto.charAt(0).toUpperCase() + assunto.slice(1);
}

async function buscarPerguntas() {
    const urlDados = "../../data.json";

    try {
        const resposta = await fetch(urlDados);
        const dados = await resposta.json();

        dados.quizzes.forEach(dado => {
            if (dado.title === assunto) {
                quiz = dado;
            }
        });
    } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
    }
}

function montarPergunta() {
    if (!quiz.questions || quiz.questions.length === 0) {
        console.error("Nenhuma pergunta encontrada para o quiz.");
        return;
    }

    const main = document.querySelector("main");

    main.innerHTML = `
        <section class="pergunta">
            <div>
                <p>Quetão ${pergunta} de 10</p>
                <h2>${alterarSinais(quiz.questions[pergunta-1].question)}</h2>
            </div>
            <div class="barra_progresso">
                <div style="width: ${pergunta * 10}%"></div>
            </div>
        </section>

        <section class="alternativas">
            <form action="">
                <label for="alternativa_a">
                    <input type="radio" id="alternativa_a" name="alternativa">
                    <div>
                        <span>A</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[0])}
                    </div>
                </label>
                <label for="alternativa_b">
                    <input type="radio" id="alternativa_b" name="alternativa">
                    <div>
                        <span>B</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[1])}
                    </div>
                </label>
                <label for="alternativa_c">
                    <input type="radio" id="alternativa_c" name="alternativa">
                    <div>
                        <span>C</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[2])}
                    </div>
                </label>
                <label for="alternativa_d">
                    <input type="radio" id="alternativa_d" name="alternativa">
                    <div>
                        <span>D</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[3])}
                    </div>
                </label>
            </form>
            <button>Enviar</button>
        </section>
    `;
}

function alterarSinais(texto) {
    return texto.replace(/</g, "&alt;").replace(/>/g, "&gt;")
}

async function iniciar() {
    alterarAssunto();
    await buscarPerguntas();
    montarPergunta();
}

iniciar();
