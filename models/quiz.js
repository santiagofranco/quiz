//Definicion del objeto quiz

module.exports = function  (seq , d) {
	return seq.define(
		'Quiz',
		{
			pregunta : d.STRING,
			respuesta : d.STRING,
		}
	);
}