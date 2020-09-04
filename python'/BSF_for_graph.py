from collections import defaultdict
class Graph:
  def __init__(self):
    super().__init__()
    self.graph = defaultdict(list)
  
  def addEdge(self, u, v):
    self.graph[u].append(v)
  
  def BFS(self, firstNode):
    visited = [False] * len(self.graph)
    queue = []
    queue.append(firstNode)
    visited[firstNode] = True

    while queue:
      node = queue.pop(0)
      print(node, " ")
      for i in self.graph[node]:
        if visited[i] == False:
          visited[i] = True
          queue.append(i)

g = Graph()
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 2)
g.addEdge(2, 0)
g.addEdge(2, 3)
g.addEdge(3, 3)

g.BFS(2)

