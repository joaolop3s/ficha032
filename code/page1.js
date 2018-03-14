"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{
	var elAnim = document.getElementById("animLast");

	elAnim.addEventListener("animationend", animLastAnimEndHandler);
}




function animLastAnimEndHandler(ev)
{
	var el = ev.target;
	el.removeEventListener("animationend", animLastAnimEndHandler);

	//remove animation elements from the main tag
	el.parentNode.removeChild(el.parentNode.children[0]);
	el.parentNode.removeChild(el.parentNode.children[0]);

	startVideo();
}

function startVideo() {
	var video = document.getElementsByTagName("video")[0];
	video.style.display = "block";
	video.addEventListener("ended", endVideo);
	video.play();
}

function endVideo(ev) {
	window.parent.endVideo(ev);
}


/*
ADD CODE
*/
