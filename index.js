// Timeouts and intervals

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

let dot = {             // Object used for both examples
    meat: 'Salami',
    sauce: 'Southwest',
    bread: 'White'
};

// Dot Notation - Can NOT contain non-alphanumeric characters (except _ and $), and numbers be the first character

let choice = dot.meat;

document.getElementById("dotNot").innerHTML = choice

// Bracket Notation - Can use variables, spaces, and strings starting with numbers

let preference = dot['sauce'];

document.getElementById("bracNot").innerHTML = preference

// Bracket Notation also allows the use of variables to access properties, as long as it references a string

let sauce = 'bread';        // sauce variable refers to the bread property
let variable = dot[sauce];  /*thus, when sauce is used in this context of bracket notation,
                            it refers the sauce VARIABLE rather than the sauce PROPERTY*/

document.getElementById("varBrac").innerHTML = variable


// JSON

// Array Iterators

// forEach() - executes a snippet of code once for every element in an array

const animals = ['Dog', 'Cat', 'Snake', 'Oppossum', 'Squirrel'];

animals.forEach((element) => {
  console.log(element);
});



