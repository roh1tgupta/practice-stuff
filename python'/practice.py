# this is just a commnet
# print('hello world')
# if 5 > 3:
#  print('true- 5 is greater than 3')
# if 3 > 5:
#  print('3 is greater than 5')
# else:
#   print('else condition')
#   print('hellll')
# """this is comment.....multiline comments
# cool""
# dsfds
# df
# dsf
# ds"""
# x,y,z = 'orange', 'apple', 'mango'
# print(x)
# print(y)
# print(z)
# x = y=z='apple'
# print(x)
# print(y)
# print(z)

# def myfunc():
#   global x
#   # x="hello"
#   print('inside function', x)
#   x='helllll'
#   print('x from instide', x)
# myfunc()
# print('x now is: '+x)


 
import numpy as np
import pandas as pd
# create a sample salary table
salary = pd.DataFrame({
   'employee_id': ['001', '002', '003', '004', '005', '006', '007',
   '008', '009', '010'],
   'salary': [50000, 65000, 55000, 45000, 70000, 60000, 55000, 45000,
   80000, 70000]
})

print(salary)
# # calculate mean
# mean_salary = np.mean(salary['salary'])
# print('Mean salary:', mean_salary)

# # calculate median
# median_salary = np.median(salary['salary'])
# print('Median salary:', median_salary)

# # calculate mode
# mode_salary = salary['salary'].mode()[0]
# print('Mode salary:', mode_salary)