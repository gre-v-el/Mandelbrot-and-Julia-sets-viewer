document.addEventListener('contextmenu', event => event.preventDefault());

var canvas = document.getElementById("canvas");

var controls = {
	w: false, a: false, s: false, d: false, e: false, q: false,
	mouseLeft: false, mouseRight: false, mouseX: 0, mouseY: 0, mouseDX: 0, mouseDY: 0,
	mouseScroll: 1,
	doUpdate: false
}
var prevControls = {
	w: false, a: false, s: false, d: false, e: false, q: false,
	mouseLeft: false, mouseRight: false, mouseX: 0, mouseY: 0, mouseDX: 0, mouseDY: 0,
	mouseScroll: 1,
	doUpdate: false
};

function updateControls(){
	prevControls.w = controls.w;
	prevControls.a = controls.a;
	prevControls.s = controls.s;
	prevControls.d = controls.d;
	prevControls.e = controls.e;
	prevControls.q = controls.q;
	prevControls.mouseLeft = controls.mouseLeft;
	prevControls.mouseRight = controls.mouseRight;
	prevControls.mouseX = controls.mouseX;
	prevControls.mouseY = controls.mouseY;
	prevControls.mouseDX = controls.mouseDX;
	prevControls.mouseDY = controls.mouseDY;
	prevControls.mouseScroll = controls.mouseScroll;
	prevControls.doUpdate = controls.doUpdate;

	controls.mouseDY = 0;
	controls.mouseDX = 0;

	controls.mouseScroll = 0;

	controls.doUpdate = false;
}

canvas.onwheel = function (e) {
	controls.doUpdate = true;

	controls.mouseScroll += e.deltaY;
}

canvas.onkeydown = function (e) {
	controls.doUpdate = true;
	
	switch (e.code) {
		case 'KeyW':
			controls.w = true;
			break;
		case 'KeyA':
			controls.a = true;
			break;
		case 'KeyS':
			controls.s = true;
			break;
		case 'KeyD':
			controls.d = true;
			break;
		case 'KeyE':
			controls.e = true;
			break;
		case 'KeyQ':
			controls.q = true;
			break;
	}
};
canvas.onkeyup = function (e) {
	controls.doUpdate = true;
	
	switch (e.code) {
		case 'KeyW':
			controls.w = false;
			break;
		case 'KeyA':
			controls.a = false;
			break;
		case 'KeyS':
			controls.s = false;
			break;
		case 'KeyD':
			controls.d = false;
			break;
		case 'KeyE':
			controls.e = false;
			break;
		case 'KeyQ':
			controls.q = false;
			break;
	}
};

canvas.onmousedown = function (e) {
	controls.doUpdate = true;
	
	if(e.button == 0) controls.mouseLeft = true;
	if(e.button == 2) controls.mouseRight = true;
};
document.onmouseup = function (e) {
	controls.doUpdate = true;
	
	if(e.button == 0) controls.mouseLeft = false;
	if(e.button == 2) controls.mouseRight = false;
};

document.onmousemove = function (e) {
	controls.doUpdate = true;
	
	controls.mouseDX += e.movementX;
	controls.mouseDY += e.movementY;

	controls.mouseX = e.clientX;
	controls.mouseY = e.clientY;
}