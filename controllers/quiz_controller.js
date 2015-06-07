var model = require('../models/models.js');

//Autoload - factoriza el codigo si la ruta incluye :quizid
exports.load = function  (req, res, next, quizid) {
	model.Quiz.findById(quizid).then(
			function  (quiz) {
				if(quiz){
					req.quiz = quiz;
					next();
				}else{
					next(new Error('No existe el quizid = ' + quizid));
				}
			}
		).catch(function  (error) {
			next(error);
		});
};




exports.index = function  (req, res) {

	if(req.query.search !== undefined){
		var search = '%'+req.query.search.replace(" ","%")+'%';
			model.Quiz.findAll({where: ["upper(pregunta) like ?", search.toUpperCase()]}).then(
				function  (quizes) {
					res.render('quizes/index',{
					quizes : quizes
					})
				}).catch(function(error) {
					next(error);
				});
	}else{
		model.Quiz.findAll().then(function  (quizes) {
		res.render('quizes/index',{
			quizes : quizes
		})
	}).catch(function(error) {
		next(error);
	});
	}

	
};

exports.show = function(req, res) {
	
		res.render('quizes/show',{
			quiz:req.quiz
		});
	
};

exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if(req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()){
		resultado = 'Correcto';
	}
	
	res.render('quizes/answer', { quiz : req.quiz, respuesta : resultado});
};


exports.new = function  (req , res) {
	
	var quiz = model.Quiz.build(
			{pregunta : "Pregunta" , respuesta : "Respuesta"}
		);

	res.render('quizes/new',{quiz:quiz});

}

exports.create = function  (req , res) {
	var quiz = model.Quiz.build(req.body.quiz);

	//Guardar en la BD solo los campos pregunta y respuesta y redireccionar a la lista de preguntas
	quiz.save({fields: ["pregunta","respuesta"]}).then(function  () {
		res.redirect('/quizes');
	})

}