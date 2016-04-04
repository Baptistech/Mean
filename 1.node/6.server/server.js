var express = require('express');
//var serveIndex = require('serve-index');
var bodyParser = require('body-parser');
var app = express();

var posts=[];

// Config

app.set('views', 'views');
app.set('view engine', 'jade');
app.enable('view cache');
app.enable('case sensitive routing');
app.enable('strict routing');
app.disabled('x-powered-by');

// Middlewares

// Custom
app.use(function(req, res, next){
	console.log('on all request');
	next();
});

// Built-in
app.use('/public', express.static(__dirname + '/files'));
//app.use(serveIndex(__dirname + '/public', __dirname + '/files'));

// Third-party
app.use(bodyParser.urlencoded());



// Routes
app.get('/', function(req, res) {
    res.render('welcome', {body: "welcome"});
});

app.get('/hi.html', function(req, res) {
    res.send('hi');
});

// app.all('/form.html', function(req, res, next){
// 	console.log('for all "/form.html" routes');
// 	next();
// })

app.get('/form.html', function(req, res){
     res.render('form', {posts: posts} );
});

app.post('/form.html', function(req, res){
    posts.push(req.body.post);
    res.redirect('/form.html');
});

// app.route('/form.html')
// 	.all(function(req, res, next){})
// 	.get(function(req, res){})
// 	.post(function(req, res){});

// route parameter == iprooved app.all. app.all based on rout params
// app.param('name', function(req, res, next, name){
// 	req.anotherName = name[0].toUpperCase() + name.substring(-1);
// 	next();
// });

// app.get('/route/:name', function(req, res){
// 	console.log(req.anotherName);
// 	res.send(req.params.name);
// })

//Router

// var router = express.Router();
// router.use(func ...);
// router.get('/', func ...);
// router.route('/route').get...
// app.use('/', router);

// req.param('name');
// 1. req.params
// 2. req.body
// 3. req.query

//req.route
//req.originalUrl

//req.cookies.attr;
//req.get('header') for getting headers
//req.accepts('mime types')

//res.status(200)
//res.set(attr, value)
//res.get(attr)
//res.cookie(attr, value)
//res.clearCookie(attr)

//res.redirect(status, path)
//res.send(status, text)
//res.json(status, object)
//res.download(file)

//res.render(template, object, function(err, html){
//	res.send(html)
//});

// app.get('/format', function(req, res){
// 	console.log(req.get('Content-Type'));
// 	res.format({
// 		'text/plain': function() {
// 			res.send('text');
// 		},
// 		'text/html': function() {
// 			res.render('welcome', {body: "welcome"});
// 		},
// 		'application/json': function() {
// 			res.json({prop: 'value'});
// 		}
// 	});
// });

app.listen(3000, function() {
    console.log('listening on port 3000');
});
