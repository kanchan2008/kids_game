const hourHand = document.querySelector("#hour-hand");
const minuteHand = document.querySelector("#minute-hand");
const choicesElement = document.querySelector("#choices");
const feedbackElement = document.querySelector("#feedback");
const correctCountElement = document.querySelector("#correct-count");
const wrongCountElement = document.querySelector("#wrong-count");
const newQuestionButton = document.querySelector("#new-question");

const minuteChoices = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
let currentTime = { hour: 12, minute: 0 };
let correctCount = 0;
let wrongCount = 0;

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatTime({ hour, minute }) {
  return `${hour}:${String(minute).padStart(2, "0")}`;
}

function setFeedback(message, type = "") {
  feedbackElement.textContent = message;
  feedbackElement.className = `feedback ${type}`.trim();
}

function rotateClockHands({ hour, minute }) {
  const hourDegrees = (hour % 12) * 30 + minute * 0.5;
  const minuteDegrees = minute * 6;

  hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
}

function makeWrongTime(correctTime, usedAnswers) {
  let wrongTime;

  do {
    wrongTime = {
      hour: Math.floor(Math.random() * 12) + 1,
      minute: randomItem(minuteChoices),
    };
  } while (
    formatTime(wrongTime) === formatTime(correctTime) ||
    usedAnswers.has(formatTime(wrongTime))
  );

  usedAnswers.add(formatTime(wrongTime));
  return wrongTime;
}

function buildChoices(correctTime) {
  const usedAnswers = new Set([formatTime(correctTime)]);
  const choices = [correctTime];

  while (choices.length < 4) {
    choices.push(makeWrongTime(correctTime, usedAnswers));
  }

  return choices.sort(() => Math.random() - 0.5);
}

function renderChoices(choices) {
  choicesElement.innerHTML = "";

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = formatTime(choice);
    button.addEventListener("click", () => checkAnswer(choice));
    choicesElement.append(button);
  });
}

function createQuestion(message = "New clock! You can do it!") {
  currentTime = {
    hour: Math.floor(Math.random() * 12) + 1,
    minute: randomItem(minuteChoices),
  };

  rotateClockHands(currentTime);
  renderChoices(buildChoices(currentTime));
  setFeedback(message);
}

function checkAnswer(selectedTime) {
  const selectedAnswer = formatTime(selectedTime);
  const correctAnswer = formatTime(currentTime);

  if (selectedAnswer === correctAnswer) {
    correctCount += 1;
    correctCountElement.textContent = correctCount;
    createQuestion(`Super clock reading! ${correctAnswer} is correct. Try the next one!`);
    feedbackElement.classList.add("correct");
    return;
  }

  wrongCount += 1;
  wrongCountElement.textContent = wrongCount;
  createQuestion(`Good try! The clock said ${correctAnswer}. Here comes another clock!`);
  feedbackElement.classList.add("wrong");
}

newQuestionButton.addEventListener("click", () => createQuestion("Fresh clock! Have fun!"));

createQuestion("Ready? Pick the time you see!");
