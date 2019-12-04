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
// DONE



//variable for score and ques #, will allow js to store updated info
let score= 0;
let questionNum= 0;

//adds one to score variable and updates html on page
function updateScore() {// for the function of updateScore, add 1 to existing number
    score++;
    $('.score').text(score); //jquery take the score and update html
}
// DONE!

//adds one to questionNumber and updates text of questionNumber on the quiz. at start, questionNumber 0, once hit begin button, adds one to indicate first question
function updateQuesNum() {
    questionNum++;
    $('.quesNumber').text(questionNum);
}
// DONE!

//create a question to be used in startQuiz function
function makeQuestion() {
    if (questionNum < STORE.length) {
        return formatQues(questionNum);
    } else {
        $('.quizPortion').hide();
        finalScore();
        $('.questionNum').text(5)
    }
}
// DONE!

//tells when to make a new question or go to results page
function nextQuestion() {
    if (questionNum + 1 < STORE.length) { //if the question number is less than the number of stored questions
        updateQuesNum(); //run function updateQuesNum
        $('.responseBox').hide() //hide the respones section
        return makeQuestion(questionNum); //run function to show next question
    } else { 
        $('.quizPortion').hide(); //else, will hide quiz portion
        finalScore(); //show score
        $('.quesNumber').text(5); //and number of questions 
    }
}

//if choose to retake quiz, resets score and questionNumber on the quiz to zero
//MAY NOT BE NECESSARY DUE TO SET UP OF FINAL BUTTON IN HTML, SHOULD JUST RESET ENTIRE PAGE FROM BEGINNING

// function retakeQuiz() {
//     score = 0;
//     questionNumber = 0;
//     $('.score').text(0);
//     $('.quesNumber').text('0');
// }

//starts quiz
function startQuiz() {
    $('.startQuiz button').click(function (){
        $('.startQuiz').hide(); //hide portion with blurb and begin button
        $('.quesNumber').text(1); //change quesNumber to 1
        $('.questionBox').show(); //'unhide' questionBox section
        $('.questionBox').prepend(makeQuestion()); //add result from generateQuestion function to .questionBox
    });
    // $('.altBox').hide(); //hide all questions, answers, results immediately when page loads
    // $('.content').on('click', '.beginQuiz', function (event) { //run startQuiz when click beginQuiz button
        
    // });
}


// when click submit button, selected answer compared against correct answer in STORE. if matches, correct. if does not match, shows false and correct answer
function checkAnswer(){
    $('form').on('submit', function (event){ //when click submit button in quizPortion, run event
        event.preventDefault(); //do not reload page, only .quizPortion section
        $('.altBox').hide(); //hide everything w/altbox in class
        $('.responseBox').show(); //in responsBox area, show isCorrect or wrongAnswer variable
        
        let selected = $('input:checked').val(); //radio button selected and submitted value recorded
        let answer = selected.val() //user answer is the selected value
        let correctAnswer = `${STORE[questionNum].correctAnswer}`; //check STORE to find correctAnswer
        
        if (answer === correctAnswer) { //correct answer is compared to the value of the corresponding quesNum in store
            isCorrect()
        } else {
            wrongAnswer();
        }
    })
}

function formatQues(questionNum) {
    let formMaker = $(` <form>
    <fieldset class="quesButtons">
        <legend>class="questionText">${STORE[questionNum].question}</legend>
    </fieldset>
  </form>`)
  
    let fieldSelector = $(formMaker).find('fieldset');
  
    STORE[questionNum].answers.forEach(function (answerValue, answerIndex) {
      $(`<label class="sizeMe" for="${answerIndex}">
          <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
          <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitAns">Submit</button>`).appendTo(fieldSelector);
    return formMaker;
  }

//functions used to create full quiz
function sum13tch() {
    startQuiz();
    makeQuestion();
    checkAnswer();
    nextQuestion();
}
$(sum13tch)
