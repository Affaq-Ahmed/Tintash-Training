// Memoization is a programming technique which attempts to increase a function’s performance by caching its previously computed results. 
// Write a function named “memoizedFetch” that will fetch data from api url passed as argument but if you call the same function again with the same url then will it return previously received result instead of fetching it again.
import fetch from 'node-fetch';

let cache = {};
const memoizedFetch = function(url){
  const memoized = async (url) => {
    if(cache[url]){
      return cache[url];
    }
    else{
      const res = await fetch(url, {method: 'GET'});
      cache[url] = res;
      return cache[url];
    }
  }
  return memoized(url);
}

const result = await memoizedFetch('https://www.google.com/');
const result1 = await memoizedFetch('https://www.google.com/');
const result2 = await memoizedFetch('https://www.facebook.com/');

console.log('Result: ----', result);
console.log('Result1: ----', result1);
console.log('Result2: ----', result2);

