"use client";
import Link from "next/link";

export default function MiscDraftsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold mb-6">📂 Misc Legal Drafts</h1>
      <ul className="space-y-2 text-lg">
        <li><a href="/legal-drafts/misc/will" className="text-blue-600 hover:underline">Will</a></li>
<li><a href="/legal-drafts/misc/trust-deed" className="text-blue-600 hover:underline">Trust Deed</a></li>
<li><a href="/legal-drafts/misc/adoption-deed" className="text-blue-600 hover:underline">Adoption Deed</a></li>
<li><a href="/legal-drafts/misc/surrogacy-agreement" className="text-blue-600 hover:underline">Surrogacy Agreement</a></li>
<li><a href="/legal-drafts/misc/cybercrime-complaints" className="text-blue-600 hover:underline">Cybercrime Complaints</a></li>
<li><a href="/legal-drafts/misc/fir" className="text-blue-600 hover:underline">FIR</a></li>
<li><a href="/legal-drafts/misc/anticipatory-bail-application" className="text-blue-600 hover:underline">Anticipatory Bail Application</a></li>
<li><a href="/legal-drafts/misc/mou" className="text-blue-600 hover:underline">MoU</a></li>

      </ul>
    </div>
  );
}
