///<reference path="abstract.ts"/>
import Abstract from "./abstract";

class Pdf extends Abstract {
	scale: number;
	
	setScale(val: number) {
		this.scale = val;
		
		return this;
	}
}

export default Pdf;
