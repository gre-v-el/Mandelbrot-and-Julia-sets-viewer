// per frame variables
uniform vec2 picked; 

// per pixel variables
varying vec2 UV;

// consts
const int ITERATIONS = 500;


void main() { 
	
	vec2 c = picked;
	vec2 z = UV;
	float escapeTime = 0.;

	int i = 0;
	while(z.x*z.x + z.y*z.y < 4. && i < ITERATIONS){
		float xtemp = z.x*z.x - z.y*z.y + c.x;
		z.y = 2.*z.x*z.y + c.y;
		z.x = xtemp;
		i ++;
	}

	float ratio = float(i)/float(ITERATIONS);

	gl_FragColor = vec4(vec3(ratio*ratio), 1.);
}