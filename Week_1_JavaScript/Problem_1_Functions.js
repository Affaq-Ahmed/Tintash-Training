// Write a function that can sum any number of arguments. The prototype of the function is given below:
// sum(1,2);
// sum(1,2,3);
// sum(1,2,3,4); … and so on any number of arguments.
// Function will return the sum of all the passed arguments.

function sum(a,b,...rest){
  return rest.length === 0 ? a+b : sum(a+b,...rest);
}

console.log(sum(1,2,3,4,5,6));
console.log(sum(1,2));
