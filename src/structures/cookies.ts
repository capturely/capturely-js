///<reference path="abstractStructure.ts"/>
import AbstractStructure from "./abstractStructure";

class Cookies extends AbstractStructure {
	
	protected cookies: object[] = [];
	
	public make(
		name: string,
		value: string,
		url: string | null = null,
		domain: string | null = null,
		path: string | null = null,
		expires: string | null = null,
		httpOnly: boolean | null = null,
		secure: boolean | null = null,
		sameSite: string | null = 'Lax'
	) {
		this.cookies.push({name, value, url, domain, path, expires, httpOnly, secure, sameSite});
		
		return this;
	}
}

export default Cookies;
