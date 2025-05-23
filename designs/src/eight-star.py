from joy import *

# mm to pixels in inkscape units
mm = 300/79.375

scale_factor = 90*mm/300

r = circle(r=150)

hole = circle(r=2)

num_holes = 10
step = 150/(num_holes+1)
holes1 = hole | repeat(num_holes, translate(x=step)) | translate(x=step)

holes2 = holes1 | repeat(8, rotate(360/8))

shape = Group([r, holes2], stroke="black", fill="none", stroke_width=0.75)
show(shape | scale(scale_factor))