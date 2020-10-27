console.log('hello world');
function abc() {
	var a = 10;
	let b = 10;
	if (true) {
		a = 20;
	let	b = 20;
		// b = 20;
		console.log(a,'.........', b);
	}
	console.log(a, '.......', b);
}

abc();
// console.log(a, '.......', b); // try with removing comments here
