# Haukar Brand Kit & Digital Guidelines

This document serves as the central source of truth for the Haukar digital identity, UI/UX aesthetics, and AI generation rules. It is optimized for ingestion into NotebookLM and Gemini Studio.

---

## 1. Core Colors

The visual identity of Haukar is built on a strong, high-contrast palette that evokes passion, professionalism, and modern sports aesthetics.

- **Haukar Red:** `#c8102e`
  - *Usage:* Primary call-to-action buttons, active states, important highlights, and accents.
- **Navy Blue (Dark VIP):** `#1c2c6c`
  - *Usage:* Primary text for headers (`<h1>`, `<h2>`), deep backgrounds for "Magic Glass" widgets, and secondary strong elements.
- **Pure White:** `#ffffff`
  - *Usage:* Primary background color. The application relies heavily on negative space and white backgrounds to achieve a "Premium App" feel.
- **Subtle Gray:** `#f3f4f6` (Tailwind `gray-100`)
  - *Usage:* Borders, secondary card backgrounds, and subtle dividers.

---

## 2. Typography & UI Styling

- **Typography:** Bold, modern, and highly legible. 
  - Headers should frequently use `font-black`, `uppercase`, `italic`, and `tracking-tighter` (negative letter spacing) to create an aggressive, sporty look (e.g., `<h1 className="text-5xl font-black italic tracking-tighter text-[#1c2c6c] uppercase">`).
  - Meta-text (dates, small labels) should use `text-[10px]`, `uppercase`, `tracking-widest`, and `font-bold` for a premium editorial feel.
- **Border Radius:** Use generous rounding for a friendly, modern app feel.
  - Cards and Widgets: `rounded-2xl` or `rounded-3xl`
  - Buttons and Pills: `rounded-full`
- **Shadows & Borders:** Rely on subtle drop shadows (`shadow-md` to `shadow-xl` on hover) and very faint borders (`border-gray-100`) to separate content, completely avoiding harsh, dark lines.

---

## 3. AI Photography & Image Generation Guidelines

When using Imagen or other AI tools to generate assets for the Haukar website, strict adherence to these rules ensures visual consistency and prevents "hallucinated" text or out-of-place aesthetics.

### Standard AI Prompt Formula
All AI image generation prompts should follow this structure to maintain the premium Haukar look:
> *"A highly cinematic, photorealistic [sport] image representing: '[Subject]'. Haukar is an Icelandic sports club with red and white colors. The image should look professional, dynamic, and dramatic. Do NOT include any text, letters, or words in the image. Purely visual photography style."*

### Image Sizing & Aspect Ratios
The platform is designed around specific image dimensions. When generating or cropping images, adhere to these ratios:

| Component Type | Aspect Ratio | Ideal Dimensions | Usage |
| :--- | :--- | :--- | :--- |
| **News Grids & Articles** | `16:9` | `800px × 450px` | Standard featured images for the `/frettir` page and individual article headers. |
| **Hero / Homepage Banners** | `21:9` (Ultrawide) | `1920px × 820px` | Large panoramic hero banners at the top of sports dashboards. |
| **Player Profiles** | `3:4` (Portrait) | `600px × 800px` | Player headshots and profile cards. Backgrounds should ideally be cleanly removed or dark studio-lit. |
| **Square Widgets** | `1:1` (Square) | `800px × 800px` | Social media feeds, specific UI widgets, or app icons. |

**Performance Rule:** All final images MUST be optimized. Run the internal pipeline (`npm run optimize`) to convert images to `.webp` format and cap the width at 800px for non-hero images.

---

## 4. Tone of Voice & AI Assistant ("Haukur í horni")

When writing copy for the website or configuring the AI assistant's persona, use the following rules:

- **Language:** Icelandic (Conversational, modern, grammatically flawless).
- **Tone:** Enthusiastic, supportive, professional, and deeply loyal to the club.
- **Vocabulary Specifics:**
  - *Basketball:* Use "karfa" or "körfubolti", never "korfa".
  - *General:* Use "leikur" (match), "sigur" (victory), "Áfram Haukar!" (Go Haukar!).
- **Goal:** The platform and its AI should feel like the ultimate "super-fan" that also holds a PhD in sports statistics. It should seamlessly guide parents, fans, and players to the information they need with zero friction.
