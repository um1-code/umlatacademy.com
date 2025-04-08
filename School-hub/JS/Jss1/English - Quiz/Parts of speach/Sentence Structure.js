let timer;
let timeLeft = 60; //  minutes in seconds
let quizScore = 0;

  //questions
const quizData = [
  {
    question: "Which of the following is a complete sentence?",
    options: {
      a: "Running through the field.",
      b: "Ate the rice and beans.",
      c: "The boy kicked the ball.",
      d: "After school yesterday."
    },
    correctAnswer: "c",
    explanation: "It has a subject (The boy) and a predicate (kicked the ball)."
  },
  {
    question: "A sentence must have at least a:",
    options: {
      a: "Verb and adjective",
      b: "Subject and verb",
      c: "Noun and pronoun",
      d: "Verb and adverb"
    },
    correctAnswer: "b",
    explanation: "A complete sentence needs a subject and a verb."
  },
  {
    question: " Which of these is a simple sentence?",
    options: {
      a: " I went to school and I saw my friend.",
      b: " The teacher entered while we were writing.",
      c: "The sun sets in the west.",
      d: " If you come early, we can go together."
    },
    correctAnswer: "c",
    explanation: "A simple sentence has one independent clause ."
  },
  {
    question: "Identify the compound sentence below:",
    options: {
      a: "Because it rained, we stayed indoors.",
      b: "We stayed indoors when it rained.",
      c: "It rained, so we stayed indoors.",
      d: "When it rained, we stayed indoors."
    },
    correctAnswer: "c",
    explanation: "Two independent clauses joined by a coordinating conjunction (so)."
  },
  {
    question: "Which of these is a complex sentence?",
    options: {
      a: "The bell rang.",
      b: "The teacher came and we stood up.",
      c: "I was late because I missed the bus.",
      d: " I like mangoes and oranges."
    },
    correctAnswer: "c",
    explanation: "One independent clause (I was late) + one dependent clause (because I missed the bus)."
  },
  {
    question: "Although she was tired, she finished her homework.” What type of sentence is this?",
    options: {
      a: "Simple",
      b: "Compound",
      c: "Complex",
      d: "Fragment"
    },
    correctAnswer: "c",
    explanation: "It's a complex sentence – has a subordinating conjunction (Although)."
  },
  {
    question: "What is the subject in the sentence: “The cat chased the rat.”",
    options: {
      a: "Chased",
      b: "The rat",
      c: "The cat",
      d: "Cat chased"
    },
    correctAnswer: "c",
    explanation: "The cat is who/what the sentence is about."
  },
  {
    question: "Identify the predicate in this sentence: “My sister sings beautifully.”",
    options: {
      a: "My sister",
      b: "Sings",
      c: "Beautifully",
      d: "Sings beautifully"
    },
    correctAnswer: "d",
    explanation: "Predicate is the part that tells what the subject does."
  },
  {
    question: "Which sentence is a sentence fragment?",
    options: {
      a: "The children are playing in the garden.",
      b: "Playing in the garden.",
      c: "They play every evening.",
      d: "The children laughed and ran."
    },
    correctAnswer: "b",
    explanation: "Playing in the garden is incomplete—no subject."
  },
  {
    question: "What kind of sentence is this: “Come here now!”",
    options: {
      a: "Declarative",
      b: "Interrogative",
      c: "Exclamatory",
      d: "Imperative"
    },
    correctAnswer: "d",
    explanation: "It's a command—imperative sentence."
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



