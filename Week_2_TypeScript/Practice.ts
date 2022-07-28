console.log("Hello World");

const greeting = (name: String, age: Date) => {
	console.log(`Hello ${name}, you are ${age.toDateString()} years old.`);
};

console.log(greeting("John", new Date(30 / 7 / 1980)));

const str: String = "Hello World";

str.toLocaleUpperCase();

const printName = (name: { firstName: String; lastName?: String }) => {
	console.log(`${name.firstName} ${name.lastName}`);
};

printName({ firstName: "John", lastName: "Doe" });
printName({ firstName: "John" });

// function padLeft(padding: number | string, input: string) {
//   if (typeof padding === "number") {
//     return " ".repeat(padding) + input;
//   }
//   return padding + input;

// }

// console.log(padLeft(111, "A"));

interface NumberOrStringDictionary {
	[index: string]: number | string;
	length: number; // ok, length is a number
	name: string; // ok, name is a string
}

interface Box {
	contents: unknown;
}

let x: Box = {
	contents: "hello world",
};

// we could check 'x.contents'
if (typeof x.contents === "string") {
	console.log(x.contents.toLowerCase());
}

// or we could use a type assertion
console.log((x.contents as string).toLowerCase());

interface Box1<Type> {
	contents: Type;
}
interface StringBox {
	contents: string;
}

let boxA: Box1<string> = { contents: "hello" };
console.log(boxA.contents);

let boxB: StringBox = { contents: "world" };
boxB.contents;

interface Todo {
	title: string;
	description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Readonly<Todo>) {
	// fieldsToUpdate.title = "";
	return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
	title: "organize desk",
	description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
	description: "throw out trash",
	title: "organize desk",
});

function identity<Type>(arg: Type): Type {
	return arg;
}

let output = identity<string>("myString");

output;

class Name {
	[key: number]: number | string;
	_name: string;
	_age: string;

	constructor(name: string) {
		this._name = name;
	}

	get name(): string {
		return this.name;
	}
}

class Person extends Name {
	constructor(name: string) {
		super(name);
		console.log(this._name);
	}
}

const person = new Person("John");

interface Animal {
	dateOfBirth: any;
}

interface Dog extends Animal {
	breed: any;
}

class AnimalHouse {
	resident: Animal;
	constructor(animal: Animal) {
		this.resident = animal;
	}
}

class DogHouse extends AnimalHouse {
	// Does not emit JavaScript code,
	// only ensures the types are correct
	declare resident: Dog;
	constructor(dog: Dog) {
		super(dog);
	}
}

const dogHouse = new DogHouse({
	dateOfBirth: new Date(),
	breed: "Poodle",
});

class MyClass {
	name = "MyClass";
	getName(this: MyClass) {
		return this.name;
	}
}
const c = new MyClass();
// OK
console.log(c.getName());

class Box5 {
	contents: string = "";
	set(value: string) {
		this.contents = value;
		return this;
	}
}

class ClearableBox extends Box5 {
	clear() {
		this.contents = "";
	}
}

const a = new ClearableBox();
console.log(a);
const b = a.set("hello");
console.log(a);
console.log(b);

class Box7 {
	content: string = "";
	sameAs(other: this) {
		return other.content === this.content;
	}
}

class DerivedBox extends Box7 {
	otherContent: string = "?";
}

const base = new Box7();
const derived = new DerivedBox();
console.log(base.sameAs(derived));

class Box0<T> {
	value?: T;

	hasValue(): this is { value: T } {
		return this.value !== undefined;
	}
}

const box = new Box0();
box.value = "Gameboy";

console.log(box.value);
