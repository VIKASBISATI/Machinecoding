const handleChange = ({ target: { value } }) => {
  console.log(value);
};

const myDebouce = (fn, d) => {
  let timer = 0;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, d);
  };
};

const myThrottle = (fn, d) => {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= d) {
      last = now;
      fn(...args);
    }
  };
};

const debouncedChange = myDebouce(handleChange, 1000);

const throttledChange = myThrottle(handleChange, 500);

const input = document.getElementById("myInput");
input.addEventListener("input", (e) => {
  debouncedChange(e);
});

input.addEventListener("input", (e) => {
    throttledChange(e);
});
