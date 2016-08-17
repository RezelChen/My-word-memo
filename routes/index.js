var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var LexData = require('../utility/LexData');
var LexFile = require('../utility/LexFile');

mongoose.connect('mongodb://localhost/words');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
});

/* GET home page. */
router.get('/', function(req, res, next) {
	//重置数据库
	// LexData.init();
	console.log("reload database")
	res.render('index', {
		title: 'My-word-memo',
	});
});

router.get('/lexicon', function(req, res, next) {
	res.render('lexicon', {
		title: 'My-word-memo'
	});
});

router.get('/lexicon/data', function(req, res, next) {
	LexFile.scanDir(function(err, result) {
		res.send(result);
	})
});

router.get('/word', function(req, res, next) {
	res.render('word', {
		title: 'My-word-memo',
		path: req.query.path
	});
})

// router.get('/lexicon/:lib', function(req, res){
// 	// scan the lib file for the list
// 	res.render('list', {
// 		title: 'My-word-memo',
// 		lib: req.params.lib,
// 		list: ["1", "2"]
// 	});
// });

// router.get('/lexicon/:lib/:id', function(req, res){
// 	res.render('word', {
// 		title: 'My-word-memo',
// 		lib: req.params.lib,
// 		id: req.params.id
// 	});
// 	// res.send('lib ' + req.params.lib + ' list ' + req.params.id);
// });

/* GET input page. */
router.get('/input', function(req, res, next) {
  	res.render('input', { title: 'My-word-memo/input' });
});

router.post('/input', function(req, res, next) {
	var lib = req.body.listName,
		id = req.body.listNumber,
		content = req.body.inArea,
		p = lib + '/' + id;

	LexFile.add(p, content, function() {
		LexData.add(lib);
		res.send('success');
	});
})

/* 数据载入 */
// router.post('/data', function(req, res, next) {
// 	var wordList = req.body.wordList;
// 	console.log(wordList);
//   	for(var i = 0; i < wordList.length; i++) {
//   		Word.addWord(wordList[i], function(result) {
//   			console.log(result);
//   		});
//   	}
// 	res.send('success');
// });

router.get('/data/init', function(req, res, next) {
	LexData.init();
	res.send('success');
})

/* 数据输出 */
router.get('/data', function(req, res, next) {
	var results = LexData.find(req.query.path, function(results) {
		res.send(results);
	});
});

module.exports = router;
