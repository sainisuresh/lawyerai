"use client";
import Link from "next/link";

export default function LegalDraftsHome() {
  const categories = [
    { path: "property", label: "🏠 Property & Real Estate" },
    { path: "business", label: "💼 Business & Commercial" },
    { path: "court", label: "⚖️ Court & Litigation" },
    { path: "finance", label: "🧾 Finance & Taxation" },
    { path: "misc", label: "📜 Miscellaneous" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold mb-6">📁 Legal Draft Categories</h1>
      <ul className="space-y-4 text-xl">
        {categories.map((cat) => (
          <li key={cat.path}>
            <Link href={`/legal-drafts/${cat.path}`} className="text-blue-600 hover:underline">
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

