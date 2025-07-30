let questions = [
  {
    question: "Who invented HTML?",
    answer_1: "Robbie Williams",
    answer_2: "Lady Gaga",
    answer_3: "Tim Berners-Lee",
    answer_4: "Justin Bieber",
    right_answer: 3,
  },
  {
    question: "Which programming language is used to control the behavior of a website?",
    answer_1: "HTML",
    answer_2: "CSS",
    answer_3: "JavaScript",
    answer_4: "Python",
    right_answer: 3,
  },
  {
    question: "Which method is used to select an element in JavaScript?",
    answer_1: "document.getElementByID()",
    answer_2: "document.find()",
    answer_3: "document.select()",
    answer_4: "document.getElementById()",
    right_answer: 4,
  },
  {
    question: "Which kind of loop is used in JavaScript to iterate over objects?",
    answer_1: "for",
    answer_2: "while",
    answer_3: "foreach",
    answer_4: "objectloop",
    right_answer: 3,
  },
  {
    question: "Which function is used to write a message to the browser console?",
    answer_1: "console.log()",
    answer_2: "print()",
    answer_3: "console.write()",
    answer_4: "log()",
    right_answer: 1,
  },
];

let currentQuestion = 0;
let points = 0;
let flag = 0;
let progressInPercent = 0;
let AUDIO_SUCCESS = new Audio();

function init() {
  document.getElementById("totalquestionnumber").innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  let question = questions[currentQuestion];
  if (currentQuestion == questions.length - 1) {
    document.getElementById("next-question").innerHTML = "Result";
  }
  setQuestionNumber();
  document.getElementById("question").innerHTML = question["question"];
  for (let i = 1; i < 5; i++) {
    document.getElementById("answer_" + i).innerHTML = question["answer_" + i];
  }
  progress();
}

function answer(selection) {
  if (flag == 0) {
    let numberOfAnswer = selection.slice(-1);
    for (let i = 1; i < 5; i++) {
      document
        .getElementById("answer_" + i)
        .parentNode.classList.remove("bg-success");
      document
        .getElementById("answer_" + i)
        .parentNode.classList.remove("bg-danger");
    }
    let correctAnswer = questions[currentQuestion];
    if (numberOfAnswer == correctAnswer["right_answer"]) {
      document
        .getElementById("answer_" + numberOfAnswer)
        .parentNode.classList.add("bg-success");
      AUDIO_SUCCESS.play();
      points++;
    } else {
      document
        .getElementById("answer_" + numberOfAnswer)
        .parentNode.classList.add("bg-danger");
      document
        .getElementById("answer_" + correctAnswer["right_answer"])
        .parentNode.classList.add("bg-success");
    }
    document.getElementById("next-question").disabled = false;
    flag = 1;
  }
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    document.getElementById("next-question").disabled = true;
    flag = 0;
    resetAnswerBtn();
    showQuestion();
  } else {
    currentQuestion++;
    progress();
    document.getElementById("card-body").style = "display:none;";
    document.getElementById("end-screen").style = "";
    document.getElementById(
      "end-screen"
    ).innerHTML = `<div>You scored ${points} out of ${questions.length} points.</div>
      <button class="btn btn-primary" id="reset" onclick="reset()">Play Again</button>`;
  }
}

function resetAnswerBtn() {
  for (let i = 1; i < 5; i++) {
    document
      .getElementById("answer_" + i)
      .parentNode.classList.remove("bg-success");
    document
      .getElementById("answer_" + i)
      .parentNode.classList.remove("bg-danger");
  }
}

function setQuestionNumber() {
  document.getElementById("activequestionnumber").innerHTML = currentQuestion + 1;
}

function progress() {
  progressInPercent = (currentQuestion / questions.length) * 100;
  document.getElementById("bar").innerHTML = `${progressInPercent}%`;
  document.getElementById("bar").style = `width: ${progressInPercent}%`;
}

function reset() {
  currentQuestion = 0;
  points = 0;
  flag = 0;
  progressInPercent = 0;
  document.getElementById("card-body").style = "";
  document.getElementById("end-screen").style = "display:none;";
  showQuestion();
  resetAnswerBtn();
  document.getElementById("next-question").disabled = true;
  document.getElementById("next-question").innerHTML = "Next Question";
}
