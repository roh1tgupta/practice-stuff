const os = require('os');

// System Architecture
console.log('Architecture:', os.arch());

// CPU Information
// Description: Returns an array of objects containing information about each logical CPU core.
// Each object contains information about the core such as its model, speed, and times (user, nice, sys, idle, irq).
console.log('CPUs:', os.cpus());

// Free Memory
console.log('Free Memory:', os.freemem());

// Total Memory
console.log('Total Memory:', os.totalmem());

// System Uptime
console.log('System Uptime (seconds):', os.uptime());

// Home Directory
console.log('Home Directory:', os.homedir()); // Example output: '/home/user' (on Linux) or 'C:\\Users\\User' (on Windows)

// Hostname
console.log('Hostname:', os.hostname());

// Platform
console.log('Platform:', os.platform());

// OS Release
console.log('OS Release:', os.release());

// Network Interfaces
console.log('Network Interfaces:', os.networkInterfaces());

// User Info
console.log('User Info:', os.userInfo());

// Description: Returns an array with the system load averages for the past 1, 5, and 15 minutes. These values are floating-point numbers.
console.log(os.loadavg()); // Example output: [0.59, 0.83, 0.85]

// Description: Returns an object containing network interfaces that are available on the system. Each interface will contain an array of objects describing each address (IPv4, IPv6, etc.).
console.log(os.networkInterfaces());

// Description: Returns the operating system’s default directory for temporary files.
console.log(os.tmpdir()); // Example output: '/tmp' on Linux or 'C:\\Users\\User\\AppData\\Local\\Temp' on Windows

// Description: Returns an object containing information about the current user. This includes the user's uid, gid, username, shell, and homedir.
console.log(os.userInfo());

// os.watchFile() and os.unwatchFile():
// Description: These methods allow you to watch and unwatch a file for changes (e.g., file modifications) at the OS level. However, they are more related to fs (file system) rather than os, and are rarely used in practice.