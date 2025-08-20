const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _checkBtn = document.getElementById('check-answer');
const _result = document.getElementById('result');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');
const _questionCounter = document.getElementById('question-counter');

const _startScreen = document.querySelector('.start-screen');
const _wrapper = document.querySelector('.wrapper');
const _startQuizBtn = document.getElementById('start-quiz');
const _usernameInput = document.getElementById('username');

const _endScreen = document.querySelector('.end-screen');
const _rankingList = document.getElementById('ranking-list');
const _restartBtn = document.getElementById('restart');

let correctAnswer = "";
let correctScore = 0;
let askedCount = 0;
const totalQuestion = 10;
let questions = [];
let playerName = "";

document.addEventListener('DOMContentLoaded', () => {
    _totalQuestion.textContent = totalQuestion;
    _wrapper.style.display = 'none';

    _startQuizBtn.addEventListener('click', () => {
        const name = _usernameInput.value.trim();
        if (!name) {
            alert("Digite seu nome para jogar.");
            return;
        }
        playerName = name;
        _startScreen.style.display = 'none';
        _wrapper.style.display = 'block';
        startGame();
    });

    _restartBtn.addEventListener('click', () => location.reload());
});

function startGame() {
    correctScore = 0;
    askedCount = 0;
    _correctScore.textContent = correctScore;
    _checkBtn.disabled = true;
    fetchQuestions().then(() => {
        showQuestion();
        _checkBtn.addEventListener('click', checkAnswer);
    });
}

async function fetchQuestions() {
    const searchTerms = [
        "Sustentabilidade",
        "Energia renovável",
        "Reciclagem",
        "Conservação ambiental",
        "Aquecimento global",
        "Mudanças climáticas",
        "Economia circular",
        "Preservação da biodiversidade",
        "Poluição do ar",
        "Desmatamento"
    ];

    questions = [];

    for (let term of searchTerms) {
        try {
            const response = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`);
            const data = await response.json();

            if (data.extract) {
                const firstSentence = data.extract.split('. ')[0] + '.';
                const isTrue = Math.random() > 0.5;
                let questionText;
                let correct = "Verdadeiro";

                if (isTrue) {
                    questionText = `${firstSentence}`;
                    correct = "Verdadeiro";
                } else {
                    questionText = ` ${firstSentence.replace(/ é /gi, ' não é ')}`;
                    correct = "Falso";
                }

                questions.push({
                    question: questionText,
                    correct_answer: correct,
                    options: ["Verdadeiro", "Falso"],
                    category: term
                });

                if (questions.length >= totalQuestion) break;
            }
        } catch (error) {
            console.error('Erro ao buscar da Wikipedia:', error);
        }
    }
}

function showQuestion() {
    _checkBtn.disabled = true;
    _result.innerHTML = "";
    _questionCounter.textContent = `Questão ${askedCount + 1} de ${totalQuestion}`;

    const current = questions[askedCount];
    correctAnswer = current.correct_answer;

    _question.innerHTML = `${current.question} <br> <span class="category">${current.category}</span>`;

    _options.innerHTML = current.options.map(option => `<li>${option}</li>`).join('');

    selectOption();
}

function selectOption() {
    _options.querySelectorAll('li').forEach(option => {
        option.addEventListener('click', () => {
            const selected = _options.querySelector('.selected');
            if (selected) selected.classList.remove('selected');
            option.classList.add('selected');
            _checkBtn.disabled = false;
        });
    });
}

async function checkAnswer() {
    _checkBtn.disabled = true;

    const selected = _options.querySelector('.selected');
    if (!selected) {
        _result.innerHTML = `<p><i class="fas fa-question"></i> Selecione uma opção!</p>`;
        _checkBtn.disabled = false;
        return;
    }

    const selectedAnswer = selected.textContent.trim();

    if (selectedAnswer === correctAnswer) {
        correctScore++;
        _result.innerHTML = `<p><i class="fas fa-check"></i> Correto!</p>`;
    } else {
        _result.innerHTML = `<p><i class="fas fa-times"></i> Errado!</p> <small><b>Resposta correta:</b> ${correctAnswer}</small>`;
    }

    _correctScore.textContent = correctScore;

    askedCount++;
    if (askedCount === totalQuestion) {
        await saveRanking();  // espera salvar antes de mostrar ranking
        await showRanking();
    } else {
        setTimeout(showQuestion, 1500);
    }
}

async function saveRanking() {
    try {
        const response = await fetch('http://localhost:3000/ranking/salvar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: playerName,
                pontuacao: correctScore
            })
        });

        if (!response.ok) throw new Error('Erro ao salvar ranking');
    } catch (err) {
        console.error("Erro ao salvar ranking:", err);
    }
}

async function showRanking() {
    _wrapper.style.display = 'none';
    _endScreen.style.display = 'block';

    try {
        const response = await fetch('http://localhost:3000/ranking/listar');
        const ranking = await response.json();

        if (ranking.length === 0) {
            _rankingList.innerHTML = "<p>Nenhum jogador ainda.</p>";
            return;
        }

        _rankingList.innerHTML = `
            <ol>
                ${ranking.map(player => `<li>${player.nome} — ${player.pontuacao} pts</li>`).join('')}
            </ol>
        `;
    } catch (err) {
        console.error("Erro ao buscar ranking:", err);
        _rankingList.innerHTML = "<p>Erro ao carregar ranking.</p>";
    }
}
