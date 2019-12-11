const STORE = [
    {//1
      question : 'How did Anton van Leeuwenhoek make an important contribution to the development of the cell theory?',
      answers : [
        'He theorized that the pattern component of the theory is that all are organisms are made of cells',
        'He theorized that the process compenent of the theory is that all cells come from pre-existing cells',
        'He invented the first microscope and saw the first cell',
        'He invented more powerful microscopes and was the first to describe the variety of existing cells'
        ],
      correctAnswer:
        'He invented more powerful microscopes and was the first to describe the variety of existing cells'
    },
    {//2
      question:
        'Which of these is not one of the five fundamental characteristics used to define life in an organism?',
      answers: [
        'Organisms may exclusively use hosts in order to reproduce and replicate',
        'Organisms are made up of membrane-bound cells, which regulate the passage of materials between the interior and exterior spaces',
        'Organisms must acquire and use energy to stay alive and reproduce',
        'Organisms are the product of evolution and a population of organisms will continue to evolve through time'
        ],
      correctAnswer:
        'Organisms may exclusively use hosts in order to reproduce and replicate'
    },
    {//3
      question:
          'What does the term "evolution" mean?',
      answers: [
        'The strongest individuals produce the most offspring',
        'The characteristics of an individual change through the course of its life, in response to natural selection',
        'The characteristics of populations change through time',
        'The characteristics of species become more complex over time'
        ],
      correctAnswer: 
        'The characteristics of populations change through time'
    },
    {//4
      question: 'What does it mean to say that a characteristic of an organism is heritable?',
      answers: [
        'The characteristic evolves',
        'The characteristic can be passed on to offspring',
        'The characteristic is advantageous to the organism',
        'The characteristic does not vary in the population'
        ],
      correctAnswer: 
        'The characteristic can be passed on to offspring'
    },
    {//5
      question:
        'In biology, to what does the term "fitness" refer?',
      answers: [
        'The degree of training and muscle mass an individual has, relative to others in the same population',
        'An individual\'s\ slimness, relative to others in the same population',
        'The longevity of a particular individual',
        'An individual\'s\ ability to survive and reproduce'
        ],
      correctAnswer:
        'An individual\'s\ ability to survive and reproduce'
    }
  ]

//what does begin button do? 
//how does button change to 'submit'
//how does it take the information from STORE and feed it to the webpage in radio format
//how does it check the submitted answer against the store answers
//how does it judge correct or not
//how does button change to continue
//how does it show score and question number each page?
//how does it show final scores and give option to restart


//base quesNumber and score in quizScores
let score = 0;
let quesNumber = 0;
//works

// //when to make new question or finish quiz
function newQues() { //same as monkey generateQuestion()
    if (quesNumber < STORE.length) { //if the quesNumber is less than number of questions in the STORE
        return makeQues(quesNumber); //run the makeQues function using that quesNumber
    } else { //if not
        $('.y').hide();
        $('.quizScores').hide();
        $('.redoBox').show();
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
    $('.score').text(score);
} //works

function resetStats() {
    score = 0;
    quesNumber = 0;
    $('.score').text(0);
    $('.quesNumber').text(0);
  }

//click the .beginQuiz button, start the quiz
function startQuiz() {
    $('.startQuiz button').on('click', function(event) {
        event.preventDefault(); //work
        $('.startQuiz').hide(); //work
        $('.quesNumber').text(1); //work
        $('.quizScores').show();//work
        $('.quesBox').show(); //work
        $('.quesBox').prepend(newQues());
    });
}

function checkQues() {
    $('.quizPortion').submit('click', function (event){
        event.preventDefault()
        $('.y').hide();
        $('.ansBox').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[quesNumber].correctAnswer;
        if (answer === correct) {
            correctAns();
        } else {
            wrongAns();
        }

    });
}

//question format using values from STORE
function makeQues(quesNumber) { //run this function based off of the quesNumber
    let formMaker = $(`<form>
        <fieldset>
            <legend class="quesText">${STORE[quesNumber].question}</legend> <br>
        </fieldset)
    </form>`) //make variable formMaker by accessing the quesNumber and using the associated question

    let fieldSelector = $(formMaker).find('fieldset');
    //make variable fieldSelector by running formMaker and finding the fieldset portion -->the question 

    STORE[quesNumber].answers.forEach(function (answerValue, answerIndex) {
        $(`<label class="sizeMe" for="${answerIndex}">
            <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required/>
            <span style="text-align:left">${answerValue}</span> <br>
        </label> 
        `).appendTo(fieldSelector);
        }); 
        //goes to each answer in the question and applies radio type to it with the index as the order respective string value, then adds all to the the end of the fieldselector variable (behind formMaker)

        $(`<button class="submitAns button">Submit Answer</button>`).appendTo(fieldSelector); //creates a submit button and adds it under the answers on the fieldSelector variable
        return formMaker //return updated formMaker variable (able to change input to .quesBox depending on quesNumber)

}
//what is shown in .ansBox if submittednswer correct
function correctAns() {
        $('.ansBox').html( //creates html in .ansBox (which disappears once replaced)
        `<h2>Great job! You are correct:</h2> 
        <h3><span>'${STORE[quesNumber].correctAnswer}'<span> is the answer!</h3>`) //confirms correct answer, highlights correct answer compared to rest of sentence
        if (quesNumber +1 < STORE.length) { //whether to show comment and newQues button or "Finish" button
            $('.ansBox').append(
            `<p>Want to try the next one?</p>
            <button class="newQues button">Next Question</button>`); 
        } else {
            $('.ansBox').append(
            `<button class="newQues button">Finish</button>`);
            }
        plusScoreNum();     
};
//what shown in .ansBox if submitted answer incorrect
function wrongAns() {
    $('.ansBox').html(
        `<h2> Oh, close but not quite:</h2>
        <h3><span>'${STORE[quesNumber].correctAnswer}',</span> is actually the right answer.</h3>`);
    if (quesNumber +1 < STORE.length) {
        $('.ansBox').append(
        `<p> Let's try again!</p>
        <button class = "newQues button"> Next Question</button>`);
    } else {
        $('.ansBox').append(
       `<button class="newQues button">Finish</button>`)
        }
};

//makes next question
function nextQues() {
    $('.quizPortion').on('click','.newQues', function (event) {
        $('.y').hide();
        $('.quesBox').show();
        plusQuesNum();
        $('.quesBox form').replaceWith(newQues());
    });
}
//tells js what to show in redoBox based on the score earned throughout quiz
function finalScore() {
    $('.redoBox').show();
    const great = [
      'Great job!',
    ];
    const good = [
      'Not too shabby...',
    ];
    const bad = [
      'Someone needs to hit those highschool textbooks again!'
    ];
    if (score === 5) {
      array = great;
    } else if (score < 5 && score >= 3) {
      array = good;
    } else {
      array = bad;
    }
    $('.redoBox').show();
    return $('.redoBox').html(
      `<h3>Completed questions <span>${quesNumber} of 5 </span>and scored<span> ${score} of 5</span>:</h3>
        <h3>${array[0]}</h3>
        <button class="restartQuiz button"><a href="index.html">Try Again?</a></button>`
    );
  }

//need to prep page for actions
function overallFun() {
    startQuiz();
    newQues();
    checkQues();
    nextQues();
};

$(overallFun);