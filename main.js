const questions = [
    {
        question: "Na área de TI, qual é o escopo principal de atuação de um profissional de Infraestrutura?",
        options: ["Desenvolver interfaces gráficas para aplicativos web.", 
            "Gerenciar, configurar e manter redes, servidores e sistemas garantindo a disponibilidade.",
            "Escrever a lógica de negócios e consultas no lado do servidor."
        ],
        correctAnswer: 1
    },
    {
        question: "No ecossistema de desenvolvimento web, qual é a principal responsabilidade do Front-end?",
        options: ["Estruturar o esquema de dados e garantir a integridade referencial.",
            "Criar e otimizar a interface do usuário, interatividade e layout.",
            "Gerenciar as rotas da API e a autenticação do servidor, garantindo acessibilidade ao usuário."
        ],
        correctAnswer: 1
    },
    {
        question: "Qual é a principal função de um Banco de Dados em uma aplicação?",
        options: ["Compilar o código-fonte em linguagem de máquina",
            "Renderizar os estilos visuais de uma página web.",
            "Armazenar, organizar e permitir a recuperação eficiente de dados."
        ],
        correctAnswer: 2
    },
    {
        question: "O desenvolvimento Back-end foca predominantemente em quais aspectos de um sistema?",
        options: ["Lógica de negócios, processamento de dados, segurança e APIs no servidor.",
            "Responsividade e otimização de imagens para diferentes telas.",
            "Conexão entre diferentes partes da equipe, incluindo a parte de Front-end e Banco de Dados."
        ],
        correctAnswer: 0
    },
    {
        question:"Qual é a definição técnica do HTML no contexto de um desenvolvimento web?",
        options: ["Uma linguagem de programação orientada a objetos.",
            "Um sistema de controle de versionamento para códigos.",
            "Uma linguagem de marcação para estruturar."
        ],
        correctAnswer: 2
    },
    {
        question: "Qual é o propósito fundamental do CSS?",
        options: ["Controlar a apresentação e estilização.",
            "Adicionar comportamento lógico.",
            "Estilizar a interface do computador."
        ],
        correctAnswer: 0
    },
    {
        question: "Na lógica de programação, como podemos definir o conceito de 'variável'?",
        options: ["Um protocolo de comunicação entre cliente e servidor.",
            "Uma estrutura de repetição específica para iterar matrizes.",
            "Um espaço no código para armazenar valores."
        ],
        correctAnswer: 2
    },
    {
        question: "Em SQL, qual comando é utilizado para instanciar um novo banco de dados?",
        options: ["DROP DATABASE",
            "CREATE DATABASE",
            "OPEN DATABASE"
        ],
        correctAnswer: 1
    },
    {
        question: "Qual é a definição mais precisa para um Sistema Operacional?",
        options: ["Um gerenciador de funcionamento da máquina.",
            "Armazena senhas, dados, arquivos e etc.",
            "Cria sites automaticamente"
        ],
        correctAnswer: 0
    },
    {
        question:"O que caracteriza o uso de um terminal na computação?",
        options: ["Uma interface de texto",
            "Um ambiente de desenvolvimento integrado focado apenas em linguagens compiladas",
            "Um periférico de entrada projetado exclusivamente para leitura de dados"
        ],
        correctAnswer: 0
    }
];

let currentQueue = [];
let skippedQueue = [];
let score = 0;
let isAnsweringSkipped = false;
let currentQuestionIndex = 0; // Índice relativo à fila atual

// Elementos da DOM
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionBadge = document.getElementById("question-badge");
const skippedBadge = document.getElementById("skipped-badge");
const headerCounter = document.getElementById("header-counter");
const remainingText = document.getElementById("remaining-text");
const btnSkip = document.getElementById("btn-skip");
const quizSection = document.getElementById("quiz-card-section");
const resultSection = document.getElementById("result-section");

// ÁUDIOS / EFEITOS SONOROS
const somAcerto = new Audio('mp3/rightanswer.mp3');
const somErro = new Audio('mp3/wronganswer.mp3');
const somExcelente = new Audio('mp3/excelentresult.mp3');
const somOtimo = new Audio('mp3/greatresult.mp3');
const somRuim = new Audio('mp3/poorresult.mp3');
const somClick = new Audio('mp3/clicksound.mp3');

// ELEMENTOS DA DOM PARA A TELA DE INÍCIO
const startSection = document.getElementById("start-section");
const btnStart = document.getElementById("btn-start");

function startQuizFlow() {
    // Garante que apenas a tela de início apareça ao carregar a página
    startSection.classList.remove("hidden");
    quizSection.classList.add("hidden");
    resultSection.classList.add("hidden");
    
    // Reseta o contador do cabeçalho para indicar o início iminente
    headerCounter.textContent = "0/10";
}

function initQuiz() {
    currentQueue = questions.map((_, index) => index);
    skippedQueue = [];
    score = 0;
    isAnsweringSkipped = false;
    currentQuestionIndex = 0;
    
    quizSection.classList.remove("hidden");
    resultSection.classList.add("hidden");
    startSection.classList.add("hidden"); // Esconde a tela de início se o usuário reiniciar
    loadQuestion();
}

