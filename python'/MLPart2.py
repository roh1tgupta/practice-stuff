import numpy
import matplotlib.pyplot as plt

x = numpy.random.uniform(0.0, 5.0, 250)
plt.hist(x, 5)
plt.show()

x = numpy.random.uniform(0.0, 5.0, 100000)
plt.hist(x, 100)
plt.show()

#mean value 5 and standard deviation is 1
x = numpy.random.normal(5.0, 1.0, 100000)
plt.hist(x, 100)
plt.show()

#scatter plot
x = numpy.random.normal(5.0, 1.0, 1000)
y = numpy.random.normal(10.0, 2.0, 1000)
plt.scatter(x, y)
plt.show()
