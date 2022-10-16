// Timeouts and intervals
// Promises -  an object that represents eventual completion or failure of an asynchronous funciton
// TIMEOUTS

setTimeout(() => {
  /* outputs message in console after 5 seconds */
  console.log("Delayed for 5 seconds");
}, 5000);

const myArray = [
  "zero",
  "one",
  "two",
]; /* defines the myArray.myMethod function */
myArray.myMethod = function (sProperty) {
  console.log(arguments.length > 0 ? this[sProperty] : this);
};

myArray.myMethod(); // prints "zero,one,two"\
myArray.myMethod(2); // prints "two"
myArray.myMethod(0); // prints "zero"
myArray.myMethod(1); // prints "one"

/* The above works because when myMethod is called, it's "this" is set to "myArray"
  by the call, so within the function, "this[sProperty]" is equivalent to "myArray[sProperty]"*/

setTimeout(myArray.myMethod, 1.0 * 1000); // prints [object window] after 1 second
setTimeout(myArray.myMethod, 1.5 * 1000, "1"); //prints undefined after 1.5 second

/*the "myArray.myMeathod" function is passed to "setTimeout", then when it's called "this" is
  NOt set, so it defaults to the window object
  setTimeout.call(myArray, myArray.myMethod, 2.0*1000);
  setTimeout.call(myArray, myArray.myMethod, 2.5*1000, 2);
      using "call" to set "this" doesn't work either, and will produce errors */

/* SOLUTIONS */

/* Two Wrapper function that sets "this" to the required value */
setTimeout(function () {
  myArray.myMethod();
}, 2.0 * 1000); /* prints "zero,one,two" after 2 seconds */

setTimeout(function () {
  myArray.myMethod("1");
}, 2.5 * 1000); /*prints "one" after 2.5 seconds */

/* A Wrapper function can also be written as an arrow function */ setTimeout(
  () => {
    myArray.myMethod();
  },
  3.0 * 1000
); /* prints "zero, one, two" after 2 seconds */

setTimeout(() => {
  myArray.myMethod("2");
}, 3.5 * 1000); // prints "two" after 2.5 seconds"

// Use "bind()" to set the value of "this"

//const myArray = ['zero', 'one', 'two']  *already defined near top of page*
const myBoundMethod = function (sProperty) {
  console.log(arguments.length > 0 ? this[sProperty] : this);
}.bind(myArray);

myBoundMethod(); //prints "zero, one, two" because "this" is bound to myArray from the binding
myBoundMethod(1); //prints "one"

setTimeout(myBoundMethod, 4.0 * 1000); //prints "zero,one,two" from binding, item in array not defined
setTimeout(myBoundMethod, 4.5 * 1000, "1"); //prints "one" after 4.5 seconds

// Passing String Literals
setTimeout(() => {
  console.log("Hello World");
}, 5.5 * 1000);

/* Late Timeouts - timeout can fire later than expected if browser is busy with other tasks
                     One case is that the function or code snippet cannot be executed until the
                     thread that called "setTimeout()" has terminated */

function foo() {
  console.log("foo has been called");
}

setTimeout(foo, 0);
console.log(
  "After setTimeout"
); /* displays this before foo function because its queued for
     next opportunity, not immediately. Currently executing
     code must complete before the timeout begins counting */

// Setting and Clearing Timeouts Example

let timeoutId;

function setOutput(outputContent) {
  document.querySelector("#output").textContent = outputContent;
}

function delayMessage() {
  setOutput("");
  timeoutId = setTimeout(setOutput, 2 * 1000, "That was really slow!");
}

function clearMessage() {
  clearTimeout(timeoutId);
}

// INTERVALS

// Alternating Two Colors Ex.

let nIntervID; //variable to store the intervalID

function changeColor() {
  if (!nIntervID) {
    //check if interval has already been set up
    nIntervID = setInterval(flashText, 1000);
  }
}

function flashText() {
  //selects div and alternates between classes
  const oElem = document.getElementById("my_box");
  oElem.className = oElem.className === "go" ? "stop" : "go";
}

function stopTextColor() {
  // release out intervalID from the variable
  clearInterval(nIntervID);
  nIntervID = null;
}

document.getElementById("start").addEventListener("click", changeColor);
document.getElementById("stop").addEventListener("click", stopTextColor);

// "this" Keyword

