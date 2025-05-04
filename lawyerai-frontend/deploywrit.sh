#!/bin/bash

TARGET_DIR="app/legal-drafts/court/writ-petition"
echo "📁 Ensuring $TARGET_DIR exists..."
mkdir -p "$TARGET_DIR"

# Create main selection page
cat > "$TARGET_DIR/page.tsx" << 'EOF'
"use client";

import Link from "next/link";

const writs = [
  { name: "Habeas Corpus", slug: "habeas-corpus", description: "Seeks release of a person illegally detained." },
  { name: "Mandamus", slug: "mandamus", description: "Commands a public authority to perform its duty." },
  { name: "Certiorari", slug: "certiorari", description: "Quashes an illegal order by a lower court/tribunal." },
  { name: "Prohibition", slug: "prohibition", description: "Prevents a lower court from acting beyond its power." },
  { name: "Quo-Warranto", slug: "quo-warranto", description: "Challenges unlawful claim to a public office." },
];

export default function WritSelectionPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50 text-center">
      <h1 className="text-2xl font-bold mb-6">Select a Writ Type</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {writs.map((writ) => (
          <Link
            key={writ.slug}
            href={`/legal-drafts/court/writ-petition/${writ.slug}`}
            className="block p-4 bg-white shadow hover:bg-blue-50 rounded border border-gray-200 transition"
          >
            <h2 className="text-xl font-semibold">{writ.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{writ.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
EOF

# Writ list and messages
writ_slugs=("habeas-corpus" "mandamus" "certiorari" "prohibition" "quo-warranto")
writ_titles=("🧍 Habeas Corpus Draft – Coming Soon" "📜 Mandamus Draft – Coming Soon" "📄 Certiorari Draft – Coming Soon" "🚫 Prohibition Draft – Coming Soon" "❓ Quo-Warranto Draft – Coming Soon")

for i in "${!writ_slugs[@]}"; do
  slug="${writ_slugs[$i]}"
  msg="${writ_titles[$i]}"
  cat > "$TARGET_DIR/$slug.tsx" << EOF
"use client";

export default function ${slug//-/_}Page() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <h1 className="text-2xl font-bold">$msg</h1>
    </div>
  );
}
EOF
done

echo "✅ Writ Petition UI successfully generated under $TARGET_DIR."

