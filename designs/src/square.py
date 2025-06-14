from joy import *
import math

# mm to pixels in inkscape units
mm = 300/79.375

size = 35*mm

hole = circle(r=2) + line(x1=0, y1=2, x2=0, y2=10)


def repeat_rotate(n):
    return repeat(n, rotate(360/n))

y1 = size/2


n = 8
step = size / (n+2)

hole_row0 = hole | repeat(n, translate(step))

hole_row = hole_row0 | translate(y=y1-10, x=-size/2+1.5*step)

hole_rows = hole_row | repeat_rotate(4)

side = line(x1=-size/2, y1=0, x2=size/2, y2=0, stroke="red") | translate(y=y1) | repeat_rotate(4)

# shape = Group([side, hole_rows], stroke="black", fill="none", stroke_width=0.75)
# show(shape)

from _designs import make_polygon, mm

shape = make_polygon(n=4, side_length=90*mm, num_holes=15,
                     hole_radius=0.65*mm, hole_length=3*mm, gap_in_steps=2)
show(shape)