// Write a function to sum the arguments based on below prototype:
// sum(1)(2)(3);

// Make this function generic:
// sum(1)(2)(3).....(n);


const sum = function (a){
  return function (b){
    if(b){
      return sum(a + b);
    }
    else{
      return a;
    }
  }
}

console.log(sum(1)(2)(3)(4)(5)());
