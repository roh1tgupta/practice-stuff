class Graph {
  constructor(V, E) {
    this.NoOfVertices = V;
    this.NoOfEdges = E;
    this.edges = [];
  }

  addEdge(s, d) {
    this.edges.push({ src: s, dest: d });
  }

  findSubset(parent, ind) {
    if (parent[ind] === -1) return ind;
    return this.findSubset(parent, parent[ind]);
  }

  isCyclic() {
    const parent = [];
    for (let q = 0; q < this.NoOfVertices; q+=1) {
      parent.push(-1);
    }

    for(let i=0; i<this.edges.length; i++) {
      const xst = this.findSubset(parent, this.edges[i].src);
      const yst = this.findSubset(parent, this.edges[i].dest);

      if (xst === yst) return true;

      // union
      parent[xst] = yst;
    }
    return false;
  }
}

// const graph = new Graph(3, 3);
// graph.addEdge(0, 1);
// graph.addEdge(1, 2);
// graph.addEdge(0, 2);

const graph = new Graph(4, 3);
graph.addEdge(0, 1);
graph.addEdge(0, 3);
graph.addEdge(0, 2);


if (graph.isCyclic()) {
  console.log('cyclic');
} else {
  console.log('uncyclic');
}