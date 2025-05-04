"use client";

import { useRouter } from "next/navigation";

const courtDocs = [
  { name: "Petition", path: "petition" },
  { name: "Plaint", path: "plaint" },
  { name: "Written Statement", path: "written-statement" },
  { name: "Affidavit", path: "affidavit" },
  { name: "POA for Litigation", path: "poa-for-litigation" },
  { name: "Summons", path: "summons" },
  { name: "Warrant", path: "warrant" },
  { name: "Judgment", path: "judgment" },
  { name: "Decree", path: "decree" },
  { name: "Bail Application", path: "bail-application" },
  { name: "Writ Petition", path: "writ-petition" },
];

export default function CourtDraftsPage() {
  const router = useRouter();

  const goToDraft = (path: string) => {
    router.push(`/legal-drafts/court/${path}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🧑‍⚖️ Court Legal Drafts</h1>
      <div className="w-full max-w-md flex flex-col gap-3">
        {courtDocs.map((doc) => (
          <button
            key={doc.path}
            onClick={() => goToDraft(doc.path)}
            className="py-3 px-4 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            {doc.name}
          </button>
        ))}
      </div>
    </div>
  );
}

