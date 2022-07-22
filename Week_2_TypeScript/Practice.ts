console.log("Hello World");

const greeting = (name: String, age: Date) => {
  console.log(`Hello ${name}, you are ${age.toDateString()} years old.`);
}

console.log(greeting("John", new Date(30/7/1980)));

const str : String = "Hello World";

str.toLocaleUpperCase();

const printName = (name: {firstName: String, lastName?: String}) => {
  console.log(`${name.firstName} ${name.lastName}`);
}

printName({firstName: "John", lastName: "Doe"});
printName({firstName: "John"});