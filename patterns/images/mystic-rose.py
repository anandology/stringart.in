from stringart import *

n = 9
make_circle(n)

for i in range(n):
    for j in range(n):
        if i!= j:
            connect(i, j)