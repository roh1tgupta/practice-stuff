process.on('message', (numbers) => {
  // Calculate sum of squares for the chunk
  const sum = numbers.reduce((acc, num) => acc + num * num, 0);
  process.send(sum); // Send result back to parent
  process.exit(); // Exit child process
});