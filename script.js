let startTime = 0;
let start = 0;
let end = 0;
let diff = 0;
let timerID = 0;
document.chronoForm.supprime.style.display = "none";
window.onload = chronoStop;

onkeydown = function (e) {
  if (e.keyCode === 32) {
    retenir();
  }
  if (e.keyCode === 8) {
    supprime();
  }
}

function chrono() {
  let end = new Date();
  let diff = end - start;
  diff = new Date(diff);
  let msec = diff.getMilliseconds();
  let sec = diff.getSeconds();
  let min = diff.getMinutes();
  let hr = diff.getHours() - 1;
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (msec < 10) {
    msec = "00" + msec;
  } else if (msec < 100) {
    msec = "0" + msec;
  }
  document.getElementById("chronotime").value = `${hr}:${min}:${sec}:${msec}`;
  timerID = setTimeout("chrono()", 10);
  document.chronoForm.supprime.onclick = supprime;
}

function chronoStart() {
  document.chronoForm.startstop.value = "stop";
  document.chronoForm.startstop.onclick = chronoStop;
  document.chronoForm.reset.onclick = chronoReset;
  start = new Date();
  chrono();
}

function chronoContinue() {
  document.chronoForm.startstop.value = "stop";
  document.chronoForm.startstop.onclick = chronoStop;
  document.chronoForm.reset.onclick = chronoReset;
  start = new Date() - diff;
  start = new Date(start);
  chrono();
}

function chronoReset() {
  document.getElementById("chronotime").value = "0:00:00:000";
  start = new Date();
}

function chronoStopReset() {
  document.getElementById("chronotime").value = "0:00:00:000";
  document.chronoForm.startstop.onclick = chronoStart;
}

function chronoStop() {
  document.chronoForm.startstop.value = "start";
  document.chronoForm.startstop.onclick = chronoContinue;
  document.chronoForm.reset.onclick = chronoStopReset;
  document.chronoForm.supprime.onclick = supprime;
  clearTimeout(timerID);
}

let ol = document.createElement("ol");

function retenir() {
  document.chronoForm.supprime.style.display = "block";
  let i = document.chronoForm.chronotime.value;
  document.getElementById("statretenu").appendChild(ol);
  let li = document.createElement("li");
  ol.appendChild(li);
  li.innerHTML = "Temp validé à : " + i;
  document.chronoForm.interval.onClick = retenir;
}

function supprime() {
  while (ol.firstChild) {
    ol.removeChild(ol.firstChild);
  }
  document.chronoForm.supprime.style.display = "none";
}