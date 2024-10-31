a = "hello world!!"
print(a)


a = """hello ,
world,
"""
print(a)


for x in a:
  print(x)

print(len(a))

print("llo" in a)
print("llo" not in a)


b = "hello world!"
print(b[1:3])  #el
print(b[:4]) #hell
print(b[1:]) #ello world!
print(b[-5:-2]) #orl

age = 36
txt = "My name is John, and I am {}"
print(txt.format(age))


quantity = 3
itemno = 567
price = 49.95
myorder = "I want {} pieces of item {} for {} dollars."
print(myorder.format(quantity, itemno, price))



quantity = 3
itemno = 567
price = 49.95
myorder = "I want to pay {2} dollars for {0} pieces of item {1}."
print(myorder.format(quantity, itemno, price))

