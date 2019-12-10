//what does begin button do? 
//how does button change to 'submit'
//how does it take the information from STORE and feed it to the webpage in radio format
//how does it check the submitted answer against the store answers
//how does it judge correct or not
//how does button change to continue
//how does it show score and question number each page?
//how does it show final scores and give option to restart

//base quesNumber and score in quizScores
let quesNumber = 0;
let score = 0;
//works

// //when to make new question or finish quiz
function newQues() { //same as monkey nextQuestion()
    if (quesNumber +1 < STORE.length) { //if the quesNumber is less than number of questions in the STORE
        return makeQues(quesNumber); //run the makeQues function using that quesNumber
    } else { //if not
        finalScore(); //run the finalScore function
        $('.quesNumber').text(5); //and show quesNumber out of 5
    }
}

//update the quesNumber portion in quizScores
function plusQuesNum() {
    quesNumber++
    $('.quesNumber').text(quesNumber+1);
} //works

//update the score portion in quizScores
function plusScoreNum() {
    score++
    $('.score').text(score + 1);
} //works

function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
  }

//click the .beginQuiz button, start the quiz
function startQuiz() {
    $('.startQuiz button').on('click', function(event) {
        event.preventDefault(); //work
        $('.startQuiz').hide(); //work
        $('.quesNumber').text(1); //work
        $('.quizScores').show();//work
        $('.quesBox').show(); //work
        $('.quesBox').prepend(makeQues());
    });
}

function checkQues() {
    $('.quesBox').on('click', function () {
        $('.quesBox').hide();
        $('.ansBox').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[quesNumber].correctAnswer;
        if (answer === correct) {
            return correctAns();
        } else {
            return wrongAns();
        }

    });
}

//question format using values from STORE
function makeQues(quesNumber) { //run this function based off of the quesNumber
    let formMaker = $(`<form>
        <fieldset>
            <legend class="quesText">${STORE[quesNumber].question}</legend>
        </fieldset)
    </form>`) //make variable formMaker by accessing the quesNumber and using the associated question

    let fieldSelector = $(formMaker).find('fieldset');
    //make variable fieldSelector by running formMaker and finding the fieldset portion -->the question 

    STORE[quesNumber].answers.forEach(function (answerValue, answerIndex) {
        $(`<label class="sizeMe" for="${answerIndex}">
            <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name ="answer" required>
            <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
        }); //goes to each answer in the question and applies radio type to it with the index as the order respective string value, then adds to the the end of the fieldselector variable (behind formMaker)

        $(`<button class="submitAns">Submit Answer</button>`).appendTo(fieldSelector); //creates a submit button and adds it under the answers on the fieldSelector variable
        return formMaker //return updated formMaker variable (allows it to change depending on quesNumber)

}

function correctAns() {
    $('.ansBox').prepend(
        `<h2>Great job! You are correct</h2> 
        <p class = "sizeMe">${STORE[quesNumber].correctAnswer}</p>
        <p class = "sizeMe">Want to try the next one?</p>
        <button class="newQues">Next Question</button>`);
    plusScoreNum();
};

function wrongAns() {
    $('.ansBox').prepend(
        `<h2> Oh, close but not quite!</h2>
        <p class="sizeMe">${STORE[quesNumber].correctAnswer} is actually the right answer.</p>
        <p class ="sizeMe"> Let's try again! </p>
        <button class = "newQues"> Next Question</button>`
    );
};

//makes next question
function nextQues() {
    $('.quizPortion').on('click', '.newQues', function () {
        if (quesNumber + 1 < STORE.length) {
            $('.ansBox').hide();
            $('.quesBox').show();
            makeQues(quesNumber);
            // return makeQues(quesNumber);  
        } else {
            $('.quesBox').hide();
            $('.ansBox').hide();
            $('.redoBox').show();
            finalScore();
            $('.quesNumber').text(5);
        }
    });
}

//need to prep page for actions
function overallFun() {
    startQuiz();
    checkQues();
    nextQues();
    makeQues();
};

$(overallFun);