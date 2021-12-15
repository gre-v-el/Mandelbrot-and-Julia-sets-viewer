import * as THREE from '/three.module.js' // 'https://threejs.org/build/three.module.js'

var root = ''; // 'https://gre-v-el.github.io/Mandelbrot-and-Julia-sets-viewer/'

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
	center: { value: new THREE.Vector2(-0.6, 0) },
	scale: { value: 5 },
	xDisplacement: { value: -0.5 },
	picked: { value: new THREE.Vector2(-1, 0) },
	juliaInterpolation: { value: 0 },
	isJulia: { value: false },
	iterations: { value: 500 },
	power: {value: 2}
};
var juliaUniforms = {
	aspect: { value: cameraThree.aspect },
	center: { value: new THREE.Vector2(0, 0) },
	scale: { value: 5 },
	xDisplacement: { value: 0.5 },
	picked: { value: new THREE.Vector2(-1, 0) },
	juliaInterpolation: { value: 1 },
	isJulia: { value: true },
	iterations: { value: 500 },
	power: {value: 2}
};

// load shaders and create the scene
var quadVertex = '';
var fractalFragment = '';
var juliaFragment = '';
loader.load(root + '/shaders/fractal_fragment.glsl', function (data) { fractalFragment = data; countLoads(); })
loader.load(root + '/shaders/quad_vertex.glsl', function (data) { quadVertex = data; countLoads(); })

var loadsLeft = 2;
function countLoads() {
	loadsLeft--;
	if (loadsLeft == 0) {
		// main display setup
		var mandelbrotDisplay = new THREE.Mesh(
			new THREE.PlaneGeometry(1, 2),
			new THREE.ShaderMaterial({
				vertexShader: quadVertex,
				fragmentShader: fractalFragment,
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
				fragmentShader: fractalFragment,
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

	if (controls.doUpdate) {
		var impacted = controls.mouseX > canvasHTML.width / 2 ? juliaUniforms : mandelbrotUniforms;

		if (controls.mouseRight) {
			impacted.center.value.x -=
				controls.mouseDX / canvasHTML.width * 2 * impacted.scale.value;
			impacted.center.value.y +=
				controls.mouseDY / canvasHTML.height * impacted.scale.value;
		}
		if (controls.mouseLeft && impacted == mandelbrotUniforms) {
			juliaUniforms.picked.value = new THREE.Vector2(
				(controls.mouseX / canvasHTML.width * 2 - 0.5) * mandelbrotUniforms.aspect.value * mandelbrotUniforms.scale.value + mandelbrotUniforms.center.value.x,
				-(controls.mouseY / canvasHTML.height - 0.5) * mandelbrotUniforms.scale.value + mandelbrotUniforms.center.value.y
			);

			mandelbrotUniforms.picked.value = juliaUniforms.picked.value;

		}
		impacted.scale.value *= Math.pow(1.002, controls.mouseScroll);

		mandelbrotUniforms.iterations.value = inspector.iterations;
		juliaUniforms.iterations.value = inspector.iterations;

		mandelbrotUniforms.power.value = inspector.power;
		juliaUniforms.power.value = inspector.power;

		juliaUniforms.juliaInterpolation.value = inspector.interpolation;
	}

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
		mandelbrotUniforms.aspect.value = cameraThree.aspect / 2;
		juliaUniforms.aspect.value = cameraThree.aspect / 2;
	}
	rendererThree.render(sceneThree, cameraThree);
}

tick();