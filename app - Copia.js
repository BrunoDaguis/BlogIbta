var express = require('express');
var mongoose = require('mongoose');
var clientModel = require('./model/client.js');
var bodyParser= require('body-parser');

var app = express();

//const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  user: 'sa',
  pass: 'admin123'
}

//mongoose.connect('mongodb://ds015889.mlab.com:15889/testedaguis', options);
mongoose.connect('mongodb://ds135700.mlab.com:35700/chatbot', options);

/*MongoClient.connect('mongodb://sa:admin123@ds015889.mlab.com:15889/testedaguis', (err, database) => {
	if (err) return console.log(err)

	app.listen(3000, () => {
		console.log('listening on 3000')
	});
});*/

app.listen(3000, () => {
	console.log('listening on 3000')
});

app.get('/', function (req, res) {
	clientModel.get(function(results){
		res.render('index.ejs', {clients: results})
	});
});

app.get('/cliente/:id', function (req, res) {
	clientModel.getById(req.params.id, function(result){
		res.render('edit.ejs', {client: result})
	});
});

app.get('/cliente/Excluir/:id', function (req, res) {
	clientModel.getById(req.params.id, function(result){
		res.render('delete.ejs', {client: result})
	});
});

app.post('/save', (req, res) => {
	clientModel.save(req.body, function(result){
		return res.redirect('/')
	});
});

app.post('/update', (req, res) => {
   clientModel.save(req.body, function(result){
		return res.redirect('/')
	});
});

app.post('/delete', (req, res) => {
	clientModel.remove(req.body._id, function(result){
		return res.redirect('/')
	});
});