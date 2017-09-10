var express = require('express');
var apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
  res.json({ message: 'hooray! your API is working!' });
});

module.exports = apiRouter;

var sampleQuiz = require('./../quiz_fixture.js');

apiRouter.get('/sample', function (req, res) {
  res.json(sampleQuiz);
});

var quiz = require('./../quiz.js')

apiRouter.get('/category/:category', function(req, res) {
 quiz
   .getQuiz(req.params)
   .then(function(result){res.json(result);});
});

apiRouter.get('/category/:category/difficulty/:difficulty', function(req, res) {
 quiz
   .getQuiz(req.params)
   .then(function(result){res.json(result);});
});

apiRouter.get('/category/:category/difficulty/:difficulty/count/:count', function(req, res) {
 quiz
   .getQuiz(req.params)
   .then(function(result){res.json(result);});
});
