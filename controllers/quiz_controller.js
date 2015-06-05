var model = require('../models/models.js');

exports.index = function  (req, res) {
	model.Quiz.findAll().then(function  (quizes) {
		res.render('quizes/index',{
			quizes : quizes
		})
	});
};

exports.show = function(req, res) {
	model.Quiz.findById(req.params.quizid).then(function  (quiz) {
		res.render('quizes/show',{
			quiz:quiz
		});
	})
};

exports.answer = function(req, res) {
	model.Quiz.findById(req.params.quizid).then(function  (quiz) {
		if(req.query.respuesta.toUpperCase() === quiz.respuesta.toUpperCase()){
		res.render('quizes/answer',{
			quiz:quiz,
			respuesta : 'Correcta'
		});
	}else
		res.render('quizes/answer',{
			quiz:quiz,
			respuesta : 'Incorrecta'
		});
	})
	
};