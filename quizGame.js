const quizSet = require("./quizKey.json");
let { stdin, stdout } = process;
stdin.setEncoding("utf8");
const getQuestion = function(questionKey) {
  console.log(questionKey["question"]);
  return setTimeout(() => {
    console.log("time up");
    stdin.emit("data");
  }, 60000);
};

const isCorrectAnswer = function(actual, expected) {
  return actual === expected.answer;
};

const createEvaluator = function(questionSet, timeOutId) {
  let questionCount = 0;
  let scores = 0;
  const evaluate = function(ans) {
    questionCount++;
    const currentSet = questionSet[questionCount - 1];
    if (ans) {
      ans = ans.trim();
      if (isCorrectAnswer(ans, currentSet)) {
        scores++;
        console.log("your answer is correct\nyour score:", scores);
      } else {
        console.log("sorry !!!! CORRECT answer is: ", currentSet.answer);
      }
      clearTimeout(timeOutId);
    }
    if (questionCount < questionSet.length) {
      timeOutId = getQuestion(questionSet[questionCount]);
    } else {
      console.log("your score is ", scores);
      console.log("thanku for playing");
      process.exit();
    }
  };
  return evaluate;
};

const main = function() {
  let timeOutId = getQuestion(quizSet[0]);
  const evaluateAnswer = createEvaluator(quizSet, timeOutId);
  stdin.on("data", evaluateAnswer);
};

main();
