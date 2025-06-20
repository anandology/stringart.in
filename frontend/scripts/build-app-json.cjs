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

async function readProductMarkdown(filePath) {
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
    const productsYmlPath = path.join(dataDir, 'products.yml');
    const productsDir = path.join(dataDir, 'products');
    const galleryYmlPath = path.join(dataDir, 'gallery.yml');
    const appJsonPath = path.join(dataDir, 'app.json');

    // Read products.yml for product keys
    const productKeys = await readYAML(productsYmlPath);

    // Read each product markdown file in order
    const products = [];
    for (const key of productKeys) {
        const productPath = path.join(productsDir, key + '.md');
        try {
            const product = await readProductMarkdown(productPath);
            products.push(product);
        } catch (err) {
            console.error(`Error reading product file for key '${key}':`, err.message);
        }
    }

    // Read gallery.yml
    let gallery = null;
    try {
        gallery = await readYAML(galleryYmlPath);
    } catch (err) {
        console.error('Error reading gallery.yml:', err.message);
    }

    // Combine and write app.json
    const appData = { products, gallery };
    await fs.writeFile(appJsonPath, JSON.stringify(appData, null, 2));
    console.log('Generated ', appJsonPath);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}); 