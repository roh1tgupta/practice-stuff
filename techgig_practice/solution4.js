process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";

process.stdin.on('data', function (data) {
    input_stdin += data;
});


process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    let md = [31,28,31,30,31,30,31,31,30,31,30,31];
	let totaldays = md[input_stdin_array[0] - 1];
    let noofcolumns = 1;
    let daysremaining = totaldays - (8 - input_stdin_array[1]);
    while(daysremaining > 7) {
        noofcolumns += 1;
        daysremaining -= 7;
    } 
	//Write code here
    
    process.stdout.write(""+(noofcolumns + 1));
});
