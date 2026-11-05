# 🔐 Password Generator

A clean, React-based password generator with a planned **FastAPI** backend. Pick a length, choose which character types to include, and generate a random password you can copy in one click.

> **Status:** 🚧 UI complete, logic in progress. The layout, slider and checkboxes are built. Password generation, copy-to-clipboard and the strength meter are still being wired up. The FastAPI backend is planned (see the [Roadmap](#-roadmap--checklist)).

---

## ✨ Features

| Feature | Status |
| --- | --- |
| Password display box with copy icon | ✅ UI built |
| Character length slider (1–100) | ✅ Working (updates the number shown) |
| Checkboxes: uppercase, lowercase, numbers, symbols | ✅ UI built, not yet wired |
| Strength meter (4 bars) | ✅ UI built, currently static ("MEDIUM") |
| Generate button | ✅ UI built, not yet wired |
| Real random password generation | ⏳ Planned |
| Copy to clipboard + "Copied!" feedback | ⏳ Planned |
| Dynamic strength rating | ⏳ Planned |
| FastAPI backend (generate + strength endpoints) | ⏳ Planned |

---

## 🧱 Tech Stack

**Frontend (now)**
- React 19, Create React App (`react-scripts` 5)
- Plain CSS
- Testing Library + Jest (set up, tests not written yet)

**Backend (planned)**
- Python 3.11+ with **FastAPI** and Uvicorn
- Pydantic for request validation
- `secrets` module for secure randomness
- pytest for tests

---

## 📁 Project Structure

### Today

```
PasswordGenerator/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── Components/
│   │   ├── PasswordBox.js      # Shows the password + copy icon
│   │   ├── Slider.js           # Length slider; wraps the options below
│   │   ├── CheckContainer.js   # Uppercase / lowercase / numbers / symbols
│   │   ├── StrengthTestBox.js  # Strength label + 4 colour bars
│   │   └── GenButn.js          # "Generate" button
│   ├── Images/
│   │   ├── copy.svg
│   │   └── arrow-right.svg
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### After the backend is added (Part B, step B1)

```
PasswordGenerator/
├── frontend/               # the React app, moved here unchanged
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/                # new FastAPI app
│   ├── app/
│   │   ├── main.py             # FastAPI app, CORS, routes
│   │   ├── routes/
│   │   │   ├── generate.py     # POST /api/generate
│   │   │   └── strength.py     # POST /api/strength
│   │   ├── schemas.py          # Pydantic request/response models
│   │   └── services/
│   │       ├── generator.py    # password logic (secrets)
│   │       └── strength.py     # scoring logic
│   ├── tests/
│   └── requirements.txt
├── .gitignore
└── README.md
```

### How the components fit together

```
App
├── PasswordBox            (displays the generated password)
└── Slider                 (card that holds all the options)
    ├── CheckContainer     (character-type checkboxes)
    ├── StrengthTestBox    (strength meter)
    └── GenButn            (generate button)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm
- *(Backend, later)* Python 3.11 or newer

### Run the frontend

```bash
git clone https://github.com/Ding-Dong101/PasswordGenerator.git
cd PasswordGenerator
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `npm start` | Dev server with hot reload |
| `npm test` | Test runner in watch mode |
| `npm run build` | Optimised production build in `build/` |

### Run the backend *(once Part B is done)*

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows (PowerShell)
# source .venv/bin/activate     # macOS / Linux
pip install -r requirements.txt
uvicorn app.main:app --reload
```

- API: [http://localhost:8000](http://localhost:8000)
- Interactive docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🧠 How It Will Work

1. **Slider** sets the password length (1–100).
2. **Checkboxes** choose the character pools: uppercase, lowercase, numbers, symbols.
3. **Generate** builds a pool from the checked options and picks random characters until the length is reached.
4. **Strength meter** scores the result from length and variety (Too weak → Weak → Medium → Strong).
5. **Copy icon** sends the password to the clipboard.

### Planned state (in `App.js`)

```js
const [length, setLength] = useState(10);
const [options, setOptions] = useState({
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false,
});
const [password, setPassword] = useState("");
```

### Planned API

| Method | Endpoint | Body | Returns |
| --- | --- | --- | --- |
| `POST` | `/api/generate` | `{ length, uppercase, lowercase, numbers, symbols }` | `{ password }` |
| `POST` | `/api/strength` | `{ password }` | `{ score, label }` |
| `GET` | `/api/health` | none | `{ status: "ok" }` |

### 🔒 Security notes

- Frontend generation uses `crypto.getRandomValues()`, **not** `Math.random()`.
- Backend generation uses Python's `secrets` module, **not** `random`.
- The backend must **never log or store passwords**. Mask them in logs.
- Serve over HTTPS in production.
- The app works fully in the browser, so the backend is an optional extra. If it is down, the frontend falls back to local generation.

---

## 🗺️ Roadmap & Checklist

Work top to bottom, one phase at a time. Tick items off as you go.

## Part A: Frontend (React)

### Phase 0: Setup & housekeeping
- [x] Flatten nested `password-generator/` folder into the repo root
- [x] Rename `Componenets/` to `Components/` and fix imports
- [x] Add `.gitignore`
- [x] Write a detailed `README.md`
- [ ] Push the restructure to GitHub
- [ ] Remove unused imports in `App.js` (`CheckContainer`, `StrengthTestBox`)
- [ ] Rename `GenButn.js` to `GenerateButton.js` (and `CheckContainer` function name to match)
- [ ] Update the page title and description in `public/index.html`
- [ ] Update `public/manifest.json` (app name)

### Phase 1: Share state (the foundation)
- [ ] Move `length` state from `Slider.js` up into `App.js`
- [ ] Add `options` state (`uppercase`, `lowercase`, `numbers`, `symbols`) in `App.js`
- [ ] Add `password` state in `App.js`
- [ ] Pass state and setters down as props
- [ ] Set the slider default to something sensible (e.g. 10, not 0)

### Phase 2: Checkboxes
- [ ] Make each checkbox a controlled input (`checked` + `onChange`)
- [ ] Default uppercase, lowercase and numbers to on
- [ ] Stop the user unchecking the last remaining option

### Phase 3: Password generation (client-side)
- [ ] Create `src/utils/generatePassword.js`
- [ ] Define the character pools
- [ ] Build the pool from the checked options only
- [ ] Pick characters with `crypto.getRandomValues()`
- [ ] Guarantee at least one character from every checked type
- [ ] Shuffle the result
- [ ] Hook the **Generate** button to call it and set `password`
- [ ] Show the real password in `PasswordBox` (remove hard-coded `PTx!f5DaFX`)
- [ ] Show a placeholder before the first generation

### Phase 4: Copy to clipboard
- [ ] Click handler using `navigator.clipboard.writeText()`
- [ ] Show a "Copied!" message for about 2 seconds
- [ ] Ignore copy when there is no password
- [ ] Fallback for browsers without the Clipboard API
- [ ] Make the copy icon a real `<button>` (keyboard accessible)

### Phase 5: Strength meter (client-side)
- [ ] Create `src/utils/getStrength.js`
- [ ] Score from length and number of character types used
- [ ] Return a label: `TOO WEAK!`, `WEAK`, `MEDIUM`, `STRONG`
- [ ] Pass the score to `StrengthTestBox` as a prop
- [ ] Fill 1 to 4 bars and change colour per level
- [ ] Remove the hard-coded `MEDIUM` label

### Phase 6: Styling & UX
- [ ] Responsive layout (mobile first)
- [ ] Style the slider track to show the filled portion
- [ ] Hover and focus states for the button and checkboxes
- [ ] Use `arrow-right.svg` in the Generate button instead of the emoji
- [ ] Use `copy.svg` in `PasswordBox` instead of the inline SVG
- [ ] Light/dark theme (optional)

### Phase 7: Accessibility
- [ ] `<label>` elements tied to each checkbox
- [ ] `aria-label` on the slider and copy button
- [ ] Announce "Copied!" with `aria-live="polite"`
- [ ] Check colour contrast on text and bars
- [ ] Keyboard-only walkthrough

### Phase 8: Frontend tests
- [ ] Unit test `generatePassword` (length, types, at least one of each)
- [ ] Unit test `getStrength` (each level)
- [ ] Component test: slider updates the displayed length
- [ ] Component test: Generate updates the password
- [ ] Component test: copy shows "Copied!"

---

## Part B: FastAPI backend

> Do this **after** Phase 5, so the app already works on its own.

### B1: Project setup
- [ ] Move the React app into `frontend/` (`git mv` so history is kept)
- [ ] Create `backend/` with a virtual environment (`python -m venv .venv`)
- [ ] `pip install fastapi "uvicorn[standard]"` and save to `requirements.txt`
- [ ] Add `backend/app/main.py` with `GET /api/health`
- [ ] Run `uvicorn app.main:app --reload` and open `/docs`
- [ ] Add `.venv/` and `__pycache__/` to `.gitignore`

### B2: Generate endpoint
- [ ] Create `schemas.py` with a Pydantic `GenerateRequest` (`length` 1 to 100, four booleans)
- [ ] Reject requests where no character type is selected (HTTP 422)
- [ ] Create `services/generator.py` using the `secrets` module
- [ ] Guarantee at least one character per selected type, then shuffle
- [ ] Add `POST /api/generate` returning `{ password }`
- [ ] Try it in the `/docs` page

### B3: Strength endpoint
- [ ] Create `services/strength.py` (length + variety score)
- [ ] Add `POST /api/strength` returning `{ score, label }`
- [ ] Optional: try the `zxcvbn` library for a smarter score

### B4: Connect React to FastAPI
- [ ] Add CORS in `main.py` for `http://localhost:3000`
- [ ] Add `REACT_APP_API_URL` in `frontend/.env`
- [ ] Call `/api/generate` with `fetch` when **Generate** is clicked
- [ ] Add loading and error states
- [ ] Fall back to client-side generation if the API is unreachable
- [ ] Call `/api/strength` and feed the meter

### B5: Hardening
- [ ] Validate and cap all inputs
- [ ] Add rate limiting (e.g. `slowapi`)
- [ ] Make sure passwords are never logged
- [ ] Restrict CORS to your real frontend domain in production
- [ ] Add basic security headers

### B6: Backend tests
- [ ] Add `pytest` and `httpx`
- [ ] Test `/api/health`
- [ ] Test `/api/generate` (length, character types, bad input)
- [ ] Test `/api/strength` (each level)
- [ ] Use FastAPI's `TestClient`

### B7: Optional extras (portfolio boosters)
- [ ] Add a database (SQLite + SQLModel)
- [ ] User sign-up and login with JWT
- [ ] Save password **labels or hints only**, never the plain passwords
- [ ] Password history per user
- [ ] "Check if a password was leaked" using the Have I Been Pwned range API

### B8: Deploy
- [ ] Deploy the backend (Render, Railway or Fly.io)
- [ ] Deploy the frontend (Vercel or Netlify)
- [ ] Set environment variables on both
- [ ] Update CORS and `REACT_APP_API_URL` to the live URLs
- [ ] Add a GitHub Actions workflow to run tests on every push

---

## Part C: Polish & ship
- [ ] Add a screenshot or GIF to this README
- [ ] Run `npm run build` and fix warnings
- [ ] Add the live demo link here
- [ ] Add a LICENSE file

### 💡 Stretch ideas
- [ ] "Exclude look-alike characters" option (`0 O l 1 I`)
- [ ] Passphrase mode (random words)
- [ ] Session-only password history
- [ ] Generate several passwords at once

---

## 🤝 Contributing

This is a personal learning project, but suggestions are welcome. Open an issue or a pull request.

## 👤 Author

**Erastus Kwaw** · [@Ding-Dong101](https://github.com/Ding-Dong101)
