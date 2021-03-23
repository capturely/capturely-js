///<reference path="abstract.ts"/>
import AbstractStructure from "./abstract";

class Screenshot extends AbstractStructure {
	
	protected typeValue: string = 'jpeg';
	
	protected qualityValue: number | null = 90;
	
	protected fullPageValue: boolean = false;
	
	protected clipValue: object | null = null;
	
	protected omitBackgroundValue: boolean = false;
	
	protected encodingValue: string = 'binary';
	
	public jpeg(quality: number = 90) {
		this.typeValue = 'jpeg';
		this.qualityValue = quality;
		
		return this;
	}
	
	public png() {
		this.typeValue = 'png';
		this.qualityValue = null;
		
		return this;
	}
	
	public fullPage() {
		this.clipValue = null;
		
		this.fullPageValue = true;
		
		return this;
	}
	
	public clip(x: number, y: number, width: number, height: number) {
		this.clipValue = {x, y, width, height}
		
		return this;
	}
	
	public omitBackground(omitBackground: boolean = true) {
		this.omitBackgroundValue = omitBackground
		
		return this;
	}
	
	public binary() {
		this.encodingValue = 'binary';
		
		return this;
	}
	
	public base64() {
		this.encodingValue = 'base64';
		
		return this;
	}
	
}

export default Screenshot;
