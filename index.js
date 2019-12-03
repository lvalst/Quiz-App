//stores quiz score and question number
let score= 0;
let questionNumber= 0;

//base question generation
function newQuestion() {
    if (questionNumber < STORE.length) {
        return generatedQ(questionNumber);
    } else {
        $('.startQuiz').hide();
        finalScore();
        $('.questionNumber').text(5);
    }
}

//adds one pt to score variable and updates text of score on the quiz
function updateScore() {
    score++;
    $('.score').text(score);
}

//adds one to questionNumber and updates text of questionNumber on the quiz. at start, questionNumber 0, once hit begin button, adds one to indicate first question
function updateQuesNum() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
}

//if choose to retake quiz, resets score and questionNumber on the quiz to zero
function retakeTotal() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text('-');
}

//starts quiz
function startQuiz() {
    $('.altBox').hide();
    $('.startQuiz').on('click', '#begin', function (event) {
        $('.startQuiz').hide();
        $('.questionNumber').text(1);
        $('.questionBox').show();
        $('.questionBox').prepend(generateQuestion());
    })
}


//functions used to create full quiz
function sumB13tch() {
    startQuiz();
    newQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}

$(sumb13tch);