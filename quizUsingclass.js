const quizSet = require("./quizKey.json");
let { stdin, stdout } = process;
stdin.setEncoding("utf8");

class Quiz {
  constructor(quizSetKey) {
    this.quizKey = quizSetKey;
    this.questionNumber = 0;
    this.score = 0;
  }
  get currentQuestion() {
    this.questionNumber++;
    return this.quizKey[this.questionNumber - 1]["question"];
  }
  isCorrectAnswer(usrAnswer) {
    return this.quizKey[this.questionNumber - 1]["answer"] === usrAnswer;
  }
  startQuiz() {
    console.log(this.currentQuestion);
    stdin.on("data", data => {
      if (this.isCorrectAnswer(data.trim())) this.score++;
      console.log(this.currentQuestion);
    });
  }
}

const main = function() {
  const quiz = new Quiz(quizSet);
  quiz.startQuiz();
  process.on("uncaughtException", () => {
    console.log(`\nYour total score is : ${quiz.score}`);
    process.exit(0);
  });
};

main();
