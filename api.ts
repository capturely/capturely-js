import {request} from 'node:https';

class Api {
	uri: string = 'api.capturely.app';
	
	public create(data: string): Buffer | any {
		const responseEncoding = 'utf8';
		
		const api = request({
			hostname: this.uri,
			port: '443',
			path: '/',
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*"
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
					
					if (res.headers["content-type"] !== 'text/html') {
						let buff = Buffer.from(responseStr, 'base64');
						
						binary(buff);
					} else {
						callback(null, res.statusCode, res.headers["content-type"], responseStr);
					}
					
					
				});
			
		})
			.setTimeout(0)
			.on('error', (error) => {
				callback(error);
			});
		
		api.write(JSON.stringify(data))
		api.end();
		
		let callback = function (error, statusCode = null, headers = null, body = null) {
			// console.log('ERROR:', error);
			// console.log('STATUS:', statusCode);
			// console.log('HEADERS:', JSON.stringify(headers));
			// console.log('BODY:', body);
		}
		
		let binary = function (buffer): Buffer {
			return buffer;
		}
	}
}

export default Api;
