function getTimeParam() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const timeStr = params.t;
  if (timeStr && timeStr.length === 4) {
    const timeNbr = parseInt(timeStr, 10);
    if (timeNbr && timeNbr >= 0 && timeNbr <= 2400) {
      return {
        hours: parseInt(timeStr.slice(0, 2)),
        minutes: parseInt(timeStr.slice(2, 4))
      }
    }
  }
}

function getDateParam(){
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const dateStr = params.d;
  if (dateStr && dateStr.length === 8) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      return date
    }
  }
}

function getBeverageParam() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const beverageStr = params.b;
  if (beverageStr && beverageStr.length === 4) {
    return beverageStr.toUpperCase()
  }
}


function nextDate() {
  const today = new Date();
  const dateParam = getDateParam();
  if (dateParam){
    today.setDate(dateParam.getDate()) 
  }
  else if (today.getDay() !== 5) {
    today.setDate(today.getDate() + (5 - 1 - today.getDay() + 7) % 7 + 1);
  }
  today.setHours(15, 0, 0);

  const timeParam = getTimeParam();
  if(timeParam) {
    today.setHours(timeParam.hours, timeParam.minutes, 0);
  }

  return today;
}

const target = nextDate().getTime();
console.log(target);

function render() {
  const today = new Date().getTime();
  const beverage = getBeverageParam() ?? "BEER"

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
