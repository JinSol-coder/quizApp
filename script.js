const questions = [
    {
        questions: "귤에 있는 하얀 실은 무엇일까요?",
        answers: [
            { text: "실타래", correct: false},
            { text: "귤그물", correct: false},
            { text: "귤락", correct: true},
            { text: "귤찌꺼기", correct: false},
        ]
    },
    {
        questions: "해마는 어떤 종에 속할까요?",
        answers: [
            { text: "포유류", correct: false},
            { text: "양서류", correct: false},
            { text: "파충류", correct: false},
            { text: "어류", correct: true},
        ]
    },
    {
        questions: "사람이 가장 쎈 근육을 가진 부위는?",
        answers: [
            { text: "혀", correct: true},
            { text: "심장", correct: false},
            { text: "허벅지", correct: false},
            { text: "이두박근", correct: false},
        ]
    },
    {
        questions: "나무에 박힌 못은 시간이 지나면 어떻게 될까요?",
        answers: [
            { text: "못이 나무를 뚫고 반대쪽으로 나온다", correct: false },
            { text: "못이 녹슬어서 사라진다", correct: false },
            { text: "못 주위로 나무가 자라서 못을 덮는다", correct: true },
            { text: "나무의 성장에 따라 못이 위로 올라간다", correct: false },
        ],
    },
    {
        questions: "손톱은 하루에 얼마나 자랄까요?",
        answers: [
            { text: "0.5mm", correct: false },
            { text: "0.1mm", correct: true },
            { text: "0.05mm", correct: false },
            { text: "0.01mm", correct: false },
        ],
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "다음";
    showQuiz();
}

function showQuiz(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

function showScore(){
    resetState();
    questionElement.innerHTML = questions.length + "개 중 " + score + "개 맞췄네~";
    if(score/questions.length>=0.8){
        questionElement.innerHTML += " 천재자식ㅋㅋ~~!!";
    }else if(score/questions.length>=0.6 && score/questions.length<0.8){
        questionElement.innerHTML += " 굳굳";
    }else if(score/questions.length>=0.4 && score/questions.length<0.6){
        questionElement.innerHTML += " 조금만 더 분발해보자!";
    }else{
        questionElement.innerHTML += " 초등학교부터 다시 갔다와ㅋㅋ";
    }
    nextButton.innerHTML = "다시하기";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuiz();
    }else{
        showScore();
    }
}

startQuiz();

