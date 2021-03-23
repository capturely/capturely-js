///<reference path="abstract.ts"/>
import AbstractStructure from "./abstract";

class Pdf extends AbstractStructure {
	
	private scaleValue: number;
	
	private displayHeaderFooterValue: boolean = false;
	
	private headerTemplateValue: string;
	
	private footerTemplateValue: string;
	
	private printBackgroundValue: boolean = false;
	
	private landscapeValue: boolean = false;
	
	private pageRangesValue: string = '';
	
	private formatValue: string = null;
	
	private widthValue: string = null;
	
	private heightValue: string = null;
	
	private marginValue: object = null;
	
	private preferCSSPageSizeValue: boolean = false;
	
	public scale(val: number) {
		this.scaleValue = val;
		
		return this;
	}
	
	public displayHeaderFooter(displayHeaderFooter: boolean = true) {
		this.displayHeaderFooterValue = displayHeaderFooter;
		
		return this;
	}
	
	public printBackground(printBackground: boolean = true) {
		this.printBackgroundValue = printBackground;
		
		return this;
	}
	
	public landscape(landscape: boolean = true) {
		this.landscapeValue = landscape;
		
		return this;
	}
	
	public letter() {
		return this.format('letter');
	}
	
	public legal() {
		return this.format('legal');
	}
	
	public tabloid() {
		return this.format('tabloid');
	}
	
	public ledger() {
		return this.format('ledger');
	}
	
	public a0() {
		return this.format('a0');
	}
	
	public a1() {
		return this.format('a1');
	}
	
	public a2() {
		return this.format('a2');
	}
	
	public a3() {
		return this.format('a3');
	}
	
	public a4() {
		return this.format('a4');
	}
	
	public a5() {
		return this.format('a5');
	}
	
	public a6() {
		return this.format('a6');
	}
	
	public width(width: number | string, unit: string = 'mm') {
		this.widthValue = width + unit;
		
		return this;
	}
	
	public height(height: number | string, unit: string = 'mm') {
		this.heightValue = height + unit;
		
		return this;
	}
	
	public margin(top: number, right: number, bottom: number, left: number, unit: string = 'mm') {
		this.marginValue = {
			'top': top + unit,
			'right': right + unit,
			'bottom': bottom + unit,
			'left': left + unit,
		};
		
		return this;
	}
	
	public pageRanges(pageRanges: string = '') {
		this.pageRangesValue = pageRanges;
		
		return this;
	}
	
	public preferCSSPageSize(preferCSSPageSize: boolean = true) {
		this.preferCSSPageSizeValue = preferCSSPageSize;
		
		return this;
	}
	
	public headerTemplate(headerTemplate: string) {
		this.displayHeaderFooter();
		
		this.headerTemplateValue = headerTemplate;
		
		return this;
	}
	
	public footerTemplate(footerTemplate: string) {
		this.displayHeaderFooter();
		
		this.footerTemplateValue = footerTemplate;
		
		return this;
	}
	
	private format(string: string) {
		this.formatValue = string.charAt(0).toUpperCase() + string.slice(1);
		
		return this;
	}
	
}

export default Pdf;
