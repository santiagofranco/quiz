var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar el modelo ORM
var Sequelize = require('sequelize');

var seq = new Sequelize(DB_name,user,pwd,
	{
		dialect: protocol,
		protocol: protocol,
		port: port,
		host: host,
		storage: storage,   //Solo SQLite(.env)
		omitNull: true		//Solo Postgres
	});

//Importar la definicion de la tabla quiz en quiz.js
var Quiz = seq.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //Exportar la definicion de la tabla

//seq.sync() crea e inicializa la tabla
seq.sync().then(function() {
	//then ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count) {
		// la tabla se inicializa solo si esta vacia
		if(count === 0){
			Quiz.create({
				pregunta: "Capital de Italia",
				respuesta: "Roma"
			})
			.then(function  () {
				console.log("Base de datos inicializada");
			});
		}

	});
});