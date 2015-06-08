//Definicion del objeto quiz

module.exports = function  (seq , d) {
	return seq.define(
		'Quiz',
		{
			pregunta : {
				type : d.STRING,
				validate : { notEmpty : {msg: "-> Falta Pregunta!"}}
			},
			respuesta : {
				type : d.STRING,
				validate : { notEmpty : {msg: "-> Falta Respuesta!"}}
			},
			categoria:{
				type : d.STRING,
				validate : {
					notEmpty : {msg : "-> Falta Categoria"},
					isIn : [[ 'Otro', 'Humanidades' , 'Ocio' , 'Tecnologia' , 'Ciencia']]
				}
			}
		}
	);
}