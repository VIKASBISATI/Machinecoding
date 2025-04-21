function promiseAll(promises) {
  let res = [],
    count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p).then((val) => {
        res[i] = val;
        count++;
        if (count === promises.length) resolve(res);
      }, reject);
    });
  });
}

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p).then(resolve, reject);
    });
  });
}

function promiseAllSettled(promises) {
  let res = [],
    count = 0;
  return new Promise((resolve) => {
    promises.forEach((p) => {
      Promise.resolve(p)
        .then((value) => {
          res[i] = { status: "fulfilled", value };
        })
        .catch((err) => {
          res[i] = { status: "rejected", reason: err };
        })
        .finally(() => {
          count++;
          if (count === promises.length) resolve(res);
        });
    });
  });
}

function promiseAny(promises) {
  let rejections = [],
    count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((err) => {
          count++;
          rejections[i] = err;
          if (count === promises.length)
            reject(
              new AggregateError(rejections, "All promises were rejected")
            );
        });
    });
  });
}
