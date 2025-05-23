from stringart import *

n = 40
k = 12

make_circle(n)

for i in range(n-k+1):
    connect(i, i+k)
