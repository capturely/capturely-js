class Abstract {
	toObject() {
		
		let renamed = {};
		
		Object.getOwnPropertyNames(this)
			.forEach((name) => {
				let new_name = name.slice(0, -5);
				
				renamed[new_name] = this[name];
			});
		
		return renamed;
	}
}

export default Abstract;
