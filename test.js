import Capture from './capture';

let capture = Capture
	.html('abc')
	.pdf(function(pdf) {
		return pdf
			.scale(1)
			.displayHeaderFooter()
			.landscape()
			.printBackground()
			.a0();
	});

// .capture();


// console.log(capture.capture().toString('base64'));

console.log(capture.serializePayload());
