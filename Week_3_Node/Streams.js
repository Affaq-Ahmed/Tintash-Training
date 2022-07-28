const http = require("http");
const fs = require("fs");
const path = require("path");
const Stream = require("stream");
const dirPath = path.join(__dirname, "/hello.txt");

console.log(dirPath);

const server = http.createServer(function (req, res) {
	const stream = fs.createReadStream(`${__dirname}/hello.txt`);
	stream.pipe(res);
});

const readableStream = new Stream.Readable({
	read() {},
});
const writableStream = new Stream.Writable();

writableStream._write = (chunk, encoding, next) => {
	console.log(chunk.toString());
	next();
};

readableStream.pipe(writableStream);

readableStream.push("hi!");
readableStream.push("ho!");


server.listen(3000);
