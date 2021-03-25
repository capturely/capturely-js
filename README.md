### capturely.app

#### Usage

```javascript
import Capturely from "./capturely";

let capturely = Capturely
    .html('<strong>I am strong</strong')
    .pdf()
    .capture();

console.log(capturely);

/**
 * {
 *    url: 'https://s3-url',
 *    size: 1234 //bytes
 * }
 */

// or steam directly -- return binary blob
return Capturely
	.html('<strong>I am strong</strong')
	.pdf()
	.stream();


```
