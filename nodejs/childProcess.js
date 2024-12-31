import cluster from 'cluster';
// cluster is a built-in Node.js module that enables you to create 
// multiple child processes (workers) to handle incoming requests.
// This is useful for multi-core systems, allowing the application to take 
// advantage of all available CPU cores and improve scalability and performance.
if (cluster.isMaster && NODE_ENV !== 'development') {
  // Fork workers.
  const cpuCount = require('os').cpus().length;
  for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
      cluster.fork();
  });
} else {
  // Start the server
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => {
      logger.info('Express server started on port: ' + port);
  }).on('error', (err) => {
  });
}

// why clustering
// Clustering is used here to take advantage of multi-core systems by
// running multiple instances of the application (one for each CPU core).
// This improves performance and enables handling of more concurrent requests,
// which is important in production environments.

// In development mode (NODE_ENV === 'development'), clustering is skipped.
// This is because clustering might complicate debugging, and developers typically want
// to work with a single instance for easier debugging.

// When a worker is forked, it inherits the same server environment as the master process, 
// including the ability to handle incoming HTTP requests. The Node.js cluster module automatically 
// distributes the requests from the Event Loop across workers using round-robin scheduling.

// Load balancing with reverse proxy
// In most production environments, Node.js clusters are often deployed behind a reverse 
// proxy (e.g., Nginx or HAProxy) to handle load balancing between multiple instances of 
// the Node.js application. This is especially useful when you deploy the application on 
// multiple machines or across containers in a microservice environment.


// In such a case, the reverse proxy would handle load balancing 
// (distributing requests across different machines or containers), while the 
// cluster module handles the distribution of requests across multiple workers within a single machine.

// Sticky Sessions: It ensures that once a client makes an initial request, the subsequent 
// requests from the same client are always routed to the same backend server (worker). 
// The "stickiness" is maintained through a cookie (srv_id), which is set in the 
// client's browser after the first request.


// below are mthods of child_process module in nodejs
// spawn(): Used for long-running processes, allows streaming of data to/from the child process.
// fork(): A special version of spawn() for spawning Node.js processes. It provides a 
  // simple IPC (Inter-process Communication) mechanism between the parent and child processes.
// exec(): Runs a command in a shell and captures the output, useful for simple commands t
  // hat don't require interaction.
// execFile(): Similar to exec(), but runs commands directly (without a shell) for
  //  better performance and security.
// execSync() : A synchronous version of exec().
// spawnSync(): A synchronous version of spawn(). It runs the child process 
  // and waits for it to complete before continuing with the rest of the code.