# 🔐 Password Generator

A clean, React-based password generator. Pick a length, choose which character types to include, and generate a random password you can copy in one click.

> **Status:** 🚧 UI complete, logic in progress. The layout, slider and checkboxes are built; password generation, copy-to-clipboard and the strength meter are still being wired up. See [TODO.md](./TODO.md) for the full checklist.

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

---

## 🧱 Tech Stack

- **React 19** (UI components and state)
- **Create React App** (`react-scripts` 5)
- **Plain CSS** (`App.css`, `index.css`)
- **Testing Library** + Jest (set up, tests not written yet)

---

## 📁 Project Structure

```
PasswordGenerator/
├── public/
│   ├── index.html          # HTML shell
│   ├── manifest.json       # PWA metadata
│   └── robots.txt
├── src/
│   ├── Components/
│   │   ├── PasswordBox.js      # Shows the password + copy icon
│   │   ├── Slider.js           # Length slider; wraps the options below
│   │   ├── CheckContainer.js   # Uppercase / lowercase / numbers / symbols checkboxes
│   │   ├── StrengthTestBox.js  # Strength label + 4 colour bars
│   │   └── GenButn.js          # "Generate" button
│   ├── Images/
│   │   ├── copy.svg
│   │   └── arrow-right.svg
│   ├── App.js              # Root component, assembles the page
│   ├── App.css             # Component styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── .gitignore
├── package.json
├── package-lock.json
├── TODO.md
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
- npm (ships with Node)

### Install and run

```bash
# 1. Clone the repo
git clone https://github.com/Ding-Dong101/PasswordGenerator.git
cd PasswordGenerator

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Command | What it does |
| --- | --- |
| `npm start` | Runs the app in development mode with hot reload |
| `npm test` | Runs the test runner in watch mode |
| `npm run build` | Creates an optimised production build in `build/` |

---

## 🧠 How It Will Work

1. **Slider** sets the password length (1–100).
2. **Checkboxes** decide which character pools are used:
   - Uppercase `A–Z`
   - Lowercase `a–z`
   - Numbers `0–9`
   - Symbols `!@#$%^&*...`
3. **Generate** builds a pool from the checked options and picks random characters until the length is reached.
4. **Strength meter** scores the result from length and variety (Too weak → Weak → Medium → Strong).
5. **Copy icon** sends the password to the clipboard.

### Planned state design

All shared state will live in `App.js` and be passed down as props, so the generate button, checkboxes, slider and display box stay in sync:

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

### Security note

Random characters should come from `crypto.getRandomValues()` rather than `Math.random()`, because `Math.random()` is not cryptographically secure. Passwords are generated entirely in the browser and are never sent or stored anywhere.

---

## 🗺️ Roadmap

The full step-by-step checklist is in **[TODO.md](./TODO.md)**. Headline goals:

- [ ] Lift state up to `App.js`
- [ ] Wire checkboxes and generate button
- [ ] Secure random generation
- [ ] Copy to clipboard
- [ ] Live strength meter
- [ ] Responsive design, accessibility, tests, deployment

---

## 🤝 Contributing

This is a personal learning project, but suggestions are welcome. Open an issue or a pull request.

## 👤 Author

**Erastus Kwaw** · [@Ding-Dong101](https://github.com/Ding-Dong101)
