var categoryMap = {
  'general-knowledge': 9,
  'entertainment-books': 10,
  'entertainment-film': 11,
  'entertainment-music': 12,
  'entertainment-musicals-theatres': 13,
  'entertainment-tv': 14,
  'entertainment-video-games': 15,
  'entertainment-board-games': 16,
  'science-nature': 17,
  'science-computers': 18,
  'science-mathematics': 19,
  'mythology': 20,
  'sports': 21,
  'geography': 22,
  'history': 23,
  'politics': 24,
  'art': 25,
  'celebrities': 26,
  'animals': 27,
  'vehicles': 28,
  'entertainment-comics': 29,
  'science-gadgets': 30,
  'entertainment-japanese-anime-manga': 31,
  'entertainment-cartoon-animations': 32
};

var fetch = require('node-fetch');
var _ = require('lodash');

var getQuiz = function(params) {
  var triviaURL = getTriviaURL(params);
  return fetch(triviaURL)
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      return reformatQA(json.results);
    });
};

var getTriviaURL = function({category, difficulty = false, count = 10}) {
  console.log('count', count);
  console.log('category', category);
  console.log('difficulty', difficulty);
  var theURL = 'http://www.opentdb.com/api.php?type=multiple&amount=' + count;
  if (category) {
    theURL += '&category=' + categoryMap[category]
  }
  if (difficulty) {
    theURL += '&difficulty=' + difficulty.toLowerCase()
  }
  return theURL;
};


var reformatQA = function(results) {
  return results.map(function(result) {
    var answers = result.incorrect_answers.map(function(answer){
        return {correct: false, text: answer}
      });
    answers.push({correct: true, text: result.correct_answer});
    return {
      text: result.question,
      answers: _.shuffle(answers)
    }
  });
};

module.exports = {getQuiz}
