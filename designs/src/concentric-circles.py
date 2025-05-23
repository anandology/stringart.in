from joy import *

# mm to pixels in inkscape units
mm = 300/79.375

scale_factor = 90*mm/300

r = circle(r=150)

hole = circle(r=3)

holes1 = hole | translate(x=135) | repeat(36, rotate(10))

holes2 = hole | translate(x=135/2) | repeat(36, rotate(10))

shape = Group([r, holes1, holes2], stroke="black", fill="none", stroke_width=0.75)
show(shape | scale(scale_factor))