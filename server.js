const http = require('http');
const fs = require('fs');
const _ = require('lodash');

// Creating server
const server = http.createServer((req, res) => {
	// lodash
	num = _.random(0, 20);
	console.log(num);

	const greet = _once;

	// set header content type
	res.setHeader('Content-Type', 'text/html');

	// setting the path for the requested page
	let path = './views/';
	switch (req.url) {
		case '/':
			path += 'index.html';
			res.statusCode = 200;
			break;
		case '/about':
			path += 'about.html';
			res.statusCode = 200;
			break;
		case '/about-I':
			res.statusCode = 301;
			res.setHeader('Location', '/about');
			break;
		default:
			path += '404.html';
			res.statusCode = 404;
			break;
	}

	// reading and sending an html file
	fs.readFile(path, (err, data) => {
		if (err) {
			console.log(err);
			res.end();
		} else {
			// * if using one file thwn write noy needed
			//res.write(data);

			res.end(data);
		}
	});
});

// listening to the server
server.listen(3000, 'localhost', () => {
	console.log('listening for requests on port 3000');
});
