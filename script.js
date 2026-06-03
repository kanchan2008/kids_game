const answerForm = document.querySelector("#answer-form");
const currentWordElement = document.querySelector("#current-word");
const wordClueElement = document.querySelector("#word-clue");
const feedbackElement = document.querySelector("#feedback");
const correctCountElement = document.querySelector("#correct-count");
const wrongCountElement = document.querySelector("#wrong-count");
const newWordButton = document.querySelector("#new-word");
const choiceButtons = document.querySelectorAll(".choice-button");

const words = [
  { text: "cake", type: "long", clue: "The silent e helps the a say its name." },
  { text: "bike", type: "long", clue: "The silent e helps the i say its name." },
  { text: "rope", type: "long", clue: "The silent e helps the o say its name." },
  { text: "cube", type: "long", clue: "The silent e helps the u say its name." },
  { text: "rain", type: "long", clue: "The ai team makes a long a sound." },
  { text: "team", type: "long", clue: "The ea team makes a long e sound." },
  { text: "goat", type: "long", clue: "The oa team makes a long o sound." },
  { text: "leaf", type: "long", clue: "The ea team makes a long e sound." },
  { text: "cat", type: "short", clue: "The a makes a quick short sound." },
  { text: "bed", type: "short", clue: "The e makes a quick short sound." },
  { text: "pig", type: "short", clue: "The i makes a quick short sound." },
  { text: "hop", type: "short", clue: "The o makes a quick short sound." },
  { text: "sun", type: "short", clue: "The u makes a quick short sound." },
  { text: "fish", type: "short", clue: "The i makes a quick short sound." },
  { text: "duck", type: "short", clue: "The u makes a quick short sound." },
  { text: "map", type: "short", clue: "The a makes a quick short sound." },
];

let currentWord = words[0];
let correctCount = 0;
let wrongCount = 0;
let previousWordText = "";

function getRandomWord() {
  let nextWord = words[Math.floor(Math.random() * words.length)];

  if (words.length > 1) {
    while (nextWord.text === previousWordText) {
      nextWord = words[Math.floor(Math.random() * words.length)];
    }
  }

  previousWordText = nextWord.text;
  return nextWord;
}

function setFeedback(message, type = "") {
  feedbackElement.textContent = message;
  feedbackElement.className = `feedback ${type}`.trim();
}

function setButtonsDisabled(isDisabled) {
  choiceButtons.forEach((button) => {
    button.disabled = isDisabled;
  });
}

function showWord(message = "New word! Use your vowel ears!") {
  currentWord = getRandomWord();
  currentWordElement.textContent = currentWord.text;
  wordClueElement.textContent = currentWord.clue;
  setFeedback(message);
  setButtonsDisabled(false);
}

function checkAnswer(event) {
  event.preventDefault();

  const selectedButton = event.submitter;

  if (!selectedButton || !selectedButton.value) {
    return;
  }

  const selectedAnswer = selectedButton.value;
  const isCorrect = selectedAnswer === currentWord.type;
  setButtonsDisabled(true);

  if (isCorrect) {
    correctCount += 1;
    correctCountElement.textContent = correctCount;
    setFeedback(`🎉 Correct! “${currentWord.text}” has a ${currentWord.type} vowel sound. Next word coming up!`, "correct");
  } else {
    wrongCount += 1;
    wrongCountElement.textContent = wrongCount;
    setFeedback(`🌈 Good try! “${currentWord.text}” has a ${currentWord.type} vowel sound. Let's try another!`, "wrong");
  }

  window.setTimeout(() => {
    showWord("Here is your next word. You can do it!");
  }, 1400);
}

answerForm.addEventListener("submit", checkAnswer);
newWordButton.addEventListener("click", () => showWord("Fresh word! Have fun listening for the vowel sound!"));

showWord("Ready, word explorer? Try your first one!");
