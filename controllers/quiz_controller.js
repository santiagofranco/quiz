var model = require('../models/models.js');

exports.question = function(req, res) {
	model.Quiz.findAll().then(function  (quiz) {
	res.render('quizes/question', {pregunta : quiz[0].pregunta});	
	})
	
}

exports.answer = function(req, res) {
	model.Quiz.findAll().then(function  (quiz) {
		if(req.query.respuesta.toUpperCase() === quiz[0].respuesta.toUpperCase()){
		res.render('quizes/answer',{respuesta : 'Correcta'});
	}else
		res.render('quizes/answer',{respuesta : 'Incorrecta'});
	})
	
};