const question = [
  // Array of question objects
  {
    question: "Which is largest animal in the world?",
    answer: [
      { text: "shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "What is the capital city of France?",
    answer: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answer: [
      { text: "Charles Dickens", correct: false },
      { text: "Leo Tolstoy", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for water?",
    answer: [
      { text: "O2", correct: false },
      { text: "CO2", correct: false },
      { text: "H2O", correct: true },
      { text: "HO2", correct: false },
    ],
  },
  {
    question: "Which continent is the Sahara Desert located on?",
    answer: [
      { text: "Asia", correct: false },
      { text: "Africa", correct: true },
      { text: "Australia", correct: false },
      { text: "South America", correct: false },
    ],
  },
];

// Get HTML elements for question, answer buttons, and next button
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0; // Index of the current question
let score = 0; // User's score

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0; // Reset to first question
  score = 0; // Reset score
  nextButton.innerHTML = "Next"; // Set text for the next button
  nextButton.style.display = "none"; // Hide the next button initially
  showQuestion(); // Show the first question
}

// Function to display the current question
function showQuestion() {
  nextButton.style.display = "none"; // Hide the next button
  let currentQuestion = question[currentQuestionIndex]; // Get the current question object
  let questionNo = currentQuestionIndex + 1; // Get the question number

  // Display the current question text
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  answerButton.innerHTML = ""; // Clear previous answer buttons

  // Create buttons for each answer option
  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text; // Set button text
    button.classList.add("btn"); // Add CSS class for styling
    button.addEventListener("click", () => selectAnswer(button, answer)); // Add event listener for answer selection
    answerButton.appendChild(button); // Add button to the answer buttons container
  });
}

// Function to handle answer selection
function selectAnswer(button, answer) {
  const buttons = answerButton.getElementsByTagName("button"); // Get all answer buttons
  for (let btn of buttons) {
    btn.classList.add("disabled"); // Disable all buttons
    btn.disabled = true; // Make all buttons non-clickable
  }
  button.classList.add("selected"); // Highlight the selected button
  if (answer.correct) {
    score++; // Increment score if the selected answer is correct
  }
  nextButton.style.display = "block"; // Show the next button
}

// Function to handle the Next button click event
function handleNextButton() {
  currentQuestionIndex++; // Move to the next question
  if (currentQuestionIndex < question.length) {
    showQuestion(); // Show the next question if available
  } else {
    showScore(); // Show the final score if all questions are answered
  }
}

// Function to display the final score
function showScore() {
  questionElement.innerHTML = `You scored ${score} out of ${question.length}!`; // Display the score
  nextButton.innerHTML = "Restart"; // Change button text to "Restart"
  nextButton.style.display = "block"; // Show the button
  nextButton.removeEventListener("click", handleNextButton); // Remove current event listener
  nextButton.addEventListener("click", startQuiz); // Add event listener to restart the quiz
}

// Add event listener to the Next button to handle the next question
nextButton.addEventListener("click", handleNextButton);

// Start the quiz when the script is loaded
startQuiz();
