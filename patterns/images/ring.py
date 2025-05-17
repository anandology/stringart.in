from stringart import *

n = 40
k = 16

make_circle(n)

for i in range(n):
    connect(i, i+k)
