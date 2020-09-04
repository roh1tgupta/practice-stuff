process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});


process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n")[0].split('');
    for (let i=0; i < input_stdin_array.length; i++) {
        if (input_stdin_array[i].toLowerCase() === 'a') {
            let element = input_stdin_array[i];
            for(let j = i; j > 0; j--) {
                input_stdin_array[j] = input_stdin_array[j-1];
                if (j === 1) {
                    input_stdin_array[0] = element;
                }
            }
        }
    }
    
    process.stdout.write(""+input_stdin_array.join().replace(/,/g, ''));
});
