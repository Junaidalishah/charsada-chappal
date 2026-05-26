```markdown
# Design System Specification: The Cultural Curator

## 1. Overview & Creative North Star
The North Star for this design system is **"The Digital Atelier."** We are moving away from the "template-heavy" look of standard e-commerce to create a space that feels like a high-end editorial gallery. 

By blending the relentless precision of Apple’s minimalism with the heritage of Pakistani craftsmanship, we create a "Cultural Soul." This system rejects the rigid, boxed-in layouts of the past. Instead, we utilize **intentional asymmetry**, overlapping imagery, and extreme typographic contrast to guide the eye. The interface should feel like fine linen—light, breathable, and premium to the touch.

---

## 2. Color & Surface Architecture
Our palette is a dialogue between the warmth of heritage (creams/golds) and the authority of modern luxury (charcoals/forest greens).

### The Surface Hierarchy
Depth is achieved through **Tonal Nesting**, not lines. 
- **Base Layer:** `surface` (#fbf9f5) or `surface-container-low` (#f5f3ef).
- **Secondary Layer:** `surface-container` (#efeeea).
- **Elevated Accents:** `surface-container-highest` (#e4e2de).

### Design Mandates
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To separate content, shift the background token (e.g., a `surface-container-low` product grid sitting on a `surface` background).
*   **The Glass & Gradient Rule:** For floating navigation or modal overlays, use **Glassmorphism**. Apply `surface` at 80% opacity with a `24px` backdrop-blur. 
*   **Signature Textures:** For high-conversion CTAs, do not use flat colors. Use a subtle linear gradient transitioning from `primary` (#061b0e) to `primary-container` (#1b3022) to provide a "silk-like" depth.
*   **Cultural Accents:** Traditional 'Jali' patterns must only appear using `outline-variant` at 15% opacity. They are environmental textures, never structural elements.

---

## 3. Typography: The Editorial Voice
We use a high-contrast pairing to balance heritage with legibility.

*   **Display & Headlines (`notoSerif`):** This is our "Signature." Use `display-lg` for hero statements. The serif represents the timeless, sophisticated nature of the brand.
*   **Body & Labels (`inter`):** This is our "Functional Engine." Use `body-md` for product descriptions and `label-sm` for technical data. The sans-serif provides the "Apple-esque" modern clarity.

**Pro-Tip:** Increase letter-spacing on `label-md` by 0.05rem to achieve a luxury, spacious feel in navigation items.

---

## 4. Elevation & Depth
We define hierarchy through atmospheric shifts rather than physical barriers.

*   **The Layering Principle:** To lift a card, place a `surface-container-lowest` (#ffffff) object on a `surface-container` (#efeeea) background. This creates a "soft lift" that feels architectural.
*   **Ambient Shadows:** Use only when an element must float (e.g., a cart drawer). Shadows must be `on-surface` color at 4% opacity, with a `40px` blur and `10px` Y-offset.
*   **The "Ghost Border" Fallback:** If a container requires a boundary (e.g., an input field), use the `outline-variant` token at **20% opacity**. Never use 100% opaque outlines.

---

## 5. Components & Primitive Styling

### Buttons: The "Soft-Touch" Action
*   **Primary:** A gradient of `primary` to `primary-container`. `xl` (0.75rem) roundedness. No border. Text in `on-primary`.
*   **Secondary:** `surface-container-highest` background. No border. Text in `primary`.
*   **Tertiary (Ghost):** No background. `label-md` typography with a subtle `secondary` (#775a19) underline that expands on hover.

### Input Fields: Minimalist Utility
*   **Style:** No background color. Only a bottom border using `outline-variant` at 30% opacity. 
*   **State:** On focus, the bottom border transitions to `secondary` (gold) and a soft `secondary-container` glow appears behind the text.

### Cards & Lists: The No-Divider Rule
*   **Cards:** Use `surface-container-low`. Forbid the use of divider lines. Separate product title from price using `8` (2.75rem) of vertical whitespace.
*   **Lists:** Separate items using background color shifts. Odd rows: `surface`. Even rows: `surface-container-low`.

### Featured Addition: The "Heritage Watermark"
A custom component for high-end product pages. A large, `display-lg` serif letter or a Jali motif placed in the background at 5% opacity, partially obscured by a product image, creating a sense of three-dimensional layering.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Place product images slightly off-center to create a bespoke, editorial feel.
*   **Use the Spacing Scale:** Stick strictly to the scale. Use `16` (5.5rem) or `20` (7rem) for section margins to allow the design to "breathe."
*   **Color as Navigation:** Use `secondary` (gold) only for the most critical actions or "Limited Edition" tags.

### Don't:
*   **No Pure Blacks:** Never use #000000. Use `primary` or `tertiary` for deep tones to keep the palette "warm."
*   **No Sharp Corners:** Avoid `none` or `sm` roundedness unless it's for a very specific technical icon. Everything should feel "honed" and "soft."
*   **No Crowding:** If you feel the need to add a divider line, you probably haven't used enough whitespace. Increase the spacing token instead.

---

**Director’s Note:** 
Remember, we are not building a website; we are curating an experience. Every pixel of white space is an intentional choice. If the layout feels "busy," remove an element—don't add a border.```