# TrustVite - Decentralized Voting Platform

A modern, secure, and transparent blockchain-based voting application built with React and Vite.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** v7+

---

## 📦 Project Setup

### 1. Initialize Vite (if starting from scratch)

```bash
# Create a new Vite project with React
npm create vite@latest trustvote -- --template react

# Navigate to project
cd trustvote

# Install dependencies
npm install
```

### 2. Install Tailwind CSS v4

```bash
# Install Tailwind CSS and dependencies
npm install -D tailwindcss @tailwindcss/vite postcss autoprefixer

```

### 3. Configure Vite (vite.config.js)

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

## 🎨 Custom Colors & Configuration

@theme {
/_ Colors _/
--color-primary: #5ec768;
--color-secondary: #e3be77;
--color-dark: #101411;
--color-surface: #132a15;

/_ Font families _/
--font-display: "Space Grotesk", "sans-serif";

/_ Border radii — you can define custom variables if needed _/
/_ For example _/
--radius-default: 0.25rem;
--radius-lg: 0.5rem;
--radius-xl: 0.75rem;
--radius-full: 9999px;
}

### Add Custom Colors in `index.css`

The main stylesheet where Tailwind CSS is imported and custom utilities are defined:

````css
@import "tailwindcss";
@theme {
  /* Colors */
  --color-primary: #5ec768;
  --color-secondary: #e3be77;
  --color-dark: #101411;

  /* Font families */
  --font-display: "Space Grotesk", "sans-serif";

  /* Border radii — you can define custom variables if needed */
  /* For example */
  --radius-default: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;
}
/* Custom utility classes */
@layer utilities {
  /* Glow effects */
  .glow-effect {
    box-shadow: 0 0 15px 0px rgba(94, 199, 104, 0.4);
  }
}

**file: `src/index.css` * * ```css @import "tailwindcss";
@theme {
  /* Colors */
  --color-primary: #5ec768;
  --color-secondary: #e3be77;
  --color-dark: #101411;
  --color-surface: #132a15;

  /* Font families */
  --font-display: "Space Grotesk", "sans-serif";

  /* Border radii — you can define custom variables if needed */
  /* For example */
  --radius-default: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;
}
/* Custom utility classes */
@layer utilities {
  /* Glow effects */
  .glow-effect {
    box-shadow: 0 0 15px 0px rgba(94, 199, 104, 0.4);
  }

  .glow-effect-secondary {
    box-shadow: 0 0 15px 0px rgba(227, 190, 119, 0.3);
  }

  /* Custom container styles */
  .container-dark {
    @apply bg-background-dark rounded-xl border border-white/10 p-10;
  }

  /* Custom button styles */
  .btn-primary {
    @apply bg-primary text-dark px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all duration-300 glow-effect;
  }

  .btn-secondary {
    @apply bg-transparent border border-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary/10 transition-colors duration-300 glow-effect-secondary;
  }
}

/* Global styles */
body {
  @apply bg-dark font-display text-white;
}

html {
  scroll-behavior: smooth;
}
````

### Use Custom Colors in Components

**In JSX files:**

```jsx
// Using custom color classes
<button className="bg-primary text-dark hover:bg-primary/90">
  Register to Vote
</button>

<div className="text-secondary text-lg">
  Soft gold text
</div>

<div className="bg-background-dark rounded-xl p-8">
  Dark container
</div>

// Using custom utilities
<div className="glow-effect bg-background-dark-secondary">
  Glowing dark card
</div>
```

**Usage in classes:**

- `bg-primary` → Green background
- `text-primary` → Green text
- `border-secondary` → Gold border
- `bg-dark` → Dark background
- `hover:bg-primary/50` → 50% opacity green on hover

---

## 🏗️ Project Structure

```
trustvote/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   └── HowItWorks.jsx
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css              # Global styles & custom utilities
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
├── postcss.config.mjs
├── package.json
└── README.md
```

---

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

---

## 📚 Useful Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com/)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [React Official Docs](https://react.dev/)

---

## 🔐 Features

✅ Decentralized voting system  
✅ Blockchain-powered security  
✅ Real-time vote tracking  
✅ Modern dark-themed UI  
✅ Responsive design  
✅ Custom color scheme

---

## 📝 License

This project is part of the FYP (Final Year Project).

---

## 👤 Contributors

- Development Team
- Kashaf
- x
- y

---

**Last Updated:** October 19, 2025
