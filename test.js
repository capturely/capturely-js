import Capture from './capture';

let capture = Capture
	.html('abc')
	.stream()
	.pdf();
	// .capture();


console.log(capture.capture().toString('base64'));

// console.log(capture.serializePayload());
