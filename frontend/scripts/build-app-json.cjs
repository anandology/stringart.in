#!/usr/bin/env node
const fs = require('fs/promises');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

async function readYAML(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    return yaml.load(content);
}

async function readMarkdownFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const parsed = matter(content);
    const frontmatter = parsed.data;
    const descriptionHtml = md.render(parsed.content);
    return {
        ...frontmatter,
        description_html: descriptionHtml
    };
}

async function main() {
    const dataDir = path.join(__dirname, '../src/data');
    const publicDir = path.join(__dirname, "../public")
    const productsYmlPath = path.join(dataDir, 'products.yml');
    const productsDir = path.join(dataDir, 'products');
    const galleryYmlPath = path.join(dataDir, 'gallery.yml');
    const galleryDir = path.join(dataDir, 'gallery');
    const homeYmlPath = path.join(dataDir, 'home.yml');
    const appJsonPath = path.join(publicDir, 'app.json');

    // Read products.yml for product keys
    const productKeys = await readYAML(productsYmlPath);

    // Read each product markdown file in order
    const products = [];
    for (const key of productKeys) {
        const productPath = path.join(productsDir, key + '.md');
        try {
            const product = await readMarkdownFile(productPath);
            products.push({ id: key, ...product });
        } catch (err) {
            console.error(`Error reading product file for key '${key}':`, err.message);
        }
    }

    // Read gallery.yml for ids and featured
    let galleryYml = null;
    try {
        galleryYml = await readYAML(galleryYmlPath);
    } catch (err) {
        console.error('Error reading gallery.yml:', err.message);
    }
    const galleryIds = galleryYml && galleryYml.items ? galleryYml.items : [];
    const galleryFeatured = galleryYml && galleryYml.featured ? galleryYml.featured : [];

    // Read each gallery markdown file and build entries dict
    const galleryEntries = {};
    for (const id of galleryIds) {
        const galleryPath = path.join(galleryDir, id + '.md');
        try {
            const entry = await readMarkdownFile(galleryPath);
            entry["id"] = id
            galleryEntries[id] = entry;
        } catch (err) {
            console.error(`Error reading gallery file for id '${id}':`, err.message);
        }
    }

    // Read home.yml for hero images
    let homeData = null;
    try {
        homeData = await readYAML(homeYmlPath);
    } catch (err) {
        console.error('Error reading home.yml:', err.message);
    }

    // Combine and write app.json
    const appData = {
        products,
        gallery: {
            entries: galleryEntries,
            ids: galleryIds,
            featured: galleryFeatured
        },
        home: homeData
    };
    await fs.writeFile(appJsonPath, JSON.stringify(appData, null, 2));
    console.log('Generated', appJsonPath);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});