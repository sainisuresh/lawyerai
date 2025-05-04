#!/bin/bash

# ========== CONFIG ==========
APP_NAME="lawyerai-frontend"
DEPLOY_DIR="$PWD/$APP_NAME"
PORT=3000
BACKEND_URL="http://127.0.0.1:8000"

# ========== CLEANUP OLD ==========
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

# ========== STEP 1: INIT PROJECT ==========
cd "$DEPLOY_DIR"
npm init -y
npm install next react react-dom
npm install -D typescript @types/react @types/node tailwindcss postcss autoprefixer
npx tailwindcss init -p

# ========== STEP 2: ADD .env ==========
cat <<EOF > .env.local
NEXT_PUBLIC_API_BASE_URL=$BACKEND_URL
EOF

# ========== STEP 3: ADD NEXT CONFIG ==========
cat <<EOF > next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
}
module.exports = nextConfig;
EOF

# ========== STEP 4: TSCONFIG ==========
cat <<EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOF

# ========== STEP 5: STYLES ==========
mkdir -p styles
cat <<EOF > styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# ========== STEP 6: TAILWIND CONFIG ==========
cat <<EOF > tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
EOF

# ========== STEP 7: APP STRUCTURE ==========
mkdir -p app
cat <<EOF > app/layout.tsx
import '../styles/globals.css';

export const metadata = {
  title: 'LawyerAI',
  description: 'Legal assistant powered by AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
EOF

cat <<EOF > app/page.tsx
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to LawyerAI</h1>
      <p className="text-lg">Serving Humanity with Legal Intelligence</p>
    </main>
  );
}
EOF

# ========== STEP 8: NPM SCRIPTS ==========
jq '.scripts += {
  "dev": "next dev -p '"$PORT"'",
  "build": "next build",
  "start": "next start -p '"$PORT"'"
}' package.json > package.tmp.json && mv package.tmp.json package.json

# ========== STEP 9: FINAL ==========
npx tsc --init --resolveJsonModule --esModuleInterop
npm install
npm run build
npm run dev

