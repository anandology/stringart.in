# String Art Studio - Frontend

The frontend code for the website of String Art Studio.

## Data Directory Structure (`src/data`)

The `src/data` directory is used to manage all structured data for the frontend app. Data is authored in YAML files and compiled into a single `app.json` for the frontend to consume.

```
frontend/
  src/
    data/
      app.json           # Generated: Combined data for the frontend (products, gallery, etc.)
      products.yml       # List of product IDs/keys (order and selection)
      gallery.yml        # All gallery image data (YAML format)
      products/          # Directory containing individual product YAML files
        starter-kit.yaml
        advanced-kit.yaml
        rings-kit.yaml
```

- **Edit YAML files** (`products.yml`, `gallery.yml`, `products/*.yaml`) as your source of truth.
- **Run `make`** in `frontend/` to generate `src/data/app.json`.
- **Frontend loads only `app.json`** for all product and gallery data.

