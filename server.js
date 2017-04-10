var express = require('express');
var mongoose = require('mongoose');

var userModel = require('./model/user.js');
var postModel = require('./model/post.js');
var commentModel = require('./model/comment.js');
var imagesModel = require('./model/image.js');

var likeModel = require('./model/like.js');

var bodyParser= require('body-parser');

var app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

var options = {
		db: { native_parser: true },
		server: { poolSize: 5 },
		replset: { rs_name: 'myReplicaSetName' },
		user: 'sa',
		pass: 'admin123'
	};

mongoose.connect('mongodb://ds141950.mlab.com:41950/blog', options);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => {
	console.log('listening on 3000')
});

app.get('/', function (req, res) {
	res.render('index.ejs');
});

/* USER */

app.get('/api/user', function (req, res) {
	userModel.get(function(results){
		res.json(results);
	});
});

app.get('/api/user/:id', function (req, res) {
	userModel.getById(req.params.id, function(result){
		res.json(result);
	});
});

app.post('/api/user', (req, res) => {
	userModel.save(req.body, function(result){
		res.json({_id: result._id});
	});
});

app.put('/api/user', (req, res) => {
   userModel.save(req.body, function(result){
		res.json({ success: true });
	});
});

app.delete('/api/user/:id', (req, res) => {
	userModel.remove(req.params.id, function(result){
		res.json({ success: true });
	});
});

app.post('/api/user/login', (req, res) => {
	userModel.login(req.body, function(result){
		
	});
});


/* post */

app.get('/api/post', function (req, res) {
	postModel.get(function(results){
		res.json(results);
	});
});

app.get('/api/post/:id', function (req, res) {
	postModel.getById(req.params.id, function(result){
		res.json(result);
	});
});

app.post('/api/post', (req, res) => {
	postModel.save(req.body, function(result){
		res.json({_id: result._id});
	});
});

app.put('/api/post', (req, res) => {
   postModel.save(req.body, function(result){
		res.json({ success: true });
	});
});

app.delete('/api/post/:id', (req, res) => {
	postModel.remove(req.params.id, function(result){
		res.json({ success: true });
	});
});

/* comments (post) */

app.get('/api/comment', function (req, res) {
	commentModel.get(function(results){
		res.json(results);
	});
});

app.get('/api/comment/:id', function (req, res) {
	commentModel.getById(req.params.id, function(result){
		res.json(result);
	});
});

app.post('/api/comment', (req, res) => {
	commentModel.save(req.body, function(comment){
		postModel.addComment(req.body.post, comment._id, function(result){
			res.json({_id: comment._id});
		});		
	});
});

app.put('/api/comment', (req, res) => {
   commentModel.save(req.body, function(result){
		res.json({ success: true });
	});
});

app.delete('/api/comment/:id', (req, res) => {
	//Busco comment pelo ID
	commentModel.getById(req.params.id, function(comment){
		//Removo comment da tabela de post
		postModel.removecomment(comment.post, comment._id, function(){
			//Removo comment na tabela de comment
			commentModel.remove(comment._id, function(){
				res.json({ success: true });
			});			

		});	

	});
});

/* IMAGES */
app.post('/api/post/image', (req, res) => {
	imagesModel.save(req.body, function(image){
		postModel.addImage(req.body.post, image._id, function(){
			res.json({_id: image._id});
		});	
	});
});

app.delete('/api/post/image/:id', (req, res) => {
	imagesModel.remove(req.params.id, function(image){
		imagesModel.remove(req.params.id, function(result){
			postModel.addImage(image.post, image._id, function(){
				res.json({ success: true });
			});	
		});	
	});	
});

/* LIKES */
app.post('/api/post/like', (req, res) => {
	likeModel.save(req.body, function(like){
		postModel.addLike(req.body.post, function(){
			res.json({_id: like._id});
		});	
	});
});

app.delete('/api/post/like/:id', (req, res) => {
	likeModel.remove(req.params.id, function(result){
		postModel.removeLike(req.body.post, function(){
			res.json({ success: true });
		});		
	});
});