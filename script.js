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
var rmUniforms = {
	aspect: { value: cameraThree.aspect },
	center: {value: new THREE.Vector2(-1, 0)},
	scale: {value: 1}
};

// load shaders and create the scene
var vertex = '';
var fragment = '';
loader.load('/shaders/fragment.glsl', function (data) { fragment = data; countLoads(); })
loader.load('/shaders/vertex.glsl', function (data) { vertex = data; countLoads(); })

var loadsLeft = 2;
function countLoads() {
	loadsLeft--;
	if (loadsLeft == 0) {
		// main display setup
		var quadDisplay = new THREE.Mesh(
			new THREE.PlaneGeometry(2, 2),
			new THREE.ShaderMaterial({
				vertexShader: vertex,
				fragmentShader: fragment,
				uniforms: rmUniforms,
				depthWrite: false,
				depthTest: false
			})
		);
		sceneThree.add(quadDisplay);
	}
}


function tick() {
	var dt = clock.getDelta();

	if(controls.mouseLeft){
		rmUniforms.center.value.x -= 
			controls.mouseDX / canvasHTML.width * rmUniforms.scale.value;
		rmUniforms.center.value.y += 
			controls.mouseDY / canvasHTML.height * rmUniforms.scale.value;
	}
	
	rmUniforms.scale.value /= Math.pow(1.005, controls.mouseScroll);


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
		rmUniforms.aspect.value = cameraThree.aspect;
	}
	rendererThree.render(sceneThree, cameraThree);
}

tick();