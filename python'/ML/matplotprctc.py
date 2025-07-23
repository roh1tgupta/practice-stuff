import matplotlib.pyplot as plt
import numpy as np

# xpoints = np.array([0, 6])
# ypoints = np.array([0, 250])

# plt.plot(xpoints, ypoints)
# plt.plot(xpoints, ypoints, 'o')
# plt.show()


# xpoints = np.array([1, 2, 6, 8])
# ypoints = np.array([3, 8, 1, 10])

# plt.plot(xpoints, ypoints)
# plt.show()

# plt.plot(xpoints, ypoints, "o")
# plt.show()


# If we do not specify the points on the x-axis, they will get 
# the default values 0, 1, 2, 3 etc., depending on the length of 
# the y-points.

# ypoints = np.array([3, 8, 1, 10, 5, 7])

# plt.plot(ypoints)
# plt.show()


# ypoints = np.array([3, 8, 1, 10])

# plt.plot(ypoints, marker = '1')
# plt.show()


# # mec: marker edge color, mfc: marker face color, ms: marker size
# plt.plot(ypoints, marker = 'o', ms = 20, mec = 'r', mfc = 'r')
# plt.show()


# # marker|line|color here o is marker reference, : is line tye and r is marker color
# plt.plot(ypoints, 'o:r')
# plt.show()

# # marker|line|color here o is marker reference, -. is line tye and r is marker color
# plt.plot(ypoints, 'o-.r')
# plt.show()

# plt.plot(ypoints, linestyle = 'dashed')
# plt.show()

# # The line style can be written in a shorter syntax:
# # linestyle can be written as ls.
# # dotted can be written as :.
# # dashed can be written as --.

# plt.plot(ypoints, ls = ':')
# plt.show()

# #  Style    Or
# # 'solid'   (default)	'-'	
# # 'dotted'  ':'	
# # 'dashed'  '--'	
# # 'dashdot' '-.'	
# # 'None'	  '' or ' '

# plt.plot(ypoints, ls = 'None', marker = 'o', ms = 20, mec = 'r', mfc = 'r')
# plt.show()

# plt.plot(ypoints, linewidth = '20.5')
# plt.show()

# y1 = np.array([3, 8, 1, 10])
# y2 = np.array([6, 2, 7, 11])

# plt.plot(y1)
# plt.plot(y2, ls = "-.")
# plt.show()


# x1 = np.array([0, 1, 2, 3])
# y1 = np.array([3, 8, 1, 10])
# x2 = np.array([0, 1, 2, 3])
# y2 = np.array([6, 2, 7, 11])

# # # plt.plot(x1, y1, x2, y2)
# plt.plot(x1, y1, ls = "-", c = "green")
# plt.plot(x2, y2, ls = "-.", c = "red")
# plt.title("Sports Watch Data")
# plt.xlabel("Average Pulse")
# plt.ylabel("Calorie Burnage")

# https://www.w3schools.com/python/matplotlib_labels.asp we can also set the font properties of label


#  below is only for adding grid
# plt.grid() 
# plt.show()


# You can use the axis parameter in the grid() function to specify which grid lines to display.
# # Legal values are: 'x', 'y', and 'both'. Default value is 'both'.
# plt.grid(axis = 'x')

# # You can also set the line properties of the grid, like this: grid(color = 'color', linestyle = 'linestyle', linewidth = number).
# plt.grid(color = 'green', linestyle = '--', linewidth = 0.5)
# plt.show()

#plot 1:
x = np.array([0, 1, 2, 3])
y = np.array([3, 8, 1, 10])


# The subplot() function takes three arguments that describes the layout of the figure.
# The layout is organized in rows and columns, which are represented by the first
#  and second argument.
# The third argument represents the index of the current plot.

plt.subplot(1, 2, 1)
plt.plot(x,y)
# subplot title
plt.title("SALES")

#plot 2:
x = np.array([0, 1, 2, 3])
y = np.array([10, 20, 30, 40])

plt.subplot(1, 2, 2)
plt.plot(x,y)
plt.title("INCOME")

# title to entire figure
plt.suptitle("MY SHOP")
plt.show()