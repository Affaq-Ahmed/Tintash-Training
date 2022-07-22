// Introduce a populate method in array class in a way such that you can call it:
// Example:
// $ const array = [‘google.com’, ‘facebook.com’];
// $ array.populate(); 
// Calling the above method will populate the array by replacing the urls with actual results retrieved by calling the url using http call.
// The method should be callable on any array instance but it should throw an exception if the array does not contain valid urls.
import fetch from 'node-fetch';

Array.prototype.populate = function(){
  
  for(let i = 0; i < this.length; i++){
    console.log(this[i]);
    if(this[i].includes('http')){
      fetch(this[i], {method: 'GET'})
        .then(res => res.text())
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    else{
      throw new Error('Invalid URL');
    }
  }
}

//arr of urls
const arr = ['https://www.google.com/', 'https://www.facebook.com/'];

arr.populate(); 

console.log(arr);