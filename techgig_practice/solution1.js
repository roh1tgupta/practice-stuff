
process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
	if (data.length < 3) {
	  process.exit();
	}
	input_stdin += data;
	// OR (better way)
	// input_stdin += data;
	// process.exit();
});


process.on('exit', function () {
    input_array = input_stdin.split("");
    let ref_array = ['!', '!', '!', '!'];
    let array = [0,0,0,0];
    let i = 0; 	
	//Write code here
    input_array.forEach((ele) => {
        if (ele === '!') {
            array[i] += 1;
        } else if (ref_array[i] === '!') {
			ref_array[i] = ele.toLowerCase();
		}
        i +=1;
		if (i === 4) {
			i = 0;
		}
        
	})
	console.log('ref_array',ref_array);
	console.log('array', array);
	let arr = [];
	i = ref_array.indexOf('r');
	arr.push(array[i]);
	i = ref_array.indexOf('b');
	arr.push(array[i]);
	i = ref_array.indexOf('y');
	arr.push(array[i]);
	i = ref_array.indexOf('g');
	arr.push(array[i]);
	
	
    process.stdout.write(""+arr.join().replace(/,/g, ' '));
});