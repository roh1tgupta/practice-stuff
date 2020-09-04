#Polynomial Regression
#If your data points clearly will not fit a linear regression
# (a straight line through all data points), it might be ideal for polynomial regression.

import numpy
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score

x = [1,2,3,5,6,7,8,9,10,12,13,14,15,16,18,19,21,22]
y = [100,90,80,60,60,55,60,65,70,70,75,76,78,79,90,99,99,100]

mymodel = numpy.poly1d(numpy.polyfit(x, y, 3))

myline = numpy.linspace(1, 22, 100)
print('r2_score: ', r2_score(y, mymodel(x)))
plt.scatter(x, y)
plt.plot(myline, mymodel(myline))
plt.show()