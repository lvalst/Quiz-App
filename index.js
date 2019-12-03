//HEADING introPage
// h1 section that has title of quiz, which hyperlinks back to beginning (does not change, no need jquery)-DONE

//section 'quizScores' that keeps section stats ('score' and 'quesNumber') updated- needs access to 'store.js'; total number of ques and correct answers, score will tally when user clicks radio button that matches words in answer, quesnumber ++ until end of quiz. 
//IN PROGRESS

//section 'quizPortion' same styling, where ques, answers, result/restart page go
//section 'startQuiz box' with intro/prompt and start quiz button- will be hidden when start quiz button clicked
//IN PROGRESS

//section for question, button w/ submit- changes to answer when clicked and button w/ nextquestion-
//IN PROGRESS

//section to show final score, changes to button to restart and links back to index.html
//IN PROGRESS

//BUTTONS all have same CSS, just diff words (called by class names)







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
        $('.quesNumber').text(5);
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
    $('.quesNumber').text(questionNumber + 1);
}

//if choose to retake quiz, resets score and questionNumber on the quiz to zero
function retakeTotal() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.quesNumber').text('-');
}

//starts quiz
function startQuiz() {
    $('.altBox').hide();
    $('.startQuiz').on('click', '#begin', function (event) {
        $('.startQuiz').hide();
        $('.queNumber').text(1);
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