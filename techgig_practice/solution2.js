process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});


process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
	let in_arr = input_stdin_array.slice(0,2);
    let input_array = input_stdin_array.slice(2, parseInt(in_arr[1],10) + 2);
    let no_of_words = 1;
    for(let i = 1; i < in_arr[1]; i++) {
        if (input_array[i] - input_array[i-1] > in_arr[0]) {
            no_of_words = 1;
        } else no_of_words += 1;
    }    
    process.stdout.write(""+no_of_words);
});
