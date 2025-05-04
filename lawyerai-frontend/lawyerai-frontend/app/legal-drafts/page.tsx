"use client";
import { useRouter } from "next/navigation";

const categories = [
  { title: "Property & Real Estate", description: "Sale Deed, Lease, POA, etc.", color: "bg-blue-100", slug: "property" },
  { title: "Business & Commercial", description: "MoA, NDA, Franchise Agreements", color: "bg-yellow-100", slug: "business" },
  { title: "Court & Litigation", description: "Petitions, Affidavits, Judgments", color: "bg-red-100", slug: "court" },
  { title: "Finance & Taxation", description: "ITR, Form 16, Loan Agreement", color: "bg-green-100", slug: "finance" },
  { title: "Family & Personal Law", description: "Divorce, Custody, Maintenance, Wills", color: "bg-purple-100", slug: "family" },
  { title: "Administrative Law", description: "RTI, Election Petitions", color: "bg-pink-100", slug: "admin" },
  { title: "Miscellaneous", description: "Cybercrime, Surrogacy, Trusts", color: "bg-orange-100", slug: "misc" },
];

export default function LegalDraftsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Legal Drafts Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => router.push(\`/legal-drafts/\${cat.slug}\`)}
            className={\`\${cat.color} p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition\`}
          >
            <h2 className="text-xl font-semibold">{cat.title}</h2>
            <p className="text-gray-700 mt-2">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
