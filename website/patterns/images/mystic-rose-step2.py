from stringart import *

n = 9
make_circle(n)

for i in range(1, n):
    connect(0, i)

for i in range(2, n):
    connect(1, i)