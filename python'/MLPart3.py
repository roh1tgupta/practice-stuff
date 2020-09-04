#The term regression is used when you try to find the relationship between variables.
#In Machine Learning, and in statistical modeling, that relationship
# is used to predict the outcome of future events.
#Linear regression uses the relationship between the
# data-points to draw a straight line through all them

import matplotlib.pyplot as plt
from scipy import stats

x = [5,7,8,7,2,17,2,9,4,11,12,9,6]
y = [99,86,87,88,111,86,103,87,94,78,77,85,86]


slope, intercept, r, p, std_err = stats.linregress(x, y)

print('slope: ', slope)
print('intercept: ', intercept)

#R-Squared - The r-squared value ranges from 0 to 1,
# where 0 means no relationship, and 1 means 100% related
print('r: ', r)
print('p: ', p)
print('std err: ',std_err)

def myfunc(x):
  return slope * x + intercept

plt.scatter(x, y)
mymodel = list(map(myfunc, x))
plt.plot(x, mymodel)
plt.show()
