///<reference path="structures/pdf.ts"/>
import Pdf from "./structures/pdf";
import Api from "./api";

class Capture {
	html: string | null = null;
	url: string | null = null;
	pdfObject: object | null = null;
	screenshotObject: object | null = null;
	viewportObject: object | null = null;
	cookies: object = [];
	userAgent: string | null = null;
	authentication: object | null = null;
	extraHttpHeaders: object | null = null;
	waitUntil: object | null = null;
	emulateMediaType: string | null = null;
	shouldStream: boolean = false;
	
	static html(html: string) {
		return new Capture().setHtml(html)
	}
	
	static url(url: string) {
		return new Capture().setUrl(url)
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
	
	public pdf(input: Function | null) {
		
		this.screenshotObject = null;
		
		this.pdfObject = typeof input === 'function' ? (input(new Pdf())).toObject() : (new Pdf).toObject();
		
		return this;
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
		
		return this.cleanEmpty(data);
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

export default Capture;
