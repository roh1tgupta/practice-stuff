import matplotlib.pyplot as plt
import numpy as np

y = np.array([35, 25, 25, 15])

# plt.pie(y)
# plt.show() 

# As you can see the pie chart draws one piece (called a wedge) 
# for each value in the array (in this case [35, 25, 25, 15]).

# By default the plotting of the first wedge starts from the x-axis and 
# moves counterclockwise

# The size of each wedge is determined by comparing the value with all the other values, 
# by using this formula:
# The value divided by the sum of all values: x/sum(x)


# The labels parameter must be an array with one label for each wedge:
# with labels
mylabels = ["Apples", "Bananas", "Cherries", "Dates"]
plt.pie(y, labels = mylabels)
plt.show() 

# The startangle parameter is defined with an angle in degrees, default angle is 0:
plt.pie(y, labels = mylabels, startangle = 90)
plt.show() 




# Maybe you want one of the wedges to stand out? The explode parameter allows you to do that.
# The explode parameter, if specified, and not None, must be an array with one value for each wedge.
myexplode = [0.2, 0, 0, 0]
plt.pie(y, labels = mylabels, explode = myexplode)
plt.show() 


# Add a shadow to the pie chart by setting the shadows parameter to True:
plt.pie(y, labels = mylabels, explode = myexplode, shadow = True)
plt.show() 


# The colors parameter, if specified, must be an array with one value for each wedge:
mycolors = ["black", "hotpink", "b", "#4CAF50"]
plt.pie(y, labels = mylabels, colors = mycolors)

# To add a list of explanation for each wedge, use the legend() function:
plt.legend()
plt.show()

# To add a header to the legend, add the title parameter to the legend function.
plt.pie(y, labels = mylabels)
plt.legend(title = "Four Fruits:")
plt.show() 



