from joy import *
import math

# mm to pixels in inkscape units
mm = 300/79.375

HOLE_RADIUS = 1*mm
HOLE_LENGTH = 4*mm

def cycle(n):
    return repeat(n, rotate(360/n))

def make_hole(hole_radius, hole_length):
    y = hole_radius + hole_length
    return line(x1=0, y1=0, x2=0, y2=hole_length, stroke="black") + circle(x=0, y=y, r=hole_radius, stroke="black", fill="none")


def make_hole_row(hole, n, length, gap):
    step = length / (n-1+2*gap)
    row0 = hole | repeat(n, translate(step))
    row = row0 | translate(x=-length/2+gap*step)
    return row

def make_polygon(n, side_length, num_holes, hole_radius=HOLE_RADIUS, hole_length=HOLE_LENGTH, gap_in_steps=1.5):
    print("make_polygon", n, side_length)
    side0 = line(x1=-side_length/2, y1=0, x2=side_length/2, y2=0, stroke="red")
    hole = make_hole(hole_radius=hole_radius, hole_length=hole_length)
    row = make_hole_row(hole, num_holes, side_length, gap=gap_in_steps)

    # height from origin
    angle = 2*math.pi/n
    print("angle", math.degrees(angle))
    d = side_length/2 / math.tan(angle/2)

    print("side_length", side_length)
    print("d", d)

    side = (side0 + row) | translate(y=-d)

    return side | cycle(n)