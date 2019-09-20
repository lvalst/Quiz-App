//question database. change questions so better for potential employers, not just thinkful/school
const STORE = [
    {
        question: 'What... is your name?',
        answers: [
            'My name is Lancelittle of Cameltoes’—wait, no!',
            'My name is Sir Lancelot of Camelot.',
            'Nothing here makes sense, I don’t know!',
            'My name…. uh, what?'
        ],
        correctAnswer:
            'My name is Sir Lancelot of Camelot.',
        correctAnswerImage:
            'Lancelot wrong.png'
    },
    {
        question:
            'What... is your quest?',
        answers: [
            'To seek the Holy Grail.',
            'To find the Mediocre Cup- wait, that can’t be right.',
            'To find more coconuts, I seem to have lost my horse. Have you seen it?',
            'Can you use that in a sentence, please?'

        ],
        correctAnswer:
            'To seek the Holy Grail.'
    },
    {
        question:
            'What... is your favorite color?',
        answers: [
            'Orange maybe? Or Green!',
            'Blue.',
            'Why do you want to know?',
            'Is rampage a color?'

        ],
        correctAnswer: 'Blue.'
    },


    {
        question: 'What... is your name?',
        answers: [
            'The tamarin monkey',
            'The brass monkey (that funky monkey)',
            'The baboon monkey',
            'The capuchin monkey'
        ],
        correctAnswer: 'The capuchin monkey'
    },
    {
        question:
            'What... is your quest',
        answers: [
            'Show honor to their elders, respect for alpha males, and to prepare for the heat of summer',
            'Get rid of bugs and dirt cause all that stuff is yucky!',
            'Communicate, form social hierarchies, and strengthen family and friendship bonds',
            'Find a quick source of sustenance and show interest in mating'
        ],
        correctAnswer:
            'Communicate, form social hierarchies, and strengthen family and friendship bonds'
    },
    {
        question: 'What... is the capital of Assyria?:',
        answers: [
            'The world’s fastest monkey',
            'The world’s smallest monkey',
            'The galaxy’s most fashionable living being. Period.',
            'Allergic to bananas'
        ],
        correctAnswer: 'The world’s smallest monkey'
    }, ,
    {
        question:
            'What... is your name?',
        answers: [
            'New World monkeys build houses out of mud — Old World monkeys live in caves',
            'New World monkeys gonna’ love you long time — Old World monkeys would do anything for love (but they won’t do that…)',
            'New World monkeys have backward, non opposable thumbs — Old World monkeys have two opposable thumbs on each hand and foot',
            'New World monkeys have 36 teeth — Old World monkeys have 32 teeth'
        ],
        correctAnswer:
            'New World monkeys have 36 teeth — Old World monkeys have 32 teeth'
    },
    {
        question: 'What... is your quest',
        answers: [
            'Is the strongest New World monkey and can lift up to ten times his own weight',
            'Has the loudest call of any primate and is one of the loudest animals in the world',
            'Sleeps in the blood of its enemies',
            'Has the most beautiful singing voice that one might never hear'
        ],
        correctAnswer:
            'Has the loudest call of any primate and is one of the loudest animals in the world'
    },
    {
        question: 'What... is your favorite color?',
        answers: [
            'Mountain caves',
            'Country farmlands',
            'Tropical forests',
            'Bustling cities'
        ],
        correctAnswer: 'Tropical forests'
    },
    {
        question:
            'Hee hee heh. Stop! What... is your name?',
        answers: [
            'They tie a spool of thread to the first tree they climb and let it unravel as they go',
            'They spread urine on their hands and feet',
            'They drop pieces of candy after every couple of yards',
            'They record their travel path using GPS location through a “running app” on their cell phones'
        ],
        correctAnswer: 'They spread urine on their hands and feet'
    },
    {
        question:
            'What... is your quest',
        answers: [
            'They tie a spool of thread to the first tree they climb and let it unravel as they go',
            'They spread urine on their hands and feet',
            'They drop pieces of candy after every couple of yards',
            'They record their travel path using GPS location through a “running app” on their cell phones'
        ],
        correctAnswer: 'They spread urine on their hands and feet'
    },
    {
        question:
            'What... is the air-speed velocity of an unladen swallow?',
        answers: [
            'What sort of question is that, you mad cow?',
            'What do you mean? An African or European swallow?',
            'Why would I know that?',
            'What’s the formula for velocity again?'

        ],
        correctAnswer: 'They spread urine on their hands and feet'
    }
    ];

