///<reference path="abstractStructure.ts"/>
import AbstractStructure from "./abstractStructure";

class Viewport extends AbstractStructure {
	
	protected widthValue: number;
	
	protected heightValue: number;
	
	protected deviceScaleFactorValue: number = 1;
	
	protected isMobileValue: boolean = false;
	
	protected hasTouchValue: boolean = false;
	
	protected isLandscapeValue: boolean = false;
	
	public windowSize(width: number, height: number) {
		this.widthValue = width;
		this.heightValue = height;
		
		return this;
	}
	
	public deviceScaleFactor(deviceScaleFactor: number) {
		this.deviceScaleFactorValue = deviceScaleFactor;
		
		return this;
	}
	
	public isMobile(isMobile: boolean = true) {
		this.isMobileValue = isMobile;
		
		return this;
	}
	
	public hasTouch(hasTouch: boolean = true) {
		this.hasTouchValue = hasTouch;
		
		return this;
	}
	
	public isLandscape(isLandscape: boolean = true) {
		this.isLandscapeValue = isLandscape;
		
		return this;
	}
	
}

export default Viewport;
