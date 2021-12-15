// per frame variables
uniform vec2 picked; 
uniform float scale;
uniform float juliaInterpolation;
uniform bool isJulia;
uniform int iterations;

// per pixel variables
varying vec2 UV;

void main() { 
	// define initial numbers
	// juliaInt == 0: mandelbrot | juliaInt == 1: julia | inbetween gives different results
	vec2 c = UV;
	c = mix(c, picked, juliaInterpolation); 
	vec2 z = UV;

	// orbit traps
	float nearest = 10e5;
	float average = 0.;

	// iterate
	int i = 0;
	while(z.x*z.x + z.y*z.y < 4. && i < iterations){
		float xtemp = z.x*z.x - z.y*z.y + c.x;
		z.y = 2.*z.x*z.y + c.y;
		z.x = xtemp;
		i ++;

		//nearest = min(nearest, pow(10.*min(abs(z.x), abs(z.y)), 0.1)*1.);
		nearest = min(nearest, min(abs(z.x), abs(z.y)));
		average += min(abs(z.x), abs(z.y));
	}
	average /= float(i);

	// draw pointer
	float pointer = isJulia?0.:
		step(-0.0015 * scale, picked.x - UV.x) * step(picked.x - UV.x, 0.0015*scale) *
		step(-0.015 * scale, picked.y - UV.y) * step(picked.y - UV.y, 0.015*scale) +
		
		step(-0.015 * scale, picked.x - UV.x) * step(picked.x - UV.x, 0.015*scale) *
		step(-0.0015 * scale, picked.y - UV.y) * step(picked.y - UV.y, 0.0015*scale);

	vec3 nearestColor = vec3(0.7804, 0.9216, 0.0) * vec3(2.*(1.-pow(10.*nearest, 0.1)));
	vec3 averageColor = vec3(0.0745, 0.4392, 0.0) * vec3(pow(0.5*average, 0.5));
	vec3 basicColor   = vec3(0.0, 0.8824, 1.0) * vec3(float(i)/float(iterations));

	vec3 color = (nearestColor + averageColor + basicColor) * vec3(0.5);

	color = mix(color, vec3(1.) - color, pointer);

	gl_FragColor = vec4(color, 1.);
}