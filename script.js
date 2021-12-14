import * as THREE from '/three.module.js'

// three.js setups
var canvasHTML = document.getElementById('canvas');
var sceneThree = new THREE.Scene();
var rendererThree = new THREE.WebGLRenderer({ canvas: canvasHTML, antialias: true });
var cameraThree = new THREE.PerspectiveCamera(45, canvasHTML.clientWidth / canvasHTML.clientWidth, 1, 1000);
var clock = new THREE.Clock();
var loader = new THREE.FileLoader();

// fps view
var script = document.createElement('script');
var stats;
script.onload = function () {
	stats = new Stats();
	document.body.appendChild(stats.dom);
};
script.src = ''// '//mrdoob.github.io/stats.js/build/stats.min.js';
document.head.appendChild(script);

// uniforms
var mandelbrotUniforms = {
	aspect: { value: cameraThree.aspect },
	center: {value: new THREE.Vector2(-0.6, 0)},
	scale: {value: 5},
	xDisplacement: {value: -0.5},
	picked: {value: new THREE.Vector2()}
};
var juliaUniforms = {
	aspect: { value: cameraThree.aspect },
	center: {value: new THREE.Vector2(0, 0)},
	scale: {value: 5},
	xDisplacement: {value: 0.5},
	picked: {value: new THREE.Vector2(1, 0)}
};

// load shaders and create the scene
var quadVertex = '';
var mandelbrotFragment = '';
var juliaFragment = '';
loader.load('/shaders/mandelbrot_fragment.glsl', function (data) { mandelbrotFragment = data; countLoads(); })
loader.load('/shaders/quad_vertex.glsl', function (data) { quadVertex = data; countLoads(); })
loader.load('/shaders/julia_fragment.glsl', function (data) { juliaFragment = data; countLoads(); })

var loadsLeft = 3;
function countLoads() {
	loadsLeft--;
	if (loadsLeft == 0) {
		// main display setup
		var mandelbrotDisplay = new THREE.Mesh(
			new THREE.PlaneGeometry(1, 2),
			new THREE.ShaderMaterial({
				vertexShader: quadVertex,
				fragmentShader: mandelbrotFragment,
				uniforms: mandelbrotUniforms,
				depthWrite: false,
				depthTest: false
			})
		);
		sceneThree.add(mandelbrotDisplay);


		var juliaDisplay = new THREE.Mesh(
			new THREE.PlaneGeometry(1, 2),
			new THREE.ShaderMaterial({
				vertexShader: quadVertex,
				fragmentShader: juliaFragment,
				uniforms: juliaUniforms,
				depthWrite: false,
				depthTest: false
			})
		);
		sceneThree.add(juliaDisplay);
	}
}


function tick() {
	var dt = clock.getDelta();

	if(controls.mouseRight){
		mandelbrotUniforms.center.value.x -= 
			controls.mouseDX / canvasHTML.width*2 * mandelbrotUniforms.scale.value;
		mandelbrotUniforms.center.value.y += 
			controls.mouseDY / canvasHTML.height * mandelbrotUniforms.scale.value;
	}
	if(controls.mouseLeft){
		juliaUniforms.picked.value = new THREE.Vector2(
			(controls.mouseX / canvasHTML.width*2 - 0.5) * mandelbrotUniforms.aspect.value * mandelbrotUniforms.scale.value + mandelbrotUniforms.center.value.x,
			-(controls.mouseY / canvasHTML.height - 0.5) * mandelbrotUniforms.scale.value + mandelbrotUniforms.center.value.y
		);

		mandelbrotUniforms.picked.value = juliaUniforms.picked.value;
	}
	
	mandelbrotUniforms.scale.value *= Math.pow(1.002, controls.mouseScroll);


	updateControls();

	render();
	if (stats != undefined) stats.update();
	requestAnimationFrame(tick);
}

function render() {

	if (canvasHTML.width !== canvasHTML.clientWidth || canvasHTML.height !== canvasHTML.clientHeight) {
		rendererThree.setSize(canvasHTML.clientWidth, canvasHTML.clientHeight, false);
		cameraThree.aspect = canvasHTML.clientWidth / canvasHTML.clientHeight;
		cameraThree.updateProjectionMatrix();
		mandelbrotUniforms.aspect.value = cameraThree.aspect/2;
		juliaUniforms.aspect.value = cameraThree.aspect/2;
	}
	rendererThree.render(sceneThree, cameraThree);
}

tick();