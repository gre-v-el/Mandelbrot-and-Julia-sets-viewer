var iterationsInput = document.getElementById("iterations-input");
var interpolationInput = document.getElementById("interpolation-input");
var powerInput = document.getElementById("power-input");

var inspector = {
	iterations: 500,
	interpolation: 1,
	power: 2
};

iterationsInput.addEventListener('input', function() {
	inspector.iterations = iterationsInput.value;
	controls.doUpdate = true;
});

interpolationInput.addEventListener('input', function() {
	inspector.interpolation = interpolationInput.value;
	controls.doUpdate = true;
});

powerInput.addEventListener('input', function() {
	inspector.power = powerInput.value;
	controls.doUpdate = true;
});