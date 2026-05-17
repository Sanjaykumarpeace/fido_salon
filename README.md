# FIDO Unisex Salon Website

Static luxury salon website for FIDO Unisex Salon, Kattigenahalli, Bengaluru.

## Structure

- `index.html` - semantic page content, SEO metadata, schema, and booking form markup.
- `src/styles.css` - visual system, responsive layout, glassmorphism, glow effects, reveal animations, and premium UI states.
- `src/app.js` - menu, reveal behavior, gallery lightbox, before/after sliders, booking WhatsApp handoff, quiz logic, pointer glow, and image fallback handling.
- `src/*.jpeg` and `src/images/*.jpeg` - local FIDO salon and portfolio images used throughout the site.

## Preview

Run a local static server from this folder:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8080/
```

The site is intentionally static and can be hosted on any basic static host.
