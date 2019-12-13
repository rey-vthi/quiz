const quizSet = require("./quizKey.json");
let { stdin, stdout } = process;
let scores = 0;
stdin.setEncoding("utf8");
const displayQuestionWithTimer = function(questionKey) {
  stdin.write(`\n${questionKey.question}\n`);
  return createTimer();
};

const createTimer = function() {
  return setTimeout(() => {
    stdout.write("TIME UP\n");
  }, 15000);
};

const isCorrectAnswer = function(actual, expected) {
  return actual === expected.answer;
};

const displayResult = function(answer, currentSet) {
  let msg = "sorry !!!! CORRECT answer is: " + currentSet.answer;
  if (isCorrectAnswer(answer, currentSet)) {
    scores++;
    msg = "your answer is correct\nyour score:" + scores;
  }
  stdin.write(`${msg}\n`);
};

const main = function() {
  let questionCount = 0;
  let timeOutId = displayQuestionWithTimer(quizSet[0]);
  stdin.on("data", data => {
    if (data) displayResult(data.trim(), quizSet[questionCount]);
    clearTimeout(timeOutId);
    questionCount++;
    displayQuestionWithTimer(quizSet[questionCount]);
  });
};

process.on("uncaughtException", () => {
  stdout.write(`\nYOUR TOTAL SCORE : ${scores}`);
  process.exit(0);
});

main();
