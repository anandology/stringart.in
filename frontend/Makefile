

.PHONY: deploy build data
default: build

data: src/app.json

src/app.json: src/data/products.yml src/data/products/*.md src/data/gallery.yml
	node scripts/build-app-json.cjs


build: data
	VITE_APP_JSON_HASH=$(shell md5sum public/app.json | awk '{print $$1}') \
	VITE_API_BASE_URL=https://api.stringart.in \
		npm run build


deploy: build
	rsync -avz dist/* pipal@pipal.in:/var/www/stringart.in/
