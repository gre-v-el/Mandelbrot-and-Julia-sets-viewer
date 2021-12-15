// per frame variables
uniform vec2 picked; 
uniform float scale;
uniform float juliaInterpolation;
uniform bool isJulia;

// per pixel variables
varying vec2 UV;

// consts
const int ITERATIONS = 500;


void main() { 
	
	vec2 c = UV;
	c = mix(c, picked, juliaInterpolation);
	vec2 z = UV;

	int i = 0;
	while(z.x*z.x + z.y*z.y < 4. && i < ITERATIONS){
		float xtemp = z.x*z.x - z.y*z.y + c.x;
		z.y = 2.*z.x*z.y + c.y;
		z.x = xtemp;
		i ++;
	}

	float ratio = float(i)/float(ITERATIONS);

	
	float pointer = 
	step(-0.01 * scale, picked.x - UV.x) * step(picked.x - UV.x, 0.01*scale) *
	step(-0.01 * scale, picked.y - UV.y) * step(picked.y - UV.y, 0.01*scale);

	gl_FragColor = vec4(vec3(ratio*ratio) + pointer, 1.);
}