function loadQuestion() {
    let questionId;
    if (!isAnsweringSkipped) {
        questionId = currentQueue[currentQuestionIndex];
        questionBadge.textContent = `#${questionId + 1} de 10`;
        skippedBadge.classList.add("hidden");
        btnSkip.disabled = false;
        
        let remaining = currentQueue.length - currentQuestionIndex - 1;
        remainingText.textContent = `${remaining} restantes`;
    } else {
        questionId = skippedQueue[currentQuestionIndex];
        questionBadge.textContent = `Retorno #${questionId + 1}`;
        skippedBadge.classList.remove("hidden");
        btnSkip.disabled = true; // Desabilita pular na rodada de puladas
        
        let remaining = skippedQueue.length - currentQuestionIndex - 1;
        remainingText.textContent = `${remaining} restantes na repescagem`;
    }

    // Atualiza cabeçalho
    let totalAnswered = isAnsweringSkipped 
        ? questions.length - skippedQueue.length + currentQuestionIndex + 1 
        : currentQuestionIndex + 1;
    headerCounter.textContent = `${Math.min(totalAnswered, 10)}/10`;

    const q = questions[questionId];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";

    const letters = ["A", "B", "C"]; // Ajuste para 3 alternativas conforme seu HTML
    
    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.innerHTML = `
            <span class="option-letter">${letters[index]}</span>
            <span>${option}</span>
        `;
        btn.onclick = () => selectAnswer(btn, index, q.correctAnswer);
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(btn, selectedIndex, correctIndex) {
    // Desabilita todos os botões e o botão de pular temporariamente para evitar cliques duplos
    Array.from(optionsContainer.children).forEach(b => b.style.pointerEvents = "none");
    btnSkip.disabled = true;

    const isCorrect = selectedIndex === correctIndex;
    
    if (isCorrect) {
        btn.classList.add("correct");
        document.body.classList.add("flash-correct");
        
        // TOCA SOM DE ACERTO
        somAcerto.currentTime = 0;
        somAcerto.play();
        
        score++;
    } else {
        btn.classList.add("wrong");
        document.body.classList.add("flash-wrong");
        
        // TOCA SOM DE ERRO
        somErro.currentTime = 0;
        somErro.play();
        
        // Marca a alternativa correta visualmente
        optionsContainer.children[correctIndex].classList.add("correct");
    }

    // Aguarda 700ms (tempo da animação visual) para avançar
    setTimeout(() => {
        document.body.classList.remove("flash-correct", "flash-wrong");
        advanceToNextQuestion();
    }, 700);
}

function advanceToNextQuestion() {
    currentQuestionIndex++;

    if (!isAnsweringSkipped) {
        if (currentQuestionIndex >= currentQueue.length) {
            // Terminou a fila principal, verifica repescagem
            if (skippedQueue.length > 0) {
                isAnsweringSkipped = true;
                currentQuestionIndex = 0;
                loadQuestion();
            } else {
                showResults();
            }
        } else {
            loadQuestion();
        }
    } else {
        if (currentQuestionIndex >= skippedQueue.length) {
            // Terminou a fila de puladas
            showResults();
        } else {
            loadQuestion();
        }
    }
}

function showResults() {
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    document.getElementById("final-score").textContent = `${score}/10`;
    
    const progressFill = document.getElementById("progress-bar-fill");
    const percentage = (score / 10) * 100;
    
    // Pequeno atraso para a animação da barra funcionar
    setTimeout(() => {
        progressFill.style.width = `${percentage}%`;
    }, 100);

    // Ajusta a cor da barra dependendo do desempenho
    if(score <= 4) progressFill.style.backgroundColor = "var(--wrong-bg)";
    else if(score <= 7) progressFill.style.backgroundColor = "#fcd34d"; // amarelo
    else progressFill.style.backgroundColor = "var(--correct-bg)";

    // FEEDBACK DE TEXTO + ÁUDIOS FINAIS
    const feedback = document.getElementById("feedback-message");
    
    if (score === 10) {
        feedback.textContent = "Excelente! Você arrasou na TI!";
        somExcelente.play();
    } else if (score >= 7) {
        feedback.textContent = "Bom trabalho! Continue assim!";
        somOtimo.play();
    } else {
        feedback.textContent = "Não desanime! Revise os conceitos e tente de novo.";
        somRuim.play();
    }
}

// --- CONFIGURAÇÃO DOS EVENTOS DE CLIQUE (ÚNICOS) ---

// Botão Iniciar (Tela de Boas-vindas)
btnStart.addEventListener("click", () => {
    somClick.currentTime = 0;
    somClick.play();

    startSection.classList.add("hidden");
    initQuiz();
});

// Botão Pular Questão
btnSkip.addEventListener("click", () => {
    somClick.currentTime = 0;
    somClick.play();

    if (!isAnsweringSkipped) {
        skippedQueue.push(currentQueue[currentQuestionIndex]);
        advanceToNextQuestion();
    }
});

// Botão Jogar Novamente (Tela de Resultados)
document.getElementById("btn-restart").addEventListener("click", () => {
    somClick.currentTime = 0;
    somClick.play();
    startQuizFlow();
});

// Inicializa o fluxo exibindo a tela de boas-vindas ao carregar a página
startQuizFlow();