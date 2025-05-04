"use client";
import Link from "next/link";

export default function PropertyDraftsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold mb-6">📂 Property Legal Drafts</h1>
      <ul className="space-y-2 text-lg">
        <li><a href="/legal-drafts/property/sale-deed" className="text-blue-600 hover:underline">Sale Deed</a></li>
<li><a href="/legal-drafts/property/title-deed" className="text-blue-600 hover:underline">Title Deed</a></li>
<li><a href="/legal-drafts/property/encumbrance-certificate" className="text-blue-600 hover:underline">Encumbrance Certificate</a></li>
<li><a href="/legal-drafts/property/property-tax-receipts" className="text-blue-600 hover:underline">Property Tax Receipts</a></li>
<li><a href="/legal-drafts/property/mutation-certificate" className="text-blue-600 hover:underline">Mutation Certificate</a></li>
<li><a href="/legal-drafts/property/lease-agreement" className="text-blue-600 hover:underline">Lease Agreement</a></li>
<li><a href="/legal-drafts/property/gift-deed" className="text-blue-600 hover:underline">Gift Deed</a></li>
<li><a href="/legal-drafts/property/power-of-attorney" className="text-blue-600 hover:underline">Power of Attorney</a></li>
<li><a href="/legal-drafts/property/occupancy-certificate" className="text-blue-600 hover:underline">Occupancy Certificate</a></li>
<li><a href="/legal-drafts/property/building-completion-certificate" className="text-blue-600 hover:underline">Building Completion Certificate</a></li>

      </ul>
    </div>
  );
}
