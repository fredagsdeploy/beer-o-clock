
function nextDate() {
  const today = new Date();
  if(today.getDay() !== 5) {
    today.setDate(today.getDate() + (5 - 1 - today.getDay() + 7) % 7 + 1);
  }
  today.setHours(15, 0, 0);
  return today;
}
const target = nextDate().getTime();
console.log(target);

function render() {
  const today = new Date().getTime();

  // get the difference
  const diff = target - today;

  // math
  let days = Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0);
  let hours = Math.max(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 0);
  let minutes = Math.max(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)), 0);
  let seconds = Math.max(Math.floor((diff % (1000 * 60)) / 1000), 0);

  // change timer to hype if necessary
  if (days + hours + minutes + seconds === 0) {
    days = "B";
    hours = "E";
    minutes = "E";
    seconds = "R";
  }

  // display
  document.getElementById("timer").innerHTML =
    "<div class=\"days\"> \
  <div class=\"numbers\">" + days + "</div>days</div> \
<div class=\"hours\"> \
  <div class=\"numbers\">" + hours + "</div>hours</div> \
<div class=\"minutes\"> \
  <div class=\"numbers\">" + minutes + "</div>minutes</div> \
<div class=\"seconds\"> \
  <div class=\"numbers\">" + seconds + "</div>seconds</div> \
</div>";
}

render();

// countdown
setInterval(render, 1000);
