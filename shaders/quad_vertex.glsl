uniform float aspect;
uniform vec2 center;
uniform float scale;
uniform float xDisplacement;

varying vec2 UV;



void main() {
	UV = (uv - vec2(0.5)) * vec2(aspect, 1);
	UV *= scale;
	UV += center;

	gl_Position = vec4(position.x + xDisplacement, position.y, 0, 1.0);
}