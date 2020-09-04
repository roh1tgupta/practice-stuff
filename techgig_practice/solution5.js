// this only scored 60/100 dont know why
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
    input_stdin_array = input_stdin.split("\r\n")[0].split('');
    let uniqarray = [];
    input_stdin_array.map((ele) => {
        if (!uniqarray.includes(ele)) {
            uniqarray.push(ele);
        }
    });
    let k = 0;
    for (let i = 0; i < input_stdin_array.length -1; i++) {
        if (input_stdin_array[i] === input_stdin_array[i+1]) {
            while(uniqarray[k] === input_stdin_array[i] || ( i && uniqarray[k] === input_stdin_array[i-1])) {
                k++;
                if (k === uniqarray.length) {
                  k = 0;
                }
            }
            input_stdin_array[i] = uniqarray[k];
        }
    }
	//Write code here
    process.stdout.write(""+input_stdin_array.join().replace(/,/g,''));
});
