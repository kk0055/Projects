const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById('loader');
const correctAnser = document.getElementById('correctAnser');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];
//questions.jsonからfetch
 fetch('https://opentdb.com/api.php?amount=50&category=18&difficulty=medium&type=multiple')
 .then((res) => {
  return res.json();
})
.then((loadedQuestions) => {
  //loadedQuestions.resultsをloadedQuestionでまわす
    questions = loadedQuestions.results.map((loadedQuestion) => {

      //formattedQuestion
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

    
      //answerChoices
      const answerChoices  = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() *4) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1, 
        0,
        loadedQuestion.correct_answer
      );
      // console.log(answerChoices)
      answerChoices.forEach((choice, index) => {
        formattedQuestion['choice' + (index + 1)] = choice;
      });
      return formattedQuestion;
    });
   startGame();
   
  })
  .catch((err) => {
    console.error(err);
});

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
  game.classList.remove('hidden');
  loader.classList.add('hidden');
 
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //localStorageに保存
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
   
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    correctAnser.innerText = currentQuestion.answer
    console.log(currentQuestion)     
    selectedChoice.parentElement.classList.add(classToApply);
    
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      correctAnser.innerText = '' 
      getNewQuestion();
    }, 2000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

