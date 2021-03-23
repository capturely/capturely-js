import {request} from 'node:https';

class Api {
	uri: string = 'api.capturely.app';
	
	data: any = {};
	
	constructor(data) {
		this.data = data
	}
	
	public create(): Buffer | any {
		const responseEncoding = 'utf8';
		
		const api = request({
			hostname: this.uri,
			port: '443',
			path: '/',
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": this.acceptHeader(),
				"Authorization": this.authorizationToken(),
			}
		}, (res) => {
			let responseBufs = [];
			let responseStr = '';
			
			res
				.on('data', (chunk) => {
					if (Buffer.isBuffer(chunk)) {
						responseBufs.push(chunk);
					} else {
						responseStr = responseStr + chunk;
					}
				})
				.on('end', () => {
					responseStr = responseBufs.length > 0 ?
						Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;

					if (res.headers["content-type"] !== 'text/plain') {
						let buff = Buffer.from(responseStr, 'base64');
						
						return binary(buff);
					} else {
						return callback(null, res.statusCode, res.headers["content-type"], responseStr);
					}
				});
			
		})
			.setTimeout(0)
			.on('error', (error) => {
				return callback(error);
			});
		
		api.write(JSON.stringify(this.data))
		api.end();
		
		let callback = function (error, statusCode = null, headers = null, body = null) {
			console.log('ERROR:', error);
			console.log('STATUS:', statusCode);
			console.log('HEADERS:', JSON.stringify(headers));
			console.log('BODY:', body);
		}
		
		let binary = function (buffer): Buffer {
			return buffer;
		}
	}
	
	protected authorizationToken() {
		return 1234;
	}
	
	protected isPdf() {
		return undefined !== this.data.options.pdf;
	}
	
	protected isScreenshot() {
		return undefined !== this.data.options.screenshot;
	}
	
	protected isScreenshotBinary() {
		return this.isScreenshot() && this.data.options.screenshot.encoding === 'binary';
	}
	
	protected isStream() {
		return this.data.hasOwnProperty('stream');
	}
	
	protected acceptHeader(): string {
		if (this.isStream()) {
			
			if (this.isPdf()) {
				return 'application/pdf';
			}
			
			if (this.isScreenshotBinary()) {
				let type = this.data['screenshot.type'] || 'png';
				
				return `image/${type}`;
			}
			
		}
		
		return 'application/json';
	}
}

export default Api;
