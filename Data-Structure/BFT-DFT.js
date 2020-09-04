class graph {
  constructor(numberOfVertax) {
    this.adjmatrix = [];
    for (let i = 0; i < numberOfVertax; i += 1) {
      this.adjmatrix[i] = [];
    }
  }

  addEdge(u, v) {
    this.adjmatrix[u].push(v);
  }

  BFS(vertax) {
    const visited = new Array(this.adjmatrix.length);
    const arr = [];
    arr.push(vertax);
    visited[vertax] = true;
    while(arr.length) {
      let ele = arr.shift();
      console.log(ele);

      for (let i = 0; i < this.adjmatrix[ele].length; i++) {
        if (!visited[this.adjmatrix[ele][i]]) {
          visited[this.adjmatrix[ele][i]] = true;
          arr.push(this.adjmatrix[ele][i]);
        }
      }
    }
  }

  DFS(vertax, visited = []) {
    console.log(vertax);
    visited[vertax] = true;
    for (let i = 0; i < this.adjmatrix[vertax].length; i++) {
      if (!visited[this.adjmatrix[vertax][i]]) {
        this.DFS(this.adjmatrix[vertax][i], visited);
      }
    }
  }
}

const g = new graph(4);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 2);
g.addEdge(2, 0);
g.addEdge(2, 3);
g.addEdge(3, 3);
console.log('BFS');
g.BFS(2);

console.log('DFS');
g.DFS(2);