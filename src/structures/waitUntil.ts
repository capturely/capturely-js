///<reference path="abstractStructure.ts"/>
import AbstractStructure from "./abstractStructure";

class WaitUntil extends AbstractStructure {
	
	protected waitUntil: string[] = [];
	
	public load() {
		this.waitUntil.push('load');
		
		return this;
	}
	
	public domContentLoaded() {
		this.waitUntil.push('domcontentloaded');
		
		return this;
	}
	
	public networkIdle0() {
		this.waitUntil.push('networkidle0');
		
		return this;
	}
	
	public networkIdle2() {
		this.waitUntil.push('networkidle2');
		
		return this;
	}
	
}

export default WaitUntil;
