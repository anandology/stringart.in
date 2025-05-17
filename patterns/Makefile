
SOURCES=$(wildcard images/*.py)
TARGETS=$(SOURCES:.py=.svg)

.PHONY: build
build: $(TARGETS)

images/%.svg: images/%.py
	python build.py $< > $@

clean:
	-rm -f $(TARGETS)