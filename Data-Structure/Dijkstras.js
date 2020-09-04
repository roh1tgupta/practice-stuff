/*Dijkstra’s shortest path algorithm
Given a graph and a source vertex in the graph, find shortest paths from source to all 
vertices in the given graph.

Below are the detailed steps used in Dijkstra’s algorithm to find the shortest path from a single
source vertex to all other vertices in the given graph.
Algorithm
1) Create a set sptSet (shortest path tree set) that keeps track of vertices included in
shortest path tree, i.e., whose minimum distance from source is calculated and finalized.
Initially, this set is empty.
2) Assign a distance value to all vertices in the input graph. Initialize all distance values as
INFINITE. Assign distance value as 0 for the source vertex so that it is picked first.
3) While sptSet doesn’t include all vertices
….a) Pick a vertex u which is not there in sptSet and has minimum distance value.
….b) Include u to sptSet.
….c) Update distance value of all adjacent vertices of u. To update the distance values, iterate
through all adjacent vertices. For every adjacent vertex v, if sum of distance value of u
(from source) and weight of edge u-v, is less than the distance value of v, then update the
distance value of v.

*/

function dijkstraSPA(arr, index = 0) {
  let minSpt = [];
  for(let i=0; i< arr.length; i++) {
    minSpt.push(9999);
  }
  minSpt[index] = 0;
  let coveredArr = [];
  for(let i = 0; i < arr.length; i++) {

    let minindex = -1;
    let min = 9999;
    for(let j=0; j<minSpt.length; j++) {
      if (!coveredArr.includes(j)) {
        if (minSpt[j] < min) {
          min = minSpt[j];
          minindex = j;
        }
      }
    }
    if (minindex !== -1) {
      coveredArr.push(minindex);
      for(let j=0;j<arr[i].length; j++) {
        if (arr[minindex][j]) {
          if (minSpt[minindex] + arr[minindex][j] <  minSpt[j]) {
            minSpt[j] = minSpt[minindex] + arr[minindex][j];
          }
        }
      }
    }


    
    
  }

  minSpt.forEach((data, index) => {
    console.log(index, ' ...... ', data);
  })

};

let graph = [
[ 0, 4, 0, 0, 0, 0, 0, 8, 0 ],
[ 4, 0, 8, 0, 0, 0, 0, 11, 0 ],
[ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
[ 0, 0, 7, 0, 9, 14, 0, 0, 0 ],
[ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
[ 0, 0, 4, 14, 10, 0, 2, 0, 0 ],
[ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
[ 8, 11, 0, 0, 0, 0, 1, 0, 7 ],
[ 0, 0, 2, 0, 0, 0, 6, 7, 0 ] ];

let index = 0;

dijkstraSPA(graph, index);