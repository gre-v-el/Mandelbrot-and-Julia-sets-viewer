// per frame variables

// per pixel variables
varying vec2 UV;

// consts
const int ITERATIONS = 100;


void main() { 
	
	vec2 c = UV;
	vec2 z = UV;
	float escapeTime = 0.;

	int i = 0;
	while(z.x*z.x + z.y*z.y < 4. && i < ITERATIONS){
		float xtemp = z.x*z.x - z.y*z.y + c.x;
		z.y = 2.*z.x*z.y + c.y;
		z.x = xtemp;
		i ++;
	}

	gl_FragColor = vec4(vec3(float(i)/float(ITERATIONS)), 1.);
}