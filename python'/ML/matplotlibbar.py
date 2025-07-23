import matplotlib.pyplot as plt
import numpy as np

# x = np.array(["A", "B", "C", "D"])
# y = np.array([3, 8, 1, 10])

# # plt.bar(x,y)
# # plt.bar(x, y, color = "red")

# # width to set the width of the bars:
# plt.bar(x, y, color = "red", width = 0.1)
# plt.show()

# # below is for horizontal bar
# # plt.barh(x, y)
# # plt.barh(x, y, color = "green")

# # height to set the height of the bars:
# plt.barh(x, y, color = "green", height = 0.1)
# plt.show()



# histogram.......

# For simplicity we use NumPy to randomly generate an array with 250 values, 
# where the values will concentrate around 170, and the standard deviation is 10
x = np.random.normal(170, 10, 250)

print(x)
plt.hist(x)
plt.show() 
