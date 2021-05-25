import Capturely from "../src/capturely";

test('assert the generated config',()=>{
	let payload = Capturely
		.html('abc')
		.pdf(function(pdf) {
			return pdf
				.scale(1)
				.displayHeaderFooter()
				.landscape()
				.printBackground()
				.a6()
				.margin(10, 12, 15, 21);
		})
		.serializePayload();
	
	
	expect(payload).toBe({
	
	});
});

// .capture();


// console.log(capture.capture().toString('base64'));

// console.log(capture.serializePayload());
