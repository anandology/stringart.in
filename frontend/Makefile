

.PHONY: data
data: src/app.json


src/app.json: src/data/products.yml src/data/products/*.yml src/data/gallery.yml
	node scripts/build-app-json.cjs 