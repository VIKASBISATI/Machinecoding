function mySetInterval(d) {
  let count = 0;
  let timer = setTimeout(() => {
    console.log("here");
    count++;
    mySetInterval(d);
  }, d);
  return [timer, count];
}

function myClearTimeOut(timerId) {
  clearTimeout(timerId);
}

let [timer, count] = mySetInterval(1000);

console.log(count);
