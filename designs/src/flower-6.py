from joy import *

# mm to pixels in inkscape units
mm = 300/79.375

scale_factor = 90*mm/300

r = circle(r=150)

hole = circle(r=2)

def repeat_rotate(n):
    return repeat(n, rotate(360/n))

petals = 6

num_holes = 12
step = 150/(num_holes+1)
holes1 = hole | repeat(num_holes-1, translate(x=step)) | translate(x=step)

holes2 = holes1 | repeat_rotate(petals)

# using one less hole as one hole is shaped between petals
outer_holes = hole | translate(x=150-step) | repeat_rotate((num_holes-1)*petals)

shape = Group([r, holes2, outer_holes], stroke="black", fill="none", stroke_width=0.75)
show(shape | scale(scale_factor))