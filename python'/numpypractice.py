import numpy as np

# arr = numpy.array([1, 2, 3, 4, 5])

arr = np.array([1,2,3,4,5])
arr1 = np.array(2)
# x = arr.copy()
# arr[0] = 42

# print(arr)
print(arr)
print(type(arr))
print(np.__version__)
print(arr1)

print(arr.ndim)

print(arr1.ndim)

print(np.array([[[1,2,3], [2,3,4]], [[1,2,3], [2,4,6]]]).ndim)


ab = np.array([1,2,3,4], ndmin = 4)

print(ab, ab.ndim)


print(np.array([
    [
        [1,2,3],
        [2,3,4]
    ],
    [
        [1,2,3],
        [2,4,6]
    ]
])[0,1,2])



arr = np.array([1, 2, 3, 4, 5, 6, 7])
print(arr[1:5:1])

arr = np.array([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])
print(arr[1, 1:4])


arr = np.array([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])
print(arr[0:2, 2], arr.dtype)

arr = np.array(['apple', 'banana', 'cherry'])
print(arr.dtype)