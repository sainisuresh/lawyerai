"use client";

import Link from "next/link";

const writs = [
  {
    name: "Habeas Corpus",
    slug: "habeas-corpus",
    description: "Seeks release of a person illegally detained.",
  },
  {
    name: "Mandamus",
    slug: "mandamus",
    description: "Commands a public authority to perform its duty.",
  },
  {
    name: "Certiorari",
    slug: "certiorari",
    description: "Quashes an illegal order by a lower court/tribunal.",
  },
  {
    name: "Prohibition",
    slug: "prohibition",
    description: "Prevents a lower court from acting beyond its power.",
  },
  {
    name: "Quo-Warranto",
    slug: "quo-warranto",
    description: "Challenges unlawful claim to a public office.",
  },
];

export default function WritSelectionPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50 text-center">
      <h1 className="text-2xl font-bold mb-6">Select a Writ Type</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {writs.map((writ) => (
          <Link
            key={writ.slug}
            href={`/legal-drafts/court/petition/writ/${writ.slug}`}
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
