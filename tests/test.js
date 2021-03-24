import Capturely from "../src/capturely";

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
	.capture();

// .capture();


// console.log(capture.capture().toString('base64'));

// console.log(capture.serializePayload());
