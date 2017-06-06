console.log('logging from client side');

setTimeout(() => {
	fetch('127.0.0.1:8081/process_get')
		.then((data) => {
		console.log(data);
	}).catch((error) => {
		console.log(error);
	});
}, 5000);

