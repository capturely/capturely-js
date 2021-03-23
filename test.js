import Capturely from './capturely';

let capture = Capturely
	.html('abc')
	.pdf(function(pdf) {
		return pdf
			.scale(1)
			.displayHeaderFooter()
			.landscape()
			.printBackground()
			.a0()
			.margin(10, 12, 15, 21);
	})
	.screenshot(function(ss) {
		return ss.jpeg(80);
	})
	.stream();

// .capture();


// console.log(capture.capture().toString('base64'));

console.log(capture.serializePayload());
