function slowSquare(n) {
  console.log("calculating");
  return n * n;
}

function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.log("cache");
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const memoizedSquare = memoize(slowSquare);

console.log(memoizedSquare(5));
console.log(memoizedSquare(5));