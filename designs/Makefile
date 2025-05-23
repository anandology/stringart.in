SOURCES=$(wildcard src/[a-z]*.py)
TARGETS=$(SOURCES:src/%.py=svg/%.svg)

default: $(TARGETS)

svg/%.svg: src/%.py
	@mkdir -p svg
	PYTHONPATH=src python build.py -o $@ $<

clean:
	-rm $(TARGETS)
