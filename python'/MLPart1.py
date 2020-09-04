'''
Mean - The average value
Median - is the value in the middle, after you have sorted all the values
Mode - The most common value
Standard deviation - is a number that describes how spread out the values are
Variance - is another number that indicates how spread out the values are.
Percentiles - are used in statistics to give you a number that
 describes the value that a given percent of the values are lower than
'''
import numpy
from scipy import stats

speed = [99,86,87,88,111,86,103,87,94,78,77,85,86]
x = numpy.median(speed)
print('median: ', x)
print('mean: ', numpy.mean(speed))
print('standard deviation: ', numpy.std(speed))
print('variance: ', numpy.var(speed))
x = stats.mode(speed)
print('mode:  ', x)
print(type(x))
print(x.mode[0])

ages = [5,31,43,48,50,41,7,11,15,39,80,82,32,2,8,6,25,36,27,61,31]
x = numpy.percentile(ages, 75) #75 percentile
print('75 percentile: ', x)

#What is the age that 90% of the people are younger than?
x = numpy.percentile(ages, 90)
print('90 percentile: ', x)