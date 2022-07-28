const express = require("express");
const app = express();

// Simple request time logger
app.use((req, res, next) => {
	console.log("A new request received at " + Date.now());
	next();
});

app.get("/home", (req, res) => {
	res.send("Home Page");
});

app.get("/about", (req, res) => {
	res.send("About Page");
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
