let timer;
let timeLeft = 60; //  minutes in seconds
let quizScore = 0;

  //questions
const quizData = [
  {
    question: "She ___ her homework before dinner.",
    options: {
      a: "has finished",
      b: "is finishing",
      c: "finished",
      d: "will finish"
    },
    correctAnswer: "a",
    explanation: "Present perfect tense is used for an action completed before now but related to the present."
  },
  {
    question: "I ___ to the market every Saturday.",
    options: {
      a: "was going",
      b: "go",
      c: "will go",
      d: "have gone"
    },
    correctAnswer: "b",
    explanation: " It’s a regular habit, so simple present tense is used."
  },
  {
    question: "They ___ football when it started to rain.",
    options: {
      a: "had played",
      b: "play",
      c: "were playing",
      d: "will be playing"
    },
    correctAnswer: "c",
    explanation: " Past continuous tense fits because the action was ongoing."
  },
  {
    question: "By next week, she ___ her exams.",
    options: {
      a: "has written",
      b: "will have written",
      c: "wrote",
      d: "writes"
    },
    correctAnswer: "b",
    explanation: "Future perfect tense shows an action that will be completed before a certain time."
  },
  {
    question: "The baby ___ all night.",
    options: {
      a: "cries",
      b: "cried",
      c: "is crying",
      d: "had cried"
    },
    correctAnswer: "b",
    explanation: "Simple past tense is best for an action that occurred in the past."
  },
  {
    question: "He usually ___ to school by 8 a.m.",
    options: {
      a: "is going",
      b: "goes",
      c: "went",
      d: "will go"
    },
    correctAnswer: "b",
    explanation: "Simple present tense describes a routine."
  },
  {
    question: " I ___ my book when the light went out.",
    options: {
      a: "had been reading",
      b: "read",
      c: "reads",
      d: "have read"
    },
    correctAnswer: "a",
    explanation: "Past perfect continuous fits for an action ongoing before another past event."
  },
  {
    question: "She ___ her lunch before the bell rang.",
    options: {
      a: "had eaten",
      b: "eats",
      c: "will eat",
      d: "is eating"
    },
    correctAnswer: "a",
    explanation: "Past perfect shows action completed before another past event."
  },
  {
    question: "We ___ this road tomorrow",
    options: {
      a: "will be taking",
      b: "have taken",
      c: "took",
      d: "take"
    },
    correctAnswer: "a",
    explanation: "Future continuous for an action that will be happening at a certain time in the future."
  },
  {
    question: "I ___ my assignment already.",
    options: {
      a: "did",
      b: "will do",
      c: "have done",
      d: "doing"
    },
    correctAnswer: "c",
    explanation: "Present perfect shows the task has already been completed."
  },
 ];
// Function to generate the quiz dynamically from quizData
function generateQuiz() {
  const form = document.getElementById('quiz-form');
  quizData.forEach((item, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('quiz-question');
    questionDiv.innerHTML = `
      <label>${index + 1}. ${item.question}</label>
      ${Object.keys(item.options).map(option => `
        <input type="radio" name="q${index + 1}" value="${option}"> ${item.options[option]}<br>
      `).join('')}
    `;
    form.appendChild(questionDiv);
  });
}

// Check if quiz is already taken
if (localStorage.getItem('quiz-taken') === 'false') {
  document.getElementById('quiz-taken-message').style.display = 'block'; // Show message
  document.getElementById('quiz-section').style.display = 'none'; // Hide quiz section
  document.getElementById('quiz-summary').style.display = 'block'; // Show best score
} else {
  document.getElementById('timer').style.display = 'block'; // Show timer
  startTimer(); // Start the timer if quiz is not yet taken
  generateQuiz(); // Generate the quiz dynamically
}

// Start the timer
function startTimer() {
  timer = setInterval(function() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time-left').textContent = `${pad(minutes)}:${pad(seconds)}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      submitQuiz(); // Automatically submit when time runs out
    }
  }, 1000);
}

function pad(num) {
  return num < 10 ? '0' + num : num;
}

function submitQuiz() {
  clearInterval(timer); // Stop the timer when the quiz is submitted

  const form = document.getElementById('quiz-form');
  const answers = new FormData(form);
  let correctionsHtml = '';
  quizScore = 0;

  // Check each question and give feedback
  quizData.forEach((item, index) => {
    const userAnswer = answers.get(`q${index + 1}`);
    if (userAnswer === item.correctAnswer) {
      quizScore++;
    } else if (userAnswer == undefined) {
        correctionsHtml += `
        <p class="wrong-answer">
          Question ${index + 1}:" The correct answer is <p class="correct-answer">"${item.options[item.correctAnswer]}"</p>.
        </p>
        <p class="explanation">${item.explanation}</p>
      `;        
    } else {
      correctionsHtml += `
        <p class="wrong-answer">'
        Question ${index + 1}: Your answer was "${item.options[userAnswer]} ". The correct answer is <p class="correct-answer"> "${item.options[item.correctAnswer]}" </p>.
        </p>
        <p class="explanation">${item.explanation}</p>
      `;
    }
  });

  // Show final score
  document.getElementById('final-score-message').textContent = `You scored ${quizScore} out of ${quizData.length}.`;

  // Store the score and quiz taken status in localStorage
  localStorage.setItem('quiz-taken', 'true');
  localStorage.setItem('quiz-score', quizScore);

  document.getElementById('quiz-section').style.display = 'none'; // Hide quiz section
  document.getElementById('quiz-summary').style.display = 'block'; // Hide best score

  // Show final results and corrections
  document.getElementById('corrections').innerHTML = correctionsHtml; // Show corrections
  document.getElementById('final-results').style.display = 'block'; // Show final results screen
}

function continueLearning() {
  // Redirect to another page or section for further learning
//   window.location.href = ''; // You can replace this with the URL of the learning resources page
}