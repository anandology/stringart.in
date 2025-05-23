from joy import *
import math

# mm to pixels in inkscape units
mm = 300/79.375

scale_factor = 90*mm/300

sin60 = math.sqrt(3)/2

hole = circle(r=2) + line(x1=0, y1=2, x2=0, y2=7)

y1 = 150*sin60


def repeat_rotate(n):
    return repeat(n, rotate(360/n))


n = 12
step = 150 / (n+1)

hole_row0 = hole | repeat(n, translate(step))

hole_row = hole_row0 | translate(y=y1-7, x=-75+step)

hole_rows = hole_row | repeat_rotate(6)

side = line(x1=-75, y1=0, x2=75, y2=0) | translate(y=y1) | repeat(6, rotate(60))

shape = Group([side, hole_rows], stroke="black", fill="none", stroke_width=0.75)
show(shape | scale(scale_factor))