// scored 0 on techgig that showing test cases to be failed
process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";

process.stdin.on('data', function (data) {
    input_stdin += data;
    if (data.length < 3) {
      process.exit();
    }
});


process.on('exit', function () {
    input_stdin_array = input_stdin.split("\r\n");
    let array1 = input_stdin_array[1];
    let array2 = input_stdin_array[3];
	let item  = input_stdin_array[4];
    let output = -1;
    if (array1.includes(item)) {
        output = 1;
    } else if(array2.includes(item)) {
        output = 2;
    }
	//Write code here
    
    process.stdout.write(""+output);
});
