function sum(...args1) {
  let s = args1.reduce((a, b) => a + b, 0);
  return function inner(...args2) {
    if (!args2.length) return s;
    s += args2.reduce((a, b) => a + b, 0);
    return inner;
  };
}

console.log(sum(1)(2)(3)());
console.log(sum(1, 2)(3)());
console.log(sum(1)(2, 3)());
console.log(sum(1, 2, 3)());

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...nextArgs) {
        return curried(...args, ...nextArgs);
      };
    }
  };
}
function currySum(a, b, c, d) {
  return a + b + c + d;
}

let curriedSum = curry(currySum);

// console.log(curriedSum(1, 2, 3, 4));
console.log(curriedSum(1)(2, 3)(4));
// console.log(curriedSum(1)(2)(3)(4));
