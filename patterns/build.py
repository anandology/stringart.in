import argparse
import stringart

p = argparse.ArgumentParser()
p.add_argument("filename")
args = p.parse_args()

code = open(args.filename).read()

exec(code)
svg = stringart._art._repr_svg_()
print(svg)
