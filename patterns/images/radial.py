from stringart import *

n = 18
k = n//2

make_circle(n)
for i in range(n):
    connect(i, i+k)