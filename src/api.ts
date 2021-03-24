import axios from "axios";
import ApiErrorException from "./exceptions/apiErrorException";

class Api {
	uri: string = 'https://api.capturely.app';
	
	data: any = {};
	
	constructor(data) {
		this.data = data
	}
	
	public async create() {
		let api = this;
		
		return await axios({
			method: 'post',
			url: this.uri,
			data: this.data,
			headers: {
				'Content-Type': 'application/json',
				'Accept': this.acceptHeader(),
				'Authorization': this.authorizationToken(),
			},
			responseType: this.isStream() ? 'blob' : 'json',
			timeout: 30001,
		})
			.then(function (response) {
				if (api.isStream()) {
					return response.data;
				}
				
				return {
					url: response.data.url,
					size: response.data.size,
				};
				
			})
			.catch(function (error) {
				throw new ApiErrorException(error.message);
			});
	}
	
	protected authorizationToken() {
		return process.env.CAPTURELY_TOKEN;
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
		return this.data.stream === true;
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
