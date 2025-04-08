let timer;
let timeLeft = 60; //  minutes in seconds
let quizScore = 0;

  //questions
const quizData = [
  {
    question: "Which of the following sentences is correctly punctuated?",
    options: {
      a: "I bought oranges mangoes bananas and pineapples.",
      b: "I bought oranges, mangoes, bananas and pineapples.",
      c: "I bought, oranges, mangoes, bananas, and pineapples.",
      d: "I bought oranges mangoes, bananas and pineapples."
    },
    correctAnswer: "c",
    explanation: "Commas are used to separate items in a list."
  },
  {
    question: "The punctuation mark used to show possession is the:",
    options: {
        a: "Colon",
        b: "Apostrophe",
        c: "Comma",
        d: "Semicolon"
    },
    correctAnswer: "b",
    explanation: "Apostrophes show possession, like in tom's book."
  },
  {
    question: "Which sentence is punctuated correctly?",
    options: {
        a: " It's raining, outside.",
        b: "Its raining outside.",
        c: " It's raining outside.",
        d: " Its' raining outside."
    },
    correctAnswer: "c",
    explanation: "It's is the correct contraction for it is."
  },
  {
    question: " Which punctuation mark is used at the end of a command?",
    options: {
        a: "Question mark",
        b: "Full stop",
        c: "Exclamation mark",
        d: "Comma"
    },
    correctAnswer: "b",
    explanation: "Commands usually end with a full stop (e.g., Sit down.), unless said with strong emotion (then an exclamation mark can be used)."
  },
  {
    question: "“Don’t shout!” is an example of a sentence that ends with a(n):",
    options: {
        a: "Period",
        b: "Question mark",
        c: "Exclamation mark",
        d: "Semicolon"
    },
    correctAnswer: "c",
    explanation: "Shows strong emotion or command."
  },
  {
    question: "Which punctuation mark should be used after the word “Note” in the sentence: Note ___ you must come early tomorrow.",
    options: {
        a: ",",
        b: ".",
        c: ":",
        d: ";"
    },
    correctAnswer: "c",
    explanation: "A colon introduces an explanation or important information."
  },
  {
    question: "Which of the following shows the correct use of quotation marks?",
    options: {
        a: "“I am happy”, she said.",
        b: "I am “happy,” she said.",
        c: "“I am happy,” she said.",
        d: "I am happy, “she said.”"
    },
    correctAnswer: "c",
    explanation: "Comma goes inside the closing quotation mark before the speech tag."
  },
  {
    question: "Select the correctly punctuated sentence:",
    options: {
        a: "Paul my friend is a good footballer.",
        b: "Paul, my friend, is a good footballer.",
        c: "Paul my friend, is a good footballer.",
        d: "Paul my friend is a good, footballer."
    },
    correctAnswer: "b",
    explanation: " The phrase my friend is an appositive and should be enclosed in commas."
  },
  {
    question: "Which of the following punctuation marks is used to separate items in a list?",
    options: {
        a: "Semicolon",
        b: "Full stop",
        c: "Colon",
        d: "Comma"
    },
    correctAnswer: "d",
    explanation: "Commas are standard for separating list items."
  },
  {
    question: "Choose the correct punctuation mark to complete this sentence: “What is your name ___”",
    options: {
        a: ".",
        b: ",",
        c: "!",
        d: "?"
    },
    correctAnswer: "d",
    explanation: "It's a question, so a question mark is needed."
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



