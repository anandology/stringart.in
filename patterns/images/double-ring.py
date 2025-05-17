from stringart import *

n = 40
k1 = 16
k2 = 12

make_circle(n)

set_color('red')
for i in range(n):
    connect(i, i+k1)

set_color('blue')
for i in range(n):
    connect(i, i+k2)
