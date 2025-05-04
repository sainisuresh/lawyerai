"use client";

import { useRouter } from "next/navigation";

const writs = [
  {
    title: "Habeas Corpus",
    emoji: "🧍‍♂️",
    path: "habeas-corpus",
    desc: "Seeks the release of a person who has been unlawfully detained or imprisoned.",
  },
  {
    title: "Mandamus",
    emoji: "🏛️",
    path: "mandamus",
    desc: "Directs a public official or authority to perform a duty they have failed to fulfill.",
  },
  {
    title: "Certiorari",
    emoji: "📝",
    path: "certiorari",
    desc: "Used to quash an illegal or incorrect order issued by a lower court or tribunal.",
  },
  {
    title: "Prohibition",
    emoji: "⛔",
    path: "prohibition",
    desc: "Stops a lower court or authority from continuing proceedings beyond its jurisdiction.",
  },
  {
    title: "Quo Warranto",
    emoji: "🧾",
    path: "quo-warranto",
    desc: "Challenges the legal authority of a person occupying a public office.",
  },
];

export default function WritPetitionPage() {
  const router = useRouter();

  const goToDraft = (path: string) => {
    router.push(`/legal-drafts/court/writ-petition/${path}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">👨‍⚖️ Choose Writ Petition</h1>
      <p className="text-gray-600 max-w-xl mb-8 text-center">
        A writ petition helps protect your constitutional rights. Choose the type that fits your legal case:
      </p>
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {writs.map((writ) => (
          <div
            key={writ.path}
            className="bg-white border rounded-lg p-4 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">
                {writ.emoji} {writ.title}
              </h2>
              <p className="text-sm text-gray-600">{writ.desc}</p>
            </div>
            <button
              onClick={() => goToDraft(writ.path)}
              className="mt-3 sm:mt-0 sm:ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              View Draft
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

