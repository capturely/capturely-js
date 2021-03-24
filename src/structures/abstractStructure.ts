class AbstractStructure {
	
	toFormattedObject() {
		let object = {};
		
		Object.getOwnPropertyNames(this)
			.forEach((property) => {
				let name = property.slice(0, -5);
				
				object[name] = this[property];
			});
		
		return object;
	}
}

export default AbstractStructure;
