//question database
const STORE = [
  {
    question: 'How does the male Capuchin monkey attract a female partner?',
    answers: [
      'He hangs upside-down from a high tree branch and bellows loudly',
      'He gathers ripe fruit into a pile and repeatedly throws it up in the air while rapidly screeching',
      'He urinates in his hands and rubs it thoroughly into his fur',
      'He cruises around in the coolest looking car made from coconuts, bamboo, and greenery'
    ],
    correctAnswer:
      'He urinates in his hands and rubs it thoroughly into his fur'
  },
  {
    question:
      'What makes the female spider monkey different from all other primates?',
    answers: [
      'She has the meanest dance moves, often being cited as the inspiration to such dancers as Michael Jackson, Shakira, and even Justin Timberlake',
      'She has the longest tail, reaching up to three feet in length',
      'She has seven (and sometimes even eight) different colors on her face',
      'She eats the second born baby when she gives birth to twins'
    ],
    correctAnswer:
      'She has the longest tail, reaching up to three feet in length'
  },
  {
    question:
      'Out of all the New World monkeys, the owl monkey is the only one to:',
    answers: [
      'Stay up all night, having a nocturnal sleep schedule',
      'Consistently hoot as a mating call',
      'Have the ability to turn its head all the way around',
      'Throw the wildest and loudest parties'
    ],
    correctAnswer: 'Stay up all night, having a nocturnal sleep schedule'
  },
  {
    question: 'Which New World monkey is the most intelligent?',
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
      'Picking out parasites and dirts from each others’ furs is a way for monkeys to:',
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
    question: 'The pygmy marmoset is:',
    answers: [
      'The world’s fastest monkey',
      'The world’s smallest monkey',
      'The galaxy’s most fashionable living being. Period.',
      'Allergic to bananas'
    ],
    correctAnswer: 'The world’s smallest monkey'
  },
  {
    question:
      'What is a prominent difference between Old and New World monkeys?',
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
    question: 'The male howler monkey:',
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
    question: 'What type of environments do New World monkeys live in?',
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
      'How do squirrel monkeys mark their path when they are moving through the treetops?',
    answers: [
      'They tie a spool of thread to the first tree they climb and let it unravel as they go',
      'They spread urine on their hands and feet',
      'They drop pieces of candy after every couple of yards',
      'They record their travel path using GPS location through a “running app” on their cell phones'
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
    $('.questionNumber').text(10);
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
  $('.jungleBox').on('submit', function (event) {
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
    `<h3>Your answer is correct!</h3>
    <img src="images/correct.jpg" alt="monkey wearing glasses" class="images" width="200px">
      <p class="sizeMe">You're a smart monkey!</p>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>That's the wrong answer...</h3>
    <img src="images/wrong.jpg" alt="dissapointed monkey face" class="images" width="200px">
    <p class="sizeMe">It's actually:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.jungleBox').on('click', '.nextButton', function (event) {
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
        <h3>Your score is ${score} / 10</h3>
        <p class="sizeMe">${array[3]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.jungleBox').on('click', '.restartButton', function (event) {
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
