console.log("Hello World");
var greeting = function (name, age) {
    console.log("Hello ".concat(name, ", you are ").concat(age.toDateString(), " years old."));
};
console.log(greeting("John", new Date(30 / 7 / 1980)));
var str = "Hello World";
str.toLocaleUpperCase();
var printName = function (name) {
    console.log("".concat(name.firstName, " ").concat(name.lastName));
};
printName({ firstName: "John", lastName: "Doe" });
printName({ firstName: "John" });
