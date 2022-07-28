var fs = require("fs");

fs.writeFile("hello.txt", `I'm creating new File`, (err) => {
	if (err) {
		throw err;
	}
  else {
    console.log("File created successfully");
  }
});

fs.appendFile("hello.txt", `\nI'm appending to the file`, (err) => {
  if (err) {
    throw err;
  }
  else {
    console.log("File Modified successfully");
  }
})

fs.readFile("hello.txt", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  else {
    console.log(data);
  }
})

fs.watchFile("hello.txt", (curr, prev) => {
  console.log("File has been changed");
});
