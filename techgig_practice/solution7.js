// scored 0 on techgig that showing test cases to be failed
process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});


process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n")[1].split(' ');
    for(let i = input_stdin_array.length - 2; i >= 0; i--) {
        if (input_stdin_array[i] === '0') {
            let k = i;
            while (k < input_stdin_array.length - 1) {
                input_stdin_array[k] = input_stdin_array[k+1];
                k += 1;
            }
            if (k !== i) {
                input_stdin_array[k] = 0;
            }
        }
    }
	//Write code here
    
    process.stdout.write(""+input_stdin_array.join().replace(/,/g,' '));
});
