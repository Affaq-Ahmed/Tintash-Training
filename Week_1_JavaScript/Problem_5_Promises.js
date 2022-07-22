// Write a javascript function that will receive an array of urls. The array length can vary based on user input. The function will send requests to each of these urls and populate a results array. Users can also enter a invalid url so requests to that url may fail so the function should be intelligent to handle this scenario. These will be below variations of this function.
// ●  Implement this function using callbacks (Serial execution mode)
// ●  Implement this function using promises (Serial execution mode)
// ●  Modify function to handle all the requests in parallel mode and then compare the
// performance with previous serial versions (Parallel execution mode)
// ●  Implement same function using async, await
import fetch from "node-fetch";

// using callbacks (Serial execution mode)
const serialCallbacks = (urls) => {
	const results = [];
	const callback = (url, index) => {
		if (url.includes("http")) {
			fetch(url, { method: "GET" })
				.then((res) => res.text())
				.then((res) => {
					results[index] = res;
					if (index === urls.length - 1) {
						console.log(results);
					}
				})
				.catch((err) => console.log(err));
		} else {
			throw new Error("Invalid URL");
		}
	};
	for (let i = 0; i < urls.length; i++) {
		callback(urls[i], i);
	}
	return results;
};

//using Promises (Serial execution mode)
const serialPromises = (urls) => {
	const results = [];
	const promises = urls.map((url, index) => {
		if (url.includes("http")) {
			return fetch(url, { method: "GET" })
				.then((res) => res.text())
				.then((res) => {
					results[index] = res;
					if (index === urls.length - 1) {
						console.log(results);
					}
				})
				.catch((err) => console.log(err));
		} else {
			throw new Error("Invalid URL");
		}
	});

  return Promise.allSettled(promises).then(() => {
		return results;
	});
};

//using async/await
const asyncAwait = async (urls) => {
	const results = [];
	for (let i = 0; i < urls.length; i++) {
		if (urls[i].includes("http")) {
			const res = await fetch(urls[i], { method: "GET" });
			const text = await res;
			results[i] = text;
		} else {
			throw new Error("Invalid URL");
		}
	}
	console.log(results);
	return results;
};

const arrayOfURLs = ["https://www.google.com/", "https://www.facebook.com/"];

const callbackResults = serialCallbacks(arrayOfURLs);
console.log("Callback Results: ----", callbackResults);

const promiseResults = await serialPromises(arrayOfURLs);
console.log("Promise Results: ----", promiseResults);

const asyncAwaitResults = await asyncAwait(arrayOfURLs);
console.log("Async Await Results: ----", asyncAwaitResults);
