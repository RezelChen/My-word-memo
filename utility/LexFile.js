var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var toolForFile = require('./toolForFile');

var LEXPATH = path.join(__dirname, '../lexicon');

var LexFile = {
	getLexPath: function() { return LEXPATH; },
	add: function(p, c, cb) {
		p = path.join(LEXPATH, p);
		mkdirp(path.dirname(p), function(err) {
			if(err) throw err;

			fs.closeSync(fs.openSync(p, 'w'));
			fs.writeFile(p, c, function(err) {
				if (err) throw err;
				cb();
			});
		});
	},
	scanDir: function(cb) {
		toolForFile.scanDir(LEXPATH, cb);
	}
};

module.exports = LexFile;