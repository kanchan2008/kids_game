const firstNumberElement = document.querySelector("#first-number");
const secondNumberElement = document.querySelector("#second-number");
const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#answer-input");
const feedbackElement = document.querySelector("#feedback");
const scoreElement = document.querySelector("#score");
const newQuestionButton = document.querySelector("#new-question");

let firstNumber = 0;
let secondNumber = 0;
let score = 0;

function randomNumber() {
  return Math.floor(Math.random() * 11);
}

function setFeedback(message, type = "") {
  feedbackElement.textContent = message;
  feedbackElement.className = `feedback ${type}`.trim();
}

function createQuestion(message = "New question! You can do it!") {
  firstNumber = randomNumber();
  secondNumber = randomNumber();
  firstNumberElement.textContent = firstNumber;
  secondNumberElement.textContent = secondNumber;
  answerInput.value = "";
  answerInput.focus();
  setFeedback(message);
}

function checkAnswer(event) {
  event.preventDefault();

  const answer = Number(answerInput.value);
  const correctAnswer = firstNumber + secondNumber;

  if (answer === correctAnswer) {
    score += 1;
    scoreElement.textContent = score;
    createQuestion(`🎉 Great job! ${firstNumber} + ${secondNumber} = ${correctAnswer}. Here is a new one!`);
    feedbackElement.classList.add("correct");
    return;
  }

  createQuestion(`🌈 Nice try! ${firstNumber} + ${secondNumber} = ${correctAnswer}. Try the next one!`);
  feedbackElement.classList.add("wrong");
}

answerForm.addEventListener("submit", checkAnswer);
newQuestionButton.addEventListener("click", () => createQuestion("Fresh question! Have fun!"));

createQuestion("Ready? Try your first one!");
