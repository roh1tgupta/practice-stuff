class Graph {
  constructor(V, E) {
    this.NoOfVertices = V;
    this.NoOfEdges = E;
    this.edges = [];
  }

  addEdge(s, d) {
    this.edges.push({ src: s, dest: d });
  }

  findSubset(subArr, ind) {
    if (subArr[ind].parent === -1) return ind;
    return this.findSubset(subArr, subArr[ind].parent);
  }

  isCyclic() {
    const subArr = [];
    for (let q = 0; q < this.NoOfVertices; q+=1) {
      subArr.push({ parent: -1, rank: 0 });
    }

    for(let i = 0; i < this.edges.length; i++) {
      const xst = this.findSubset(subArr, this.edges[i].src);
      const yst = this.findSubset(subArr, this.edges[i].dest);

      console.log(xst);
      console.log(yst);
      console.log('...........');
      if (xst === yst) return true;

      // union
      if (subArr[xst].rank < subArr[yst].rank) {
        subArr[xst].parent = yst;
      } else if (subArr[xst].rank > subArr[yst].rank) {
        subArr[yst].parent = xst;
      } else {
        subArr[xst].parent = yst;
        subArr[yst].rank += 1;
      }
    }
    return false;
  }
}

const graph = new Graph(3, 3);
graph.addEdge(0, 1);
graph.addEdge(1, 2);
graph.addEdge(0, 2);

// const graph = new Graph(4, 3);
// graph.addEdge(0, 1);
// graph.addEdge(0, 3);
// graph.addEdge(0, 2);


if (graph.isCyclic()) {
  console.log('cyclic');
} else {
  console.log('uncyclic');
}