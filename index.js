
//object of each question, array of answers, and the index of the
//correct answer in the array
const myQuestions = [
	{question: "1. Burrata is a type of:",
	answers: ["cheese", "ice cream", "venison", "tropical fruit"],
	correctAnswer: 0},

	{question:"2. Which country is responsible for creating French fries?",
	answers: ["America", "France", "Belgium", "Canada"],
	correctAnswer: 2},

	{question:"3. What is the main ingredient in Hummus?",
	answers: ["zucchini", "chickpeas", "tofu", "eggplant"],
	correctAnswer: 1},

	{question:"4. What is the most popular pizza topping in the United States?",
	answers: ["pineapple", "pepperoni", "cheese only", "sausage"],
	correctAnswer: 1},

	{question:"5. In which year did the ice cream cone made its debut at the World's Fair in St. Louis?",
	answers: ["1904", "1890", "1945", "1926"],
	correctAnswer: 0},

	{question:"6. Watermelon is made up of ___ water?",
	answers: ["50%", "86%", "92%", "98%"],
	correctAnswer: 2},

	{question:"7. Where did the jerk seasoning style of cooking originate?",
	answers: ["India", "South Africa", "Jamaica", "Peru"],
	correctAnswer: 2},

	{question:"8. How many varieties of apples are grown throughout the world?",
	answers: ["75", "124", "803", "7500"],
	correctAnswer: 3},

	{question:"9. Which of the following is an emulsifier?",
	answers: ["honey", "egg yolk", "vinegar", "wheat gluten"],
	correctAnswer: 1}
	];


  const questionClass = $(".question");
	var CONTINUE = false;
	var CURRENT_QUESTION = 0;
	var CORRECT_ANSWER = 0;
	var CORRECT_ANSWERS = 0;


function beginQuiz() {
  $(".form, .restart, .currentScore").hide();
  $(".start").on("click", function(event) {
    $(".start, .title").hide();
    $(".form").show();
    displayCurrentQuestion();
  });
}


function displayCurrentQuestion() {
    $(".nextButton, .questionFeedback").hide();
    var question = myQuestions[CURRENT_QUESTION].question;
    var choiceList = $(document).find(".choiceList");
    var numChoices = myQuestions[CURRENT_QUESTION].answers.length;
    $(questionClass).text(question);
    $(".question").show();
    $(choiceList).find("li").remove();
    var choice;
    for (var i = 0; i < numChoices; i++) {
        choice = myQuestions[CURRENT_QUESTION].answers[i];
        $('<li><input type="radio" role="group" required="" class="autoDisplay" value=' + i + ' name="answerChoice" required/>' + choice + '</li>').appendTo(choiceList);
        $(".choiceList, .submit").show();
    }
}

function userChoice() {
  return myQuestions[CURRENT_QUESTION].CORRECT_ANSWERS;
}


function submit() {
		$(".submit").on("click", function(event) {
		  event.preventDefault();
			var userChoice = $('.choiceList').find('input[name="answerChoice"]:checked').val();
			compareAnswers(parseInt(userChoice));
			$(".submit, .question, .choiceList").hide();
			$(".questionFeedback, .nextButton").show();
			nextOrEnd();
		}
)}


//if correct +1 to the current question and correct questions, display feedback;
//if blank, return alert that they must select an answerChoice;
//otherwise- if incorrect +1 to the current questions and display feedback;
function compareAnswers(userChoice) {
  var correctAnswer = myQuestions[CURRENT_QUESTION].correctAnswer;
  if (userChoice == correctAnswer) {
    correctFeedback();
    CORRECT_ANSWERS++;
    CURRENT_QUESTION++;
  } else {
    incorrectFeedback();
    CURRENT_QUESTION++;
  }
  currentScore();
    $(".currentScore").show();
}


function correctFeedback() {
  $(".questionFeedback").text("Correct!").show();
}

function incorrectFeedback() {
  $(".questionFeedback").text("Wrong answer.");
}


function nextOrEnd() {
  $(".nextButton").on("click", function(event) {
    event.preventDefault();
    if (CURRENT_QUESTION < myQuestions.length) {
    displayCurrentQuestion();
    } else {
      $(".form").hide();
      finalScore();
    }
  });
}

function currentScore() {
    $(".currentScore").text("You scored: " + CORRECT_ANSWERS + " out of " + myQuestions.length).show();
}

function finalScore() {
  $(".currentScore").hide();
  $(".finalScore").text("You scored: " + CORRECT_ANSWERS + " out of: " + myQuestions.length).show();
  $(".restart").show();
}


function resetQuiz() {
  $(".restart").on("click", function(){
    CURRENT_QUESTION = 0;
    CORRECT_ANSWERS = 0;
    $(".start, h1").show();
    $(".finalScore").hide();
    beginQuiz();
}
)}


function runAll() {
  beginQuiz();
  resetQuiz();
  userChoice();
  submit();
}

$(function(){
  runAll();

});
