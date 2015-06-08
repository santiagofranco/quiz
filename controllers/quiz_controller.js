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
					quizes : quizes,
					errors : []
					})
				}).catch(function(error) {
					next(error);
				});
	}else{
		model.Quiz.findAll().then(function  (quizes) {
		res.render('quizes/index',{
			quizes : quizes,
			errors : []
		})
	}).catch(function(error) {
		next(error);
	});
	}

	
};

exports.show = function(req, res) {
	
		res.render('quizes/show',{
			quiz:req.quiz,
			errors : []
		});
	
};

exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if(req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()){
		resultado = 'Correcto';
	}
	
	res.render('quizes/answer', { 
		quiz : req.quiz, 
		respuesta : resultado,
		errors : []
	});
};


exports.new = function  (req , res) {
	
	var quiz = model.Quiz.build(
			{pregunta : "Pregunta" , respuesta : "Respuesta", categoria : "Categoria"}
		);

	res.render('quizes/new',{quiz:quiz,errors : []});

}

exports.create = function  (req , res) {
	var quiz = model.Quiz.build(req.body.quiz);

	quiz.validate().then(
		function  (err) {
			if(err){
				res.render('quizes/new',{ quiz:quiz, errors : err.errors});			
			}else{
				//Guardar en la BD solo los campos pregunta y respuesta y redireccionar a la lista de preguntas
				quiz.save({fields: ["pregunta","respuesta","categoria"]}).then(function  () {
					res.redirect('/quizes');
				})

			}
		}
	)

	
}

exports.edit = function  (req , res) {
	
	var quiz = req.quiz;

	res.render('quizes/edit', {quiz:quiz, errors : []});

}

exports.update = function  (req , res) {

	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.categoria = req.body.quiz.categoria;

	req.quiz.validate().then(
			function  (err) {
				if(err){
					res.render('quizes/edit', {quiz:req.quiz , errors : err.errors});
				}else{
					req.quiz.save(
					{
						fields : ["pregunta", "respuesta", "categoria"]
					}
					).then(function(){
						res.redirect('/quizes');
					});
				}
			}
		);

}


exports.destroy = function  (req , res) {
	req.quiz.destroy().then(
			function  () {
				res.redirect('/quizes');
			}
		).catch(function  (error) {
			next(error);
		});
}