import matplotlib.pyplot as plt
import numpy as np

#day one, the age and speed of 13 cars:
x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])
plt.scatter(x, y)
# plt.scatter(x, y, color = '#88c999')

#day two, the age and speed of 15 cars:
x = np.array([2,2,8,1,15,8,12,9,7,3,11,4,7,14,12])
y = np.array([100,105,84,105,90,99,90,95,94,100,79,112,91,80,85])
plt.scatter(x, y)
# plt.scatter(x, y, color = 'hotpink')

# The two plots are plotted with two different colors, by default blue and orange,

plt.show()


# You can even set a specific color for each dot by using an array of colors as value for the c argument:
x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])
colors = np.array(["red","green","blue","yellow","pink","black","orange","purple","beige","brown","gray","cyan","magenta"])

plt.scatter(x, y, c=colors)

plt.show()



# The Matplotlib module has a number of available colormaps.
# A colormap is like a list of colors, where each color has a value that ranges from 0 to 100.
x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])
colors = np.array([0, 10, 20, 30, 40, 45, 50, 55, 60, 70, 80, 90, 100])

# You can specify the colormap with the keyword argument cmap with the value of
#  the colormap, in this case 'viridis' which is one of the built-in colormaps 
# available in Matplotlib.
plt.scatter(x, y, c=colors, cmap='viridis')

# You can include the colormap in the drawing by including the plt.colorbar() statement:
plt.colorbar()

plt.show()



# You can change the size of the dots with the s argument.
# You can adjust the transparency of the dots with the alpha argument.
x = np.random.randint(100, size=(100))
y = np.random.randint(100, size=(100))
colors = np.random.randint(100, size=(100))
sizes = 10 * np.random.randint(100, size=(100))

plt.scatter(x, y, c=colors, s=sizes, alpha=0.5, cmap='nipy_spectral')

plt.colorbar()

plt.show()


