function greet(greeting, city) {
  return `${greeting}, i'm ${this.name} from ${city}`;
}

const person = { name: "Vikas" };

const result1 = greet.call(person, "Hi", "Bengaluru");
console.log(result1);

const result2 = greet.apply(person, ["Hi", "Bengaluru"]);
console.log(result2);

const greetBindFn1 = greet.bind(person, "Hi");
const greetBindFn2 = greet.bind(person, "Hello");
console.log(greetBindFn1("Bengaluru"));
console.log(greetBindFn2("Chennai"));

Function.prototype.myCall = function (context, ...args) {
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

const result3 = greet.myCall(person, "Hi", "Bengaluru");
console.log(result3);

Function.prototype.myApply = function (context, args) {
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

const result4 = greet.myApply(person, ["Hi", "Bengaluru"]);
console.log(result4);

Function.prototype.myBind = function (context, ...args1) {
  context.fn = this;
  return function (...args2) {
    const result = context.fn(...args1, args2);
    delete context.fn;
    return result;
  };
};

const greetMyBindFn1 = greet.bind(person, "Hi");
const greetMyBindFn2 = greet.bind(person, "Hello");
console.log(greetMyBindFn1("Bengaluru"));
console.log(greetMyBindFn2("Chennai"));
