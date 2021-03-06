var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var mediaController = require('../controllers/mediaController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz',errors : [] });
});

//Autoload de comandos con :quizid
router.param('quizid',quizController.load);

//controlador referentes a las preguntas y sus respuestas
router.get('/quizes',quizController.index);
router.get('/quizes/:quizid(\\d+)',quizController.show);
router.get('/quizes/:quizid(\\d+)/answer',quizController.answer);
router.get('/quizes/new',quizController.new);
router.post('/quizes/create',quizController.create);
router.get('/quizes/:quizid(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizid(\\d+)', quizController.update);
router.delete('/quizes/:quizid(\\d+)', quizController.destroy);
//controladores referentes al moverse por paginas estaticas
router.get('/author', mediaController.creditos);

module.exports = router;
