var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0
window.onload = chronoStop;
function chrono(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	var msec = diff.getMilliseconds()
	var sec = diff.getSeconds()
	var min = diff.getMinutes()
	var hr = diff.getHours()-1
	if (min < 10){
		min = "0" + min
	}
	if (sec < 10){
		sec = "0" + sec
	}
	if(msec < 10){
		msec = "00" +msec
	}
	else if(msec < 100){
		msec = "0" +msec
	} 
	document.getElementById("chronotime").value = hr + ":" + min + ":" + sec + ":" + msec
	timerID = setTimeout("chrono()", 10)
}
function chronoStart(){
	document.chronoForm.startstop.value = "stop"
	document.chronoForm.startstop.onclick = chronoStop
	document.chronoForm.reset.onclick = chronoReset
	start = new Date()
	chrono()
}
function chronoContinue(){
	document.chronoForm.startstop.value = "stop"
	document.chronoForm.startstop.onclick = chronoStop
	document.chronoForm.reset.onclick = chronoReset
	start = new Date()-diff
	start = new Date(start)
	chrono()
}
function chronoReset(){
	document.getElementById("chronotime").value = "0:00:00:000"
	while (ol.firstChild) {
		ol.removeChild(ol.firstChild);
	  }
	start = new Date()
}
function chronoStopReset(){
	document.getElementById("chronotime").value = "0:00:00:000"
	document.chronoForm.startstop.onclick = chronoStart
	document.chronoForm.reset.onclick = supprime
}
function chronoStop(){
	document.chronoForm.startstop.value = "start"
	document.chronoForm.startstop.onclick = chronoContinue
	document.chronoForm.reset.onclick = chronoStopReset
	clearTimeout(timerID)
}

var ol = document.createElement("ol");

function retenir(){
	let i = document.chronoForm.chronotime.value
	document.getElementById('statretenu').appendChild(ol);
	var li = document.createElement("li");
	ol.appendChild(li);
    li.innerHTML= "Temp validé à : "+ i ;
	document.chronoForm.interval.onClick = retenir
}


function supprime(){
	while (ol.firstChild) {
		ol.removeChild(ol.firstChild);
	  }
}

