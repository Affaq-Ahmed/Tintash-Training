// const readline = require("node:readline");
// const { stdin: input, stdout: output } = require("node:process");
// const ac = new AbortController();
// const signal = ac.signal;

// const rl = readline.createInterface({ input, output });

// rl.on("SIGINT", () => {
// 	rl.question("Are you sure you want to exit? ", (answer) => {
// 		if (answer.match(/^y(es)?$/i)) rl.pause();
// 	});
// });

// // rl.question("What do you think of Node.js? ", (answer) => {
// // 	// TODO: Log the answer in a database
// // 	console.log(`Thank you for your valuable feedback: ${answer}`);

// // 	rl.close();
// // });

// rl.question("What is your favorite food? ", { signal }, (answer) => {
// 	console.log(`Oh, so your favorite food is ${answer}`);
// });

// rl.on("history", (history) => {
// 	console.log(`Received: ${history}`);
// });

// const values = ["lorem ipsum", "dolor sit amet"];
// const rl = readline.createInterface(process.stdin);
// const showResults = debounce(() => {
// 	console.log("\n", values.filter((val) => val.startsWith(rl.line)).join(" "));
// }, 300);
// process.stdin.on("keypress", (c, k) => {
// 	showResults();
// });

// rl.moveCursor(50,100);
// rl.commit();

const readline = require("node:readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "OHAI> ",
});

rl.prompt();

rl.on("line", (line) => {
	switch (line.trim()) {
		case "hello":
			console.log("world!");
			break;
		default:
			console.log(`Say what? I might have heard '${line.trim()}'`);
			break;
	}
	rl.prompt();
}).on("close", () => {
	console.log("Have a great day!");
	process.exit(0);
});