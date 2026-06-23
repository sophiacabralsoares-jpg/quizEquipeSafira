const perguntas = [
    {
        pergunta: "Na área de TI, qual é o escopo principal de atuação de um profissional de Infraestrutura?",
        opcoes: ["Desenvolver interfaces gráficas para aplicativos web.", 
            "Gerenciar, configurar e manter redes, servidores e sistemas garantindo a disponibilidade.",
            "Escrever a lógica de negócios e consultas no lado do servidor."
        ],
        correctAnswer: 1
    },
    {
        pergunta: "No ecossistema de desenvolvimento web, qual é a principal responsabilidade do Front-end?",
        opcoes: ["Estruturar o esquema de dados e garantir a integridade referencial.",
            "Criar e otimizar a interface do usuário, interatividade e layout.",
            "Gerenciar as rotas da API e a autenticação do servidor, garantindo acessibilidade ao usuário."
        ],
        correctAnswer: 1
    },
    {
        pergunta: "Qual é a principal função de um Banco de Dados em uma aplicação?",
        opcoes: ["Compilar o código-fonte em linhguagem de máquina",
            "Renderizar os estilos visuais de uma página web.",
            "Armazenar, organizar e permitir a recuperação eficiente de dados."
        ],
        correctAnswer: 2
    },
    {
        pergunta: "O desenvolvimento Back-end foca predominantemente em quais aspectos de um sistema?",
        opcoes: ["Lógica de negócios, processamento de dados, segurança e APIs no servidor.",
            "Responsividade e otimização de imagens para diferentes telas.",
            "Conexão entre diferentes partes da equipe, incluindo a parte de Front-end e Banco de Dados."
        ],
        correctAnswer: 0
    },
    {
        pergunta:"Qual é a definição técnica do HTML no contexto de um desenvolvimento web?",
        opcoes: ["Uma linguagem de programação orientada a objetos.",
            "Um sistema de controle de versionamento para códigos.",
            "Uma linguagem de marcação para estruturar."
        ],
        correctAnswer: 2
    },
    {
        pergunta: "Qual é o propósito fundamental do CSS?",
        opcoes: ["Controlar a apresentação e estilização.",
            "Adicionar comportarmento lógico.",
            "Estilizar a interface do computador."
        ],
        correctAnswer: 0
    },
    {
        pergunta: "Na lógica de programação, como podemos definir o conceito de 'variável'?",
        opcoes: ["Um protocolo de comunicação entre cliente e servidor.",
            "Uma estrutura de repetição específica para iterar matrizes.",
            "Um espaço no código para armazenar valores."
        ],
        correctAnswer: 2
    },
    {
        pergunta: "Em SQL, qual comando é utilizado para instanciar um novo banco de dados?",
        opcoes: ["DROP DATABASE",
            "CREATE DATABASE",
            "OPEN DATABASE"
        ],
        correctAnswer: 1
    },
    {
        pergunta: "Qual é a definição mais precisa para um Sistema Operacional?",
        opcoes: ["Um gerenciador de funcionamento da máquina.",
            "Armazena senhas, dados, arquivos e etc.",
            "Cria sites automaticamente"
        ],
        correctAnswer: 0
    },
    {
        pergunta:"O que caracteriza o uso de um terminal na computação?",
        opcoes: ["Uma interface de texto",
            "Um ambiente de desenvolvimento integrado focado apenas em linguagens compiladas",
            "Um periférico de entrada projetado exclusivamente para leitura de dados"
        ],
        correctAnswer: 0
    }
];

let currentQuestion = [];
let skippedQuestion = [];
let score = 0;
let isAsweringSkipped = false;
let currentQuestionIndex = 0;

//DOM
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionBadge = document.getElementById("skipped-badge");
const headerCounter = document.getElementById("header-counter");
const remainingText = document.getElementById("remaining-text");
const btnSkip = document.getElementById("btn-skip");
const quizSection = document.getElementById("quiz-card-section");
const resultSection = document.getElementById("result-section");

function iniciaQuiz() {
    currentQuestion = perguntas.map((_, index) => index);
    skippedQuestion = [];
    score = 0;
    isAsweringSkipped = false;
    currentQuestionIndex = 0;

    quizSection.classList.remove("hidden");
    resultSection.classList.add("hidden");
    loadQuestion();
}

function loadQuestion() {
    let questionId;
    if (!isAsweringSkipped) {
        questionId = currentQuestion[currentQuestionIndex];
        questionBadge.textContent = `#${questionId + 1} de 10`;
        
    }
}