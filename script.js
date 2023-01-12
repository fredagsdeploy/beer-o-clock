function parseOptions() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  return { t: getTimeParam(params.t), d: getDateParam(params.d), b: getBeverageParam(params.b) }
}

function getTimeParam(timeStr) {
  if (timeStr && timeStr.length === 4) {
    const timeNbr = Number(timeStr);
    if (timeNbr && timeNbr >= 0 && timeNbr <= 2400) {
      return {
        hours: Number(timeStr.slice(0, 2)),
        minutes: Number(timeStr.slice(2, 4))
      }
    }
  }

  return {
    hours: 15,
    minutes: 0
  }
}

function getDateParam(dateStr){
  if (dateStr && dateStr.length === 8) {
    const parts = dateStr.split('-').map(s => Number(s));
    if (parts.length === 3) {
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
  }
}

function getBeverageParam(beverageStr) {
  if (beverageStr && beverageStr.length === 4) {
    return beverageStr.toUpperCase()
  } else {
    return "BEER";
  }
}

const options = parseOptions()

function nextDate() {
  const today = new Date();
  if (options.d){
    today.setDate(options.d.getDate())
  } else if (today.getDay() !== 5) {
    today.setDate(today.getDate() + (5 - 1 - today.getDay() + 7) % 7 + 1);
  }
  const { hours, minutes } = options.t;
  today.setHours(hours, minutes, 0);

  return today;
}

const target = nextDate().getTime();
console.log(target);

function render() {
  const today = new Date().getTime();
  const beverage = options.b;

  // get the difference
  const diff = target - today;

  // math
  let days = Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0);
  let hours = Math.max(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 0);
  let minutes = Math.max(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)), 0);
  let seconds = Math.max(Math.floor((diff % (1000 * 60)) / 1000), 0);

  // change timer to hype if necessary
  if (days + hours + minutes + seconds === 0) {
    days = beverage[0];
    hours = beverage[1];
    minutes = beverage[2];
    seconds = beverage[3];
  }

  document.getElementById("header").textContent = beverage + " O'CLOCK"

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
