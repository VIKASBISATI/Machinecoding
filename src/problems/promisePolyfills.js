class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.onFulfilled = [];
    this.onRejected = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilled.forEach((fn) => {
            console.log("here after 1s");
            return fn(value)
        });
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.value = reason;
        this.onRejected.forEach((fn) => fn(value));
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(fn) {
    if (this.state === "fulfilled") {
      fn(this.value);
    } else if (this.state === "pending") {
      this.onFulfilled.push(fn);
    }
    return this;
  }

  catch(fn) {
    if (this.state === "rejected") {
      fn(this.value);
    } else if (this.state === "pending") {
      this.onRejected.push(fn);
    }
    return this;
  }
}

const p1 = new MyPromise((resolve) => {
    setTimeout(() => {
        resolve("Hello");
    },1000)
});

const p2 = new MyPromise((_, reject) => {
  reject("OOPS!!");
});

p1.then((res) => {
  console.log("Resolved with then:", res);
});
