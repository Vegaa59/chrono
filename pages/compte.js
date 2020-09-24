let audio = new Audio("../son/alarm.mp3");
let ol = document.createElement("ol");
let heures = 0
let minutes = 0
let secondes = 0
let timerID
document.chronoForm.supprime.style.display = "none";

onkeydown = function (e) {
  if (e.keyCode === 32) {
    retenir();
  }
  if (e.keyCode === 8) {
    supprime();
  }
}

function select_times() {
  let select_hr = document.getElementById("select_heures").value;
  let select_min = document.getElementById("select_minutes").value;
  let select_sec = document.getElementById("select_secondes").value;
  heures = select_hr;
  minutes = select_min;
  secondes = select_sec;
  pause();
  document.getElementById("selection").style.display = "none";
}


for (let j = 0; j < 25; j++) {
  let option = document.createElement("option");
  select_heures.appendChild(option);
  option.innerHTML = j;
}

for (let k = 0; k < 60; k++) {
  let option_minutes = document.createElement("option");
  select_minutes.appendChild(option_minutes);
  option_minutes.innerHTML = k;
}
for (let l = 0; l < 60; l++) {
  let option_secondes = document.createElement("option");
  select_secondes.appendChild(option_secondes);
  option_secondes.innerHTML = l;
}

function chrono() {
  if (secondes > 0) {
    secondes--;
  } else if (minutes > 0) {
    minutes--;
    secondes = 59;
  } else if (heures > 0) {
    heures--;
    minutes = 59;
    secondes = 59;
  }
  if (heures <= 0 && minutes <= 0 && secondes <= 0) {
    audio.play();
  }

  let hour = heures < 10 ? "0" + heures : heures;
  let min = minutes < 10 ? "0" + minutes : minutes;
  let sec = secondes < 10 ? "0" + secondes : secondes;

  document.chronoForm.reset.onclick = reset;
  document.chronoForm.supprime.onclick = supprime;
  document.getElementById("chronotime").value = `${hour}:${min}:${sec}`;
  timerID = setTimeout("chrono()", 1000);
}

function pause() {
  let hour = heures < 10 ? "0" + heures : heures;
  let min = minutes < 10 ? "0" + minutes : minutes;
  let sec = secondes < 10 ? "0" + secondes : secondes;
  document.chronoForm.startstop.value = "start";
  document.chronoForm.startstop.onclick = reprendre;
  document.getElementById("chronotime").value = `${hour}:${min}:${sec}`;
  clearTimeout(timerID);
}

function reprendre() {
  document.getElementById("selection").style.display = "none";
  document.chronoForm.startstop.value = "stop";
  document.chronoForm.startstop.onclick = pause;
  document.chronoForm.reset.onclick = reset;
  chrono();
}

function reset() {
  let hour = heures < 10 ? "0" + heures : heures;
  let min = minutes < 10 ? "0" + minutes : minutes;
  let sec = secondes < 10 ? "0" + secondes : secondes;
  supprime();
  document.getElementById("chronotime").value = `${hour}:${min}:${sec}`;
  pause();
  document.getElementById("selection").style.display = "flex";
}


function retenir() {
  document.chronoForm.supprime.style.display = "block";
  let i = document.chronoForm.chronotime.value;
  document.getElementById("statretenu").appendChild(ol);
  let li = document.createElement("li");
  ol.appendChild(li);
  li.innerHTML = `Temp restant : ${i}`;
  document.chronoForm.interval.onClick = retenir;
  document.chronoForm.supprime.onclick = supprime;
}

function supprime() {
  while (ol.firstChild) {
    ol.removeChild(ol.firstChild);
  }
  document.chronoForm.supprime.style.display = "none";
}