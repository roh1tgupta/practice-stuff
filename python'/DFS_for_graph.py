from collections import defaultdict
class Graph:
  def __init__(self):
    super().__init__()
    self.graph = defaultdict(list)
  
  def addEdge(self, u, v):
    self.graph[u].append(v)
  
  def DFSUtil(self, u, visited):
    visited[u] = True
    print(u, " ")

    for i in self.graph[u]:
      if visited[i] == False:
        self.DFSUtil(i, visited)
  
  def DFS(self, i):
    # below two lines are for connected graph
    visited = [False] *  len(self.graph)
    self.DFSUtil(i, visited)
    '''
    if graph is disconnected then
    V = len(self.graph)
    visited = [False] * V

    for i in range(V):
      if visited[i] == False:
        self.DFSUtil(i, visited)
    '''
  

g = Graph()
g.addEdge(0, 1)
g.addEdge(0, 2) 
g.addEdge(1, 2) 
g.addEdge(2, 0) 
g.addEdge(2, 3) 
g.addEdge(3, 3)
g.DFS(2)