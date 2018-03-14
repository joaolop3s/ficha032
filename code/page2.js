"use strict";


const opacDisabled = 0.3;  //transparência para botões desactivados
const imgFolder = "../resources/image/";
const txtFolder = "../resources/text/";
const audioVolume = 1;
var conta=0;


(function()
{
	window.addEventListener("load", main);
}());


function main()
{

	var totImg = 16;
	var curImg = 1;

	var photo = document.getElementById("photo");
	photo.src = imgFolder + "0" + curImg + ".jpg";

	var text = document.getElementById("text");
	text.src = txtFolder + "0" + curImg + ".txt";

	var aud= new Audio();
		aud.src = "../resources/audio/track.mp3";


	var nextBtn = document.getElementById("nextBtn");
	var backBtn = document.getElementById("backBtn");
	var firstBtn = document.getElementById("firstBtn");
	var lastBtn = document.getElementById("lastBtn");
	var slideShowBtn = document.getElementById("slideShowBtn");
	var soundBtn = document.getElementById("soundBtn");

	activateDesactivateBtn(curImg, nextBtn, backBtn, firstBtn, backBtn);

	var naveBtn = function(ev) {
		curImg = naveBtnClickHandler(ev, curImg, totImg, photo, text, nextBtn, backBtn, firstBtn, lastBtn);
	}

	var slideBtn = function(ev)
	{
		slideBtnClickHandler(ev, curImg, totImg, photo, text);
	}

	var soundhandler = function(ev){
		soundclickhandler(ev,soundBtn,aud);
	}

	slideShowBtn.addEventListener("click", slideBtn);
	nextBtn.addEventListener("click", naveBtn);
	backBtn.addEventListener("click", naveBtn);
	firstBtn.addEventListener("click", naveBtn);
	lastBtn.addEventListener("click", naveBtn);
	soundBtn.addEventListener("click",soundhandler);

}

function soundclickhandler(ev,soundBtn,aud){
	if(conta==0){
		soundBtn.innerHTML='<img src="../resources/extra/soundOnBtn.png" />';
		aud.play();
		conta=1;
	}else{
		soundBtn.innerHTML='<img src="../resources/extra/soundOffBtn.png" />';
		aud.pause();
		conta=0;
	}
}


function atualiza(curImg, photo, text, tecla, myVar, nextBtn, backBtn, firstBtn, lastBtn ) {
	console.log("-->"+tecla);

	if (tecla == 115) {
		clearInterval(myVar);
		activateDesactivateBtn(curImg, nextBtn, backBtn, firstBtn, lastBtn);
	}
	curImg++;

	if (curImg <= 16)
		actualizePhotoText(curImg, photo, text);
	else
		curImg = 1;

	return curImg;
}


function slideBtnClickHandler(ev, curImg, totImg, photo, text) {
	var firstBtn = document.getElementById("firstBtn");
	var backBtn = document.getElementById("backBtn");
	var nextBtn = document.getElementById("nextBtn");
	var lastBtn = document.getElementById("lastBtn");

	desactivate(firstBtn);
	desactivate(backBtn);
	desactivate(nextBtn);
	desactivate(lastBtn);

	var tecla=5, myVar=0;

	var act = function(ev) {
		curImg = atualiza(curImg, photo, text, tecla, myVar, nextBtn, backBtn, firstBtn, lastBtn);
	}

	var keyP = function(ev) {
		tecla = KeyPressedHandler(ev);
	}
	window.addEventListener("keypress", keyP);

	// timer
	var myVar = setInterval(act, 2000);

}

function exitHandler(ev, slideBtn, exitSlide) {
	console.log("removendo listeners");
	var btn = ev.currentTarget;
	btn.removeEventListener("exitclick", exitSlide);
	btn.removeEventListener("click", slideBtn);
}

function KeyPressedHandler(ev) {
	console.log("handler"+ev.keyCode);

	return ev.keyCode;
}

function changeSlide(curImg, photo, text) {
	curImg++;
	actualizePhotoText(curImg, photo, text);
	console.log("slide");
}

function naveBtnClickHandler(ev, curImg, totImg, photo, text, nextBtn, backBtn, firstBtn, lastBtn) {
	console.log("imagem: "+curImg);
	if (ev.currentTarget.id == "nextBtn" && curImg < 16) {
		curImg++;
	}
	else if (ev.currentTarget.id == "backBtn" && curImg >= 2) {
		curImg--;
	}
	else if (ev.currentTarget.id == "firstBtn") {
		console.log("first");
		curImg = 1;

	}
	else if (ev.currentTarget.id == "lastBtn") {
		curImg = 16;
	}

	activateDesactivateBtn(curImg, nextBtn, backBtn, firstBtn, lastBtn);
	actualizePhotoText(curImg, photo, text);

	return curImg;

}

function activateDesactivateBtn(curImg, nextBtn, backBtn, firstBtn, lastBtn) {
	console.log(curImg);
	if (curImg == 1) {
		activate(nextBtn);
		activate(lastBtn);
		desactivate(backBtn);
		desactivate(firstBtn);
	}
	else if (curImg == 16) {
		activate(backBtn);
		activate(firstBtn);
		desactivate(nextBtn);
		desactivate(lastBtn);
	}
	else {
		activate(nextBtn);
		activate(lastBtn);
		activate(backBtn);
		activate(firstBtn);
	}
}

function actualizePhotoText(curImg, photo, text) {
	console.log("a atualizar...");

	var s = "";
	if (curImg < 10) {
		var s = "0";
	}

	photo.src = imgFolder + s + curImg + ".jpg";
	text.src = txtFolder + s + curImg + ".txt";
}

function activate(btn) {
	btn.disable = true;
	btn.style.cursor = "pointer";
	btn.style.opacity = 1;
}

function desactivate(btn) {
	btn.disable = true;
	btn.style.cursor = "initial";
	btn.style.opacity = opacDisabled;
}
