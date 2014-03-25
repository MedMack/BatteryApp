/* Feel free to change this code however your want ~Mack */

// récupération de l'instance battery à partie du navigateur ou device
var battery = navigator.battery || navigator.mozBattery || navigator.webkitBattery;
// navigator.battery pour FirefoxOS
// navigator.mozBattery pour le navigateur Firefox ( Gecko )
// navigator.webkitBattery pour Chrome et les navigateurs qui utilisent webkit


//la fonction de base qui fera tout le traitement
function getBatteryStatus(){
	//récupération des éléments où on va mettre les valeurs retournées de la battrie
	var level = document.getElementById("blevel"); // niveau
	var status = document.getElementById("bstatus"); //statut
	var ctime = document.getElementById("ctime"); //temps jusqu'au chargement
	var dtime = document.getElementById("dtime"); //temps jusqu'au déchargement
	
	//un test message sur la console
	console.log("------- Update --------");
	console.log("Battery status: " + battery.level * 100 + " %");
	console.log("Charging time : " + battery.chargingTime);
	console.log("Discharging time : " + battery.dischargingTime);

	//temps jusqu'au chargement - calcul et convertion ( valeur retournée par battery.charginTime est en secondes )
	var cmin = Math.floor(battery.chargingTime/60);
	var chrs = Math.floor(battery.chargingTime/3600);
	var csec = Math.floor(battery.chargingTime%60);

	//temps jusqu'au déchargement - calcul et convertion ( valeur retournée par battery.discharginTime est en secondes )
	var dmin = Math.floor(battery.dischargingTime/60);
	var dhrs = Math.floor(battery.dischargingTime/3600);
	var dsec = Math.floor(battery.dischargingTime%60);

	//mise à jour des valeurs sur la page


	//mise à jour du niveau de chargement
	level.innerHTML="Battery level : "+battery.level*100+"%";

	//mise à jour du statut ( en charge ou non )
	if (battery.charging) {
    	console.log("Battery is charging");
    	status.innerHTML="Battery Status : Charging";
    	if (cmin=="Infinity"){
    		ctime.innerHTML="Charging Time : Not Available";
    	}
    	else
    	ctime.innerHTML="Charging Time : "+chrs+" Hours "+cmin+" min "+csec+" sec";
    	dtime.style.display="none";
    	ctime.style.display="block";
  	}
  	else {
    	console.log("Battery is not charging");
    	status.innerHTML="Battery Status : Not charging";
    	if (dmin=="Infinity"){
    		dtime.innerHTML="Discharging Time : Not Available";
    	}
    	else
    	dtime.innerHTML="Discharging Time : "+dhrs+" Hours "+dmin+" min "+dsec+" sec";
    	ctime.style.display="none";
    	dtime.style.display="block";
  	}
  	//Appel de la fonction de la jauge du niveau de la batterie
  	getBatteryLevel();
}

// Event listener : si le niveau ou le statut ou le temps restant, la fonction sera appelée une autre fois pour l'update
// Pour tester : essayez de mettre ou enlever le chargeur de votre PC ou Smartphone et vous verrez que le statut sera changé
battery.addEventListener("levelchange", getBatteryStatus, false);
battery.addEventListener("chargingchange", getBatteryStatus, false);
battery.addEventListener("chargintimechange", getBatteryStatus, false);
battery.addEventListener("dischargingtimechange", getBatteryStatus, false);

function getBatteryLevel(){
	//la fonction de la jauge du niveau de la batterie
	// changer la couleur de la jauge selon le niveau de la batterie
	document.getElementById("jauge").style.width=""+battery.level*100+"%";
	document.getElementById("jauge").style.backgroundColor="green";
	if(battery.level*100 >= 0 && battery.level*100 <= 20)
		document.getElementById("jauge").style.backgroundColor="red";
	else if(battery.level*100 > 20 && battery.level*100 <= 40)
		document.getElementById("jauge").style.backgroundColor="orange";
	else if(battery.level*100 > 40 && battery.level*100 <= 99)
		document.getElementById("jauge").style.backgroundColor="green";
	else if(battery.level*100 == 100)
		document.getElementById("jauge").style.backgroundColor="blue";
}