//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//template to generate each question
function generateQuestion() {
    if (questionNumber < STORE.length) {
        return createThing(questionNumber);
    } else {
        $('.questionBox').hide();
        finalScore();
        $('.questionNumber').text(12);
    }
}


//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
    score++;
    $('.score').text(score);
}

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
}

//begins the quiz
function startQuiz() {
    $('.altBox').hide();
    $('.startQuiz').on('click', '.startButton', function (event) {
        $('.startQuiz').hide();
        $('.questionNumber').text(1);
        $('.questionBox').show();
        $('.questionBox').prepend(generateQuestion());
    });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
    $('.tryAgain').on('submit', function (event) {
        event.preventDefault();
        $('.altBox').hide();
        $('.response').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNumber].correctAnswer;
        if (answer === correct) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    });
}

//creates html for question form
function createThing(questionIndex) {
    let formMaker = $(`<form>
      <fieldset>
        <legend class="questionText">${STORE[questionIndex].question}</legend>
      </fieldset>
    </form>`)

    let fieldSelector = $(formMaker).find('fieldset');

    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
        $(`<label class="sizeMe" for="${answerIndex}">
          <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
          <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
    return formMaker;
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
    $('.response').html(
        `<h3>Hmmm...correct.</h3>
      <img src="Images/Lancelot right.png" alt="Still focused on the prize" class="images" width="200px">
        <button type="button" class="nextButton button">Next!</button>`
    );
    updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
    $('.response').html(
        `<h3>Wrong, hahaha!</h3>
      <img src="Images/Lancelot wrong.jpg" alt="falling dummy" class="images" width="300px">
      <p class="sizeMe">You should have said:</p>
      <p class="sizeMe">"${STORE[questionNumber].correctAnswer}"</p>
      <button type="button" class="nextButton button">Continue?</button>`
    );
}

//generates the next question
function nextQuestion() {
    $('.tryAgain').on('click', '.nextButton', function (event) {
        $('.altBox').hide();
        $('.questionBox').show();
        updateQuestionNumber();
        $('.questionBox form').replaceWith(generateQuestion());
    });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
    $('.final').show();

    const great = [
        'Great job!',
        'images/win.jpg',
        'cheering monkey',
        'You sure know a lot about monkeys!'
    ];

    const good = [
        'Good, not great.',
        'images/read.jpg',
        'monkey reading a book',
        'You should keep studying about monkeys...'
    ];

    const bad = [
        'Do you even know what monkeys look like?',
        'images/end.png',
        'cat in a monkey costume',
        'Or are you more of a cat person?'
    ];

    if (score >= 8) {
        array = great;
    } else if (score < 8 && score >= 5) {
        array = good;
    } else {
        array = bad;
    }
    return $('.final').html(
        `<h3>${array[0]}</h3>
        <img src="${array[1]}" alt="${array[2]}" class="images">
          <h3>Your score is ${score} / 12</h3>
          <p class="sizeMe">${array[3]}</p>
          <button type="submit" class="restartButton button">Restart</button>`
    );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
    $('.tryagain').on('click', '.restartButton', function (event) {
        event.preventDefault();
        resetStats();
        $('.altBox').hide();
        $('.startQuiz').show();
    });
}

//runs the functions
function makeQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}

$(makeQuiz);