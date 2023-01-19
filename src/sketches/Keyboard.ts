// IMPORTED LIB-TYPES
import type P5 from 'p5';
// IMPORTED UTILS
import { gray } from '$utils/colors';

class Keyboard {
	p5: P5;
	x = 0;
	y = 0;
	width = 0;
	height = 0;

	// UTILS
	getBoundary() {
		return [this.x, this.y, this.width, this.height] as [number, number, number, number];
	}

	// EVENTS
	update() {
		this.width = window.innerWidth;
		this.height = this.width * 0.14;
		this.x = 0;
		this.y = window.innerHeight - this.height;
	}
	draw() {}
	windowResized() {
		this.update();
	}

	constructor(p5: P5) {
		this.p5 = p5;
		this.update();
	}
}

export default Keyboard;
