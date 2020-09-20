let heures = Number(prompt("combien d'heures"));
let minutes = Number(prompt("combien de minutes"));
let secondes = Number(prompt("combien de secondes"));
let audio = new Audio('../son/alarm.mp3');
let ol = document.createElement("ol");

window.onload = chrono();

test = new Date()
console.log(test)

function chrono(){
  if(secondes > 0) {
       secondes-- ;
  } else if(minutes > 0) {
        minutes-- ;
        secondes = 59;
  } else if(heures > 0) {
       heures-- ;
        minutes = 59;
        secondes = 59;
  }
  if(heures <= 0 && minutes <= 0 && secondes <= 0){
	  audio.play()
  }

  let hour = heures < 10 ? "0" + heures : heures ;
  let min = minutes < 10 ? "0" + minutes : minutes ;
  let sec = secondes < 10 ? "0" + secondes : secondes ;

  document.getElementById("chronotime").value = hour + ":" + min + ":" + sec;
  timerID = setTimeout("chrono()", 1000);
  document.chronoForm.reset.onclick = reset
}

function pause(){
      let hour = heures < 10 ? "0" + heures : heures ;
      let min = minutes < 10 ? "0" + minutes : minutes ;
      let sec = secondes < 10 ? "0" + secondes : secondes ;

	document.chronoForm.startstop.value = "start"
      document.chronoForm.startstop.onclick = reprendre
      document.getElementById("chronotime").value = hour + ":" + min + ":" + sec;

      clearTimeout(timerID);
}

function reprendre(){
	document.chronoForm.startstop.value = "stop"
	document.chronoForm.startstop.onclick = pause
      document.chronoForm.reset.onclick = reset
      chrono();
}

function reset(){
      heures = Number(prompt("combien d'heures"));
      minutes = Number(prompt("combien de minutes"));
      secondes = Number(prompt("combien de secondes"));
      let hour = heures < 10 ? "0" + heures : heures ;
      let min = minutes < 10 ? "0" + minutes : minutes ;
      let sec = secondes < 10 ? "0" + secondes : secondes ;
      while (ol.firstChild) {
		ol.removeChild(ol.firstChild);
        }
        document.getElementById("chronotime").value = hour + ":" + min + ":" + sec;
        pause()
}

function retenir(){
	let i = document.chronoForm.chronotime.value
	document.getElementById('statretenu').appendChild(ol);
	var li = document.createElement("li");
	ol.appendChild(li);
      li.innerHTML= "Temp restant : "+ i ;
	document.chronoForm.interval.onClick = retenir
}








