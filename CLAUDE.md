# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project contains the **celostna grafična podoba (CGP)** — complete corporate design — for **Odvetniška družba Dolhar o.p. d.o.o.**, a Slovenian law firm based in Ljubljana. The user (Žiga Dolhar) is the sole owner.

**Moto:** *"Big firm expertise, responsiveness of a trusted advisor."*

## Corporate Details

- **Firma:** Odvetniška družba Dolhar o.p. d.o.o.
- **DE:** Dolhar Rechtsanwälte GmbH / **EN:** Dolhar Law LLP
- **Skrajšana firma:** Dolhar o.p. d.o.o.
- **Naslov:** Gosposvetska cesta 11, 1000 Ljubljana
- **Mat. št.:** 7401221000
- **ID za DDV:** SI 52006581
- **Žiga Dolhar:** Odvetnik (ne navajaj "direktor" — uporabnik ne želi te navedbe)
- **Tel:** +386 41 505 240
- **E-mail:** ziga@dolhar.si

Source document: `existing materials/corporate details.pdf`

## Architecture

```
├── brand/
│   └── tokens.css            # CSS custom properties: colors, typography, spacing
│                              # 6 theme variants + designer teal override + dark mode
├── website/
│   ├── index.html             # Main brand guidelines comparison page
│   ├── css/style.css          # Layout & component styles
│   ├── js/main.js             # Theme/teal/mode switcher logic
│   └── assets/
│       └── images/            # Chambers badge etc.
├── templates/
│   └── court-filing/          # Restyled court filing DOCX
├── existing materials/        # Source documents
│   ├── corporate details.pdf  # Court register extract
│   ├── Dolhar-elementi.ai     # Designer's CGP proposals (20 pages)
│   ├── Chambers-2025.png      # Chambers Ranked in Europe 2025 badge
│   └── Vloga dolžnika*.docx   # Original court filing template
```

## Design System

Six visual style variants in `brand/tokens.css`, with three independent toggles on `<html>`:

### `data-theme` — Color & Typography
| Theme          | `data-theme`    | Fonts                                              |
|----------------|-----------------|-----------------------------------------------------|
| Klasičen       | `classic`       | Playfair Display + Libre Baskerville + Source Sans 3 |
| Klasičen Teal  | `classic-teal`  | Same as above, teal accent                          |
| Moderen        | `modern`        | DM Sans                                             |
| Moderen Teal   | `modern-teal`   | DM Sans, teal accent                                |
| Eleganten      | `elegant`       | Cormorant Garamond + Source Sans 3                   |
| Eleganten Teal | `elegant-teal`  | Same as above, teal accent                          |

**User preference:** Klasičen Teal and Eleganten Teal are the frontrunners.

### `data-teal` — Teal Palette Variant
- `custom` — proposed palette (darker, more muted teal)
- `designer` — designer's exact colors from AI file: navy `#081D31`, teal `#0CA69E`

### `data-mode` — Light / Dark
- `light` — svetlo ozadje
- `dark` — temno ozadje, dokumenti ostanejo na belem "papirju"

### Logo — Square-in-Square Icon
Four layers (render order matters — white stroke must be drawn AFTER the third rect):
1. Outer square: designer's teal `#0CA69E` (fixed)
2. Third square: `var(--color-accent)` (theme-dependent)
3. White stroke outline (on top of both)
4. Inner square: `var(--color-primary)` (navy)

All colors and typography exposed as CSS custom properties (`--color-*`, `--font-*`). New components must use these tokens.

## Development

Static HTML/CSS/JS — no build step. Open `website/index.html` in a browser, or:

```sh
python3 -m http.server 8000
# Then open http://localhost:8000/website/
```

Fonts loaded from Google Fonts CDN (internet required).

## Language & Conventions

- User communicates in **Slovenian**. UI text, templates, and labels are in Slovenian.
- Company name variations (SL/DE/EN) must match registered names exactly.
- Title for Žiga Dolhar: use "Odvetnik" only (never "Direktor").
- CSS tokens live in `brand/tokens.css`. Styles in `website/css/style.css`.
- Court filing templates follow Slovenian legal formatting (see DOCX in existing materials for structure).
