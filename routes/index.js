const fs = require('fs'),
			path = require('path')

module.exports = function(server) {
	fs.readdir(__dirname, function(err, files) {
		files.forEach(function(e) {
			const ext = path.extname(e).toLowerCase()
      const basename = path.basename(e, ext).toLowerCase()
      if (ext !== '.js') return
      if (basename === 'index') return
      server.use('/', require(`./${basename}`));
		})
	})
}