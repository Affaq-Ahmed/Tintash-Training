const http = require("http");

const port = 3000;

const Server = http
	.createServer((request, response) => {
		response.writeHead(200, {
			"Content-Type": "text/html",
		});
		response.end("Hello World \n ");
		console.log(request.headers);
		console.log(request.method);
		console.log(request.url);
		console.log(response.url);
	})
	.listen(port);
