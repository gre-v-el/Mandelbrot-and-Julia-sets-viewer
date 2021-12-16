// per frame variables
uniform vec2 picked; 
uniform float scale;
uniform float juliaInterpolation;
uniform bool isJulia;
uniform int iterations;
uniform float power;

// per pixel variables
varying vec2 UV;

float distSq(vec2 a, vec2 b){
	return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y); 
}
float distSq(vec2 a){
	return a.x * a.x + a.y * a.y; 
}

vec2 complexPow(vec2 c, float power){
	float r = distSq(c);
	float theta = atan(c.y, c.x);

	r = pow(r, power/2.);
	theta *= power;

	return vec2(r*cos(theta), r*sin(theta));
}

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
	while( (z.x*z.x + z.y*z.y < 4. && i < iterations) || i < 1){
		z = complexPow(z, power);
		z += c;
		i ++;

		nearest = min(nearest, min(abs(z.x), abs(z.y)));
		average += min(abs(z.x), abs(z.y));
	}
	average /= float(i);

	// draw pointer
	float pointer = isJulia?0.:
		smoothstep(0.0001 * scale * scale, 0.00005 * scale * scale, distSq(UV, picked)) *
		smoothstep(0.00003 * scale * scale, 0.00005 * scale * scale, distSq(UV, picked));
		// step(-0.0015 * scale, picked.x - UV.x) * step(picked.x - UV.x, 0.0015*scale) *
		// step(-0.015 * scale, picked.y - UV.y) * step(picked.y - UV.y, 0.015*scale) +
		
		// step(-0.015 * scale, picked.x - UV.x) * step(picked.x - UV.x, 0.015*scale) *
		// step(-0.0015 * scale, picked.y - UV.y) * step(picked.y - UV.y, 0.0015*scale);

	vec3 nearestColor = vec3(0.7804, 0.9216, 0.0) * vec3(2.*(1.-pow(10.*nearest, 0.1)));
	vec3 averageColor = vec3(0.0745, 0.4392, 0.0) * vec3(pow(0.5*average, 0.5));
	vec3 basicColor   = vec3(0.0,    0.8824, 1.0) * vec3(float(i)/float(iterations));

	vec3 color = (nearestColor + averageColor + basicColor) * vec3(0.5);

	color = mix(color, vec3(1.) - color, pointer);

	gl_FragColor = vec4(color, 1.);
}