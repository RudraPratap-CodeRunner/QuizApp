const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text:"Shark",correct:false },
            {text:"Blue whale",correct:true },
            {text:"Elephant",correct:false },
            {text:"Giraffe",correct:false },
               
        ]

    },
    {
        question: "Which is the smallest in the world?",
        answers: [
            {text:"Vatican City",correct:true },
            {text:"Bhutan",correct:false },
            {text:"Nepal",correct:false },
            {text:"Shri Lanka",correct:false },
               
        ]

    },
    {
        question: "Which is the largest desert  in the world?",
        answers: [
            {text:"Kalahari",correct:false },
            {text:"Gobi",correct:false },
            {text:"Sahara",correct:false },
            {text:"Antartica",correct:true},
               
        ]

    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text:"Asia",correct:false },
            {text:"Australia",correct:true },
            {text:"Arctic",correct:false },
            {text:"Africa",correct:false },
               
        ]

    }
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let curentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    curentQuestionIndex=0;
    score=0;
    nextButton.innerHTML='Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[curentQuestionIndex];
    let questionNo = curentQuestionIndex+1;
    questionElement.innerHTML = questionNo + '.' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none'
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectionBtn = e.target;
    const isCorrect = selectionBtn.dataset.correct==='true';
    if(isCorrect){
        selectionBtn.classList.add('correct');
        score++;
    }else{
        selectionBtn.classList.add('incorrect');
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==='true'){
            button.classList.add('correct');
        }
        button.disabled=true;
    });
    nextButton.style.display = 'block';
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = 'block';
}
function handleNextButton(){
    curentQuestionIndex++;
    if(curentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(curentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
