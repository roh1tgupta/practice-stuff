
{/* <Buffer 6c 6c 6f 20 77 6f 6c 72 64 20 66 72 6f 6d 20 38 74 68 20 6e 6f 76 68 65 6c 6c 6f 20 77 6f 6c 72 64 20 66 72 6f 6d 20 38 74 68 20 6e 6f 76> */}
// Buffer object in Node.js,: which is a raw representation of binary data. 
// However, the content of the buffer is hexadecimal (base 16) representation of bytes


const buffer = Buffer.from("Hello, World!");
console.log(buffer, "...from line #8");

const buffer2 = Buffer.allocUnsafe(10); // Create a buffer of length 10, uninitialized
console.log(buffer2, "......from line #12");

const buffer1 = Buffer.alloc(10); // Create a buffer of length 10, initialized with zeros
console.log(buffer1, "....from line #15");


// Buffer.alloc(size)
// Purpose: Creates a new Buffer of the specified size and initializes it with zeroes.
// Initialization: The memory is initialized to zero, which means the buffer is safe to use immediately as it doesn’t contain any leftover data from previous uses.
// Performance: Because it initializes the memory, it might be slower compared to Buffer.allocUnsafe for very large buffers.

// Buffer.allocUnsafe(size)
// Purpose: Creates a new Buffer of the specified size without initializing the memory.
// Initialization: The memory is not initialized, which means it may contain old or sensitive data. This can be a security risk if the buffer is used without being explicitly filled with data.
// Performance: Generally faster than Buffer.alloc because it skips the initialization step.



const buffer3 = Buffer.alloc(10);
console.log(buffer3.write("Hello"), "....output from buffer write, line #30");
console.log(buffer3, "....from line #31");
console.log(buffer3.toString(), "......from lime 32");


const buffer4 = Buffer.from('Hello, World!');
console.log(buffer4.toString(), "buffer 4");
const slice = buffer4.slice(0, 8);
console.log(slice, "...from line #38");
console.log(slice.toString());
console.log(buffer4.write("updatedcontent"))
console.log(slice, "....line #41")
console.log(slice.toString(), "....line #42")

// Buffer.slice does not create a new copy of the data; instead, it creates a new Buffer that 
// shares the same allocated memory as the original buffer. This means that modifying the data in 
// the sliced buffer will also modify the data in the original buffer.



const buffer5 = Buffer.from('Hello, World!');
const buffer6 = Buffer.alloc(5);
buffer5.copy(buffer6, 0, 0, 5); // buffer.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
console.log(buffer6.toString(), "... line#48");
console.log(buffer6, "......line#49");


// The buffer.copy method in Node.js is used to copy a portion of data from one Buffer to another.
// buffer.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])


const length = Buffer.byteLength(buffer6);
console.log(length, "....length");

const leng = Buffer.byteLength("hello rohit how s u");
console.log(leng, "....length");

const buffer9 = Buffer.from("Hello, ");
const buffer7 = Buffer.from("World!");
const buffer8 = Buffer.concat([buffer9, buffer7]
  // ,8 
);
// The Buffer.concat() method in Node.js is used to concatenate multiple Buffer objects into a single Buffer
// Buffer.concat(list[, totalLength])
// list: An array of Buffer objects to concatenate.
// totalLength (optional): The total length of the resulting buffer. If provided,
// it should be the sum of the lengths of all buffers in the list. If not provided, the length is automatically calculated from the list.



console.log(buffer9.toString(), "....",buffer7.toString());
console.log(buffer8.toString(), "....linr #81");

const buffer10 = Buffer.from("Hello");
const buffer11 = Buffer.from("Hello");
console.log(buffer10.equals(buffer11)); // true
console.log(buffer10.equals(buffer8)); // false