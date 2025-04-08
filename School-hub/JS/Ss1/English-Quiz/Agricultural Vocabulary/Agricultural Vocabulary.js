let timer;
let timeLeft = 5; // 2 minutes in seconds
let quizScore = 0;

// Quiz data structure: each question has options, correct answer, and explanation
const quizData = [
  {
    question: "What is the correct part of speech for 'quickly'?",
    options: {
      a: "Noun",
      b: "Verb",
      c: "Adverb"
    },
    correctAnswer: "c",
    explanation: "Quickly is an adverb because it describes how something is done. Adverbs often end in -ly."
  },
  {
    question: "Which one is a conjunction?",
    options: {
      a: "And",
      b: "Cat",
      c: "Blue"
    },
    correctAnswer: "a",
    explanation: "And is a conjunction because it connects words or phrases. Conjunctions are used to link parts of a sentence."
  }
  // Add more questions here as needed
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
          Question ${index + 1}:" The correct answer is "${item.options[item.correctAnswer]}".
        </p>
        <p class="explanation">${item.explanation}</p>
      `;        
    } else {
      correctionsHtml += `
        <p class="wrong-answer">
          Question ${index + 1}: Your answer was "${item.options[userAnswer]}". The correct answer is "${item.options[item.correctAnswer]}".
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
  document.getElementById('quiz-summary').style.display = 'none'; // Hide best score

  // Show final results and corrections
  document.getElementById('corrections').innerHTML = correctionsHtml; // Show corrections
  document.getElementById('final-results').style.display = 'block'; // Show final results screen
}

function continueLearning() {
  // Redirect to another page or section for further learning
  window.location.href = 'learn-more.html'; // You can replace this with the URL of the learning resources page
}



