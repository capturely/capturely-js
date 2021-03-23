import Capturely from './capturely';

let capture = Capturely
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
	// .screenshot(function(screenshot) {
	// 	return screenshot
	// 		.jpeg(80)
	// 		.binary();
	// })
	.waitUntil(function(wait){
		return wait.networkIdle0();
	})
	.viewport()
	.stream();

console.log(capture);

// .capture();


// console.log(capture.capture().toString('base64'));

// console.log(capture.serializePayload());
