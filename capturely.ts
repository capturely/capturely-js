///<reference path="structures/pdf.ts"/>
import Pdf from "./structures/pdf";
import Api from "./api";
import Screenshot from "./structures/screenshot";
import AbstractStructure from "./structures/abstractStructure";
import Viewport from "./structures/viewport";

class Capturely {
	protected html: string | null = null;
	protected url: string | null = null;
	protected pdfObject: object | null = null;
	protected screenshotObject: object | null = null;
	protected viewportObject: object | null = null;
	protected cookies: object = [];
	protected userAgent: string | null = null;
	protected authentication: object | null = null;
	protected extraHttpHeaders: object | null = null;
	protected waitUntil: object | null = null;
	protected emulateMediaType: string | null = null;
	protected shouldStream: boolean = false;
	
	static html(html: string) {
		return new Capturely().setHtml(html)
	}
	
	static url(url: string) {
		return new Capturely().setUrl(url)
	}
	
	public setHtml(html: string) {
		this.url = null;
		
		this.html = html;
		
		return this;
	}
	
	public setUrl(url: string) {
		this.html = null;
		
		this.url = url;
		
		return this;
	}
	
	/**
	 * @param input
	 */
	public pdf(input: Function | Pdf | null) {
		this.screenshotObject = null;
		
		this.pdfObject = this.resolveFunction(input, new Pdf());
		
		return this;
	}
	
	public screenshot(input: Function | Screenshot | null) {
		this.pdfObject = null;
		
		this.screenshotObject = this.resolveFunction(input, new Screenshot());
		
		return this;
	}
	
	public viewport(input: Function | Viewport | null) {
		this.viewportObject = this.resolveFunction(input, new Viewport());
		
		return this;
	}
	
	protected resolveFunction(input: Function | AbstractStructure | null, className: AbstractStructure) {
		return typeof input === 'function' ? (input(className)).toFormattedObject() : className.toFormattedObject()
	}
	
	stream() {
		this.shouldStream = true;
		
		return this;
	}
	
	capture(): Buffer {
		return (new Api()).create(this.serializePayload());
	}
	
	serializePayload() {
		let data = {
			'from': {
				'url': this.url,
				'html': this.html,
			},
			'options': {
				'pdf': this.pdfObject,
				'screenshot': this.screenshotObject,
			},
			'cookies': this.cookies,
			'viewport': this.viewportObject,
			'authentication': this.authentication,
			'extraHttpHeaders': this.extraHttpHeaders,
			'waitUntil': this.waitUntil,
			'userAgent': this.userAgent,
			'emulateMediaType': this.emulateMediaType,
			'stream': this.shouldStream,
		};
		
		return JSON.stringify(this.cleanEmpty(data), null, '  ');
	}
	
	private cleanEmpty = obj => {
		if (Array.isArray(obj)) {
			return obj
				.map(v => (v && typeof v === 'object') ? this.cleanEmpty(v) : v)
				.filter(v => !(v == null));
		} else {
			return Object.entries(obj)
				.map(([k, v]) => [k, v && typeof v === 'object' ? this.cleanEmpty(v) : v])
				.reduce((a, [k, v]) => (v == null ? a : (a[k] = v, a)), {});
		}
	}
}

export default Capturely;
