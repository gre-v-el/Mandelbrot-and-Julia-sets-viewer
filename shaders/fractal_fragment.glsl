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
	// define initial numbers
	// juliaInt == 0: mandelbrot | juliaInt == 1: julia | inbetween gives different results
	vec2 c = UV;
	c = mix(c, picked, juliaInterpolation); 
	vec2 z = UV;

	// orbit traps
	float best = 10.;

	// iterate
	int i = 0;
	while(z.x*z.x + z.y*z.y < 4. && i < ITERATIONS){
		float xtemp = z.x*z.x - z.y*z.y + c.x;
		z.y = 2.*z.x*z.y + c.y;
		z.x = xtemp;
		i ++;

		best = min(best, length(z + picked));
	}

	// coloring

	// draw pointer
	float pointer = isJulia?0.:
		step(-0.0015 * scale, picked.x - UV.x) * step(picked.x - UV.x, 0.0015*scale) *
		step(-0.015 * scale, picked.y - UV.y) * step(picked.y - UV.y, 0.015*scale) +
		
		step(-0.015 * scale, picked.x - UV.x) * step(picked.x - UV.x, 0.015*scale) *
		step(-0.0015 * scale, picked.y - UV.y) * step(picked.y - UV.y, 0.0015*scale);

	vec3 color = vec3(1.-best)* vec3(0.1294, 0.6118, 0.0824);

	gl_FragColor = i==ITERATIONS?vec4(0., 0., 0., 1.):vec4(pointer>0.?1.-color:color, 1.);
}