# ✅ TODO Checklist

Tick items off as you go. Work top to bottom, one phase at a time.

## Phase 0: Setup & housekeeping
- [x] Flatten nested `password-generator/` folder into the repo root
- [x] Rename `Componenets/` to `Components/` and fix imports
- [x] Add `.gitignore`
- [x] Write a detailed `README.md`
- [ ] Push the restructure to GitHub
- [ ] Remove unused imports in `App.js` (`CheckContainer`, `StrengthTestBox`)
- [ ] Remove unused `import "../App.css"` / `React` imports if not needed
- [ ] Rename `GenButn.js` to `GenerateButton.js` (and `CheckContainer` function name to match)
- [ ] Update the page title and description in `public/index.html`
- [ ] Update `public/manifest.json` (app name)

## Phase 1: Share state (the foundation)
- [ ] Move `length` state from `Slider.js` up into `App.js`
- [ ] Add `options` state (`uppercase`, `lowercase`, `numbers`, `symbols`) in `App.js`
- [ ] Add `password` state in `App.js`
- [ ] Pass state and setters down to components as props
- [ ] Set the slider default to something sensible (e.g. 10, not 0)

## Phase 2: Checkboxes
- [ ] Make each checkbox a controlled input (`checked` + `onChange`)
- [ ] Default uppercase, lowercase and numbers to on
- [ ] Stop the user unchecking the last remaining option

## Phase 3: Password generation
- [ ] Create `src/utils/generatePassword.js`
- [ ] Define the character pools (upper, lower, numbers, symbols)
- [ ] Build the pool from the checked options only
- [ ] Pick characters with `crypto.getRandomValues()`
- [ ] Guarantee at least one character from every checked type
- [ ] Shuffle the result
- [ ] Hook the **Generate** button to call it and set `password`
- [ ] Show the real password in `PasswordBox` (remove the hard-coded `PTx!f5DaFX`)
- [ ] Show a placeholder like "P4$5W0rD!" before the first generation

## Phase 4: Copy to clipboard
- [ ] Add a click handler using `navigator.clipboard.writeText()`
- [ ] Show a "Copied!" message for about 2 seconds
- [ ] Disable or ignore copy when there is no password
- [ ] Add a fallback for browsers without the Clipboard API
- [ ] Make the copy icon a real `<button>` (keyboard accessible)

## Phase 5: Strength meter
- [ ] Create `src/utils/getStrength.js`
- [ ] Score from length and number of character types used
- [ ] Return a label: `TOO WEAK!`, `WEAK`, `MEDIUM`, `STRONG`
- [ ] Pass the score to `StrengthTestBox` as a prop
- [ ] Fill the right number of bars (1 to 4) and change colour per level
- [ ] Remove the hard-coded `MEDIUM` label

## Phase 6: Styling & UX
- [ ] Make the layout fully responsive (mobile first)
- [ ] Style the slider track to show the filled portion
- [ ] Add hover and focus states for the button and checkboxes
- [ ] Use `arrow-right.svg` in the Generate button instead of the emoji
- [ ] Use `copy.svg` in `PasswordBox` instead of the inline SVG
- [ ] Add a light/dark theme (optional)

## Phase 7: Accessibility
- [ ] Add `<label>` elements tied to each checkbox
- [ ] Add an `aria-label` to the slider and copy button
- [ ] Announce "Copied!" with `aria-live="polite"`
- [ ] Check colour contrast on all text and bars
- [ ] Make sure everything works with keyboard only

## Phase 8: Testing
- [ ] Unit test `generatePassword` (length, character types, at least one of each)
- [ ] Unit test `getStrength` (each level)
- [ ] Component test: slider updates the displayed length
- [ ] Component test: Generate updates the password
- [ ] Component test: copy shows the "Copied!" message

## Phase 9: Polish & ship
- [ ] Add a screenshot or GIF to the README
- [ ] Run `npm run build` and check for warnings
- [ ] Deploy (Netlify, Vercel or GitHub Pages)
- [ ] Add the live demo link to the README
- [ ] Add a LICENSE file

## 💡 Stretch ideas
- [ ] "Exclude look-alike characters" option (`0 O l 1 I`)
- [ ] Passphrase mode (random words)
- [ ] Password history (session only)
- [ ] Generate several passwords at once
