# Azurienne AI — Yachting AI Scorecard (test site)

A self-contained single-funnel landing page in the **Daniel Priestley / $1 Million Landing Page** style: the page sells a **diagnostic scorecard**, not a generic product dump.

## Open locally

1. Open the folder `/workspace/azurienne-ai/` (or copy it to your machine).
2. Double-click **`index.html`**, or from a terminal:

```bash
cd /workspace/azurienne-ai
# Option A — open in default browser (macOS)
open index.html

# Option B — simple local server
python3 -m http.server 8080
# then visit http://localhost:8080
```

3. Take the assessment via **`scorecard.html`** (linked from every primary CTA).

No build step, no backend. Contact/scorecard answers stay in the browser for this demo.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page (Priestley 5-block + supporting sections) |
| `scorecard.html` | Multi-step scorecard: contact → 12 questions → Big 5 → sample results |
| `styles.css` | Luxury azure / navy / white design system |
| `script.js` | Mobile nav, smooth scroll, scorecard step UI |
| `README.md` | This file |

## Where to drop images

Replace the dashed **image placeholders** later. Suggested slots (labels match the page):

| Placeholder label | Suggested asset | Notes |
|-------------------|-----------------|-------|
| Hero yacht photo | Wide hero (≈1600×900) | Mediterranean vessel, golden hour |
| Founder / product photo | Portrait or bridge/ops shot | Credibility block |
| Partner logos ×4 | SVG/PNG logos | Authority bar |
| Scorecard / dashboard screenshot | Product UI | How-it-works section |
| Overall score graphic | Chart / ring | “What you get” |
| Levers breakdown chart | Bar/radar | “What you get” |
| Priority insights list | UI crop | “What you get” |
| Mediterranean / azure lifestyle photo | Coastline / sundeck | About |
| Personalized results dashboard | Results UI | Scorecard results step |

Practical approach: keep filenames like `images/hero-yacht.jpg`, then swap each `.img-placeholder` div for an `<img>` (or set a CSS `background-image` on that placeholder).

Suggested folder (create when ready):

```
azurienne-ai/
  images/
    hero-yacht.jpg
    founder.jpg
    logo-charter.svg
    logo-broker.svg
    logo-mgmt.svg
    logo-marina.svg
    dashboard.png
    score-graphic.png
    levers-chart.png
    insights.png
    lifestyle.jpg
    results-ui.png
```

## Landing page structure (Priestley formula)

1. **Hook** — frustration / readiness for yacht ops  
2. **Subheading** — take the short scorecard  
3. **Value proposition** — three levers: utilization, crew & guest ops, revenue leakage  
4. **Credibility** — founder note + metrics + logo placeholders  
5. **CTA** — Start the Yachting AI Scorecard  

Supporting below the fold: How it works, What you get, About, soft contact/pilot, Footer.

## Scorecard flow

1. Contact capture (name, email, role, optional vessel/company)  
2. 12 best-practice Likert questions (1–5)  
3. Big 5 qualifying (situation, 90-day outcome, obstacle, solution type, open box)  
4. Results — **demo/sample** score + 3 insights + next-step CTA (marked as test)

## Product framing (assumptions)

- **Azurienne AI** = test product for luxury yachting AI (charter, crew ops, guest experience, brokerage).  
- Primary offer on the landing page = **free diagnostic Scorecard**, not pricing tiers.  
- Audience = yacht owners, charter/management companies, captains, brokers.  
- Tone = premium Mediterranean / azure, KPI-style authority, diagnose-before-prescribe.

## Design

- Fonts: Cormorant Garamond (display) + Outfit (UI) via Google Fonts  
- Palette: navy `#0b1f33`, azure `#1a6b9a`, seafoam, sand, white  
- Mobile-first, sticky nav, semantic sections, dashed labeled image placeholders  
