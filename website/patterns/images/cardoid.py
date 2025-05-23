from stringart import *

n = 40

make_circle(n)

for i in range(n):
    connect(i, i+i)