// "this" Method
const person = {
  firstName: "Gregg",
  lastName: "Potter",
  id: 6969,
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

document.getElementById("demo").innerHTML = person.fullName();

// "this" Alone
let x = this;
document.getElementById("alone").innerHTML = x;

// "this" Function

document.getElementById("thisFunc").innerHTML = myFunction();

function myFunction() {
  return this;
}

// Using Objects and Properties using Bracket and Dot Notation

let dot = {
  // Object used for both examples
  meat: "Salami",
  sauce: "Southwest",
  bread: "White",
};

// Dot Notation - Can NOT contain non-alphanumeric characters (except _ and $), and numbers be the first character

let choice = dot.meat;

document.getElementById("dotNot").innerHTML = choice;

// Bracket Notation - Can use variables, spaces, and strings starting with numbers

let preference = dot["sauce"];

document.getElementById("bracNot").innerHTML = preference;

// Bracket Notation also allows the use of variables to access properties, as long as it references a string

let sauce = "bread"; // sauce variable refers to the bread property
let variable =
  dot[sauce]; /*thus, when sauce is used in this context of bracket notation,
                              it refers the sauce VARIABLE rather than the sauce PROPERTY*/

document.getElementById("varBrac").innerHTML = variable;

// JSON Parseand Stringify - Turns objects to string and vice versa

const student = { //object we start with
  name: "Mathew",
  age: 20,
  isActive: true,
  school: "CodeX",
  level: 2,
}
console.log(typeof(student)); // Displays that student is an object
console.log(student);         // What is in the object 

const studentToString = JSON.stringify(student)

console.log(typeof(studentToString)); // Dsplays that it is a string now
console.log(studentToString); // Shows old object in string format

const toJsonStudent = JSON.parse(studentToString); // Turns string back into an object

console.log(typeof(toJsonStudent)); // Shows that it is an object
console.log(toJsonStudent.name);  // Shows what full object

// Array Iterators

const animals = ["Dog", "Cat", "Snake", "Oppossum", "Squirrel", "Cat"];

// forEach() - executes a snippet of code once for every element in an array

animals.forEach((element) => {
  console.log(element);
});

// indexOf() - returns the first index the desired element is found in an array

console.log(animals.indexOf("Snake")); // Outputs 2

console.log(animals.indexOf("Cat", 2)); // Outputs 5, since [5] is the 2nd instance of "Cat"

console.log(animals.indexOf("Pig")); // Outputs -1, since "Pig" is not an element of the array

// Finding if element exists, then updating the array if not found

function updateAnimalsArray(animals, animal) {
  if (animals.indexOf(animal) === -1) {
    // Checks if stated animal is already in the array
    animals.push(animal); // If not in the array, adds it to the end
    console.log(`New animals array is: ${animals}.`); // Displays new array in the console
  } else {
    console.log(`${animal} already exists in the animals array.`); // If stated animal is in the array, displays that in console
  }
}

updateAnimalsArray(animals, "Cow"); // Shows the new array with Cow added to [6]

updateAnimalsArray(animals, "Cow"); // Since 'Cow' is already there, shows the else message

// Finding all occurances of an element with indexOf()

const find = [];

const elements = "Cat"; // This is what element the following code looks for

let idx = animals.indexOf(elements); // Checks the animal array for the element stated above
while (idx !== -1) {
  // While 'Cat' is in the array
  find.push(idx); // adds the value of idx to find
  idx = animals.indexOf(elements, idx + 1); // idx has a value of 'Cat', and checks one more time, per instance of 'Cat'
}

console.log(find); // Displays (2) [1,5] for 2 instances of 'Cat' in indexes 1 and 5

// find() - provide first element in the array that satisfies the function (its a callback function that runs for each index before truthy value)

const findArray = [10, 20, 30, 40, 50]; // Array used for find() examples

const found = findArray.find((element) => element > 25); // search the array for an element above 25

console.log(found); // displays 30, since its the first element above 25

// map() - creates a new array using the results of calling a function of on every element in the calling array

const mapArray = [2, 5, 7, 12]; // array for map example

const mapEx = mapArray.map((x) => x * 5); // multiplies all elements in the array by 5

console.log(mapEx); //  displays new array

// filter() - creates a copy of a portion of an array, filtered to elements that pass a test function

const filterArray = [
  "words",
  "country",
  "fact",
  "everyday",
  "container",
  "banana",
];

const result = filterArray.filter((word) => word.length > 5); // filters the array for words longer than 5 characters

console.log(result); // displays an array of all words that pass the filter()'s function

// reduce() - executes a function on each element of an array in order, passing the return value on the preceding element.

const reduceArray = [2, 5, 8];

const initialValue = 0; // Start at 0

const sumOfReducer = reduceArray.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue // start at 0, then add previous index to the next index sequencially
);

console.log(sumOfReducer); // Displays 15 from this math 0+2=2 2+5=7 7+8=15

// some() - tests if at least one element passes a test function, returns true or false based on its findings

const someArray = [3, 10, 15, 21, 27];

const even = (element) => element % 2 === 0; // checks if a value is even

console.log(someArray.some(even)); // Displays true, since there is an even number (10) in the array

// Preventing post back with preventDefault()

// preventDefault() - method of and Event tells the browser that if the event is not handled, the default action shouldnt be the usual one

// Click Example

const checkbox = document.querySelector("#checkbox");

checkbox.addEventListener("click", checkboxClick, false);

function checkboxClick(event) {
  let warn = "You were told not to click this!<br>";
  document.getElementById("output-box").innerHTML += warn;
  event.preventDefault();
}
