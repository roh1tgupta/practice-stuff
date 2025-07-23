import matplotlib.pyplot as plt
import numpy as np
# # Generate some random data
# data = np.random.randn(1000)
# # Create the histogram
# plt.hist(data, bins=20, color='skyblue', edgecolor='black')
# plt.xlabel('Values')
# plt.ylabel('Frequency')
# plt.title('Histogram Example')
# plt.show()



# import seaborn as sns
# import matplotlib.pyplot as plt
# # Load a sample dataset
# df = sns.load_dataset("iris")
# # Create the density plot
# sns.kdeplot(data=df, x="sepal_length", fill=True)
# # Add labels and title
# plt.xlabel("Sepal Length")
# plt.ylabel("Density")
# plt.title("Density Plot of Sepal Length")
# # Show the plot
# plt.show()



# import matplotlib.pyplot as plt
# from sklearn.datasets import load_breast_cancer
# data = load_breast_cancer()
# # plt.figure(figsize=(7.2, 3.5))
# # plt.hist(data.data[:,0], bins=20)
# # plt.xlabel('Mean Radius')
# # plt.ylabel('Frequency')
# plt.show()
# plt.figure(figsize=(7.2, 3.5))
# plt.hist(data.data[data.target==0,0], bins=10, alpha=0.5, label='Malignant')
# plt.hist(data.data[data.target==1,0], bins=10, alpha=0.5, label='Benign')
# plt.xlabel('Mean Radius')
# plt.ylabel('Frequency')
# plt.legend()
# plt.show()

# import matplotlib.pyplot as plt
# import seaborn as sns
# from sklearn.datasets import load_iris
# iris = load_iris()
# data = iris.data
# target = iris.target
# plt.figure(figsize=(7.5, 3.5))
# sns.boxplot(x=target, y=data[:, 0])
# plt.xlabel('Species')
# plt.ylabel('Sepal Length (cm)')
# plt.show()



# import matplotlib.pyplot as plt
# import numpy as np
# import pandas as pd
# import seaborn as sns
# from sklearn.datasets import load_iris
# iris = load_iris()
# data = pd.DataFrame(iris.data, columns=iris.feature_names)
# target = iris.target
# plt.figure(figsize=(7.5, 3.5))
# corr = data.corr()
# sns.set(style='white')
# mask = np.zeros_like(corr, dtype=np.bool)
# mask[np.triu_indices_from(mask)] = True
# f, ax = plt.subplots(figsize=(11, 9))
# cmap = sns.diverging_palette(220, 10, as_cmap=True)
# sns.heatmap(corr, mask=mask, cmap=cmap, vmax=.3, center=0,
#    square=True, linewidths=.5, cbar_kws={"shrink": .5})
# plt.show()



# import matplotlib.pyplot as plt
# import seaborn as sns
# import pandas as pd
# # load iris dataset
# iris = sns.load_dataset('iris')
# # create scatter matrix plot
# sns.pairplot(iris, hue='species')
# # show plot
# plt.show()


# import numpy as np
# import pandas as pd
# # create a sample salary table
# salary = pd.DataFrame({
#    'employee_id': ['001', '002', '003', '004', '005', '006', '007',
#    '008', '009', '010'],
#    'salary': [50000, 65000, 55000, 45000, 70000, 60000, 55000, 45000,
#    80000, 70000]
# })
# # calculate mean
# mean_salary = np.mean(salary['salary'])
# print('Mean salary:', mean_salary)
# # calculate median
# median_salary = np.median(salary['salary'])
# print('Median salary:', median_salary)
# # calculate mode
# mode_salary = salary['salary'].mode()[0]
# print('Mode salary:', mode_salary, salary['salary'].mode())