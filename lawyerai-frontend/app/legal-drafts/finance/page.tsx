"use client";
import Link from "next/link";

export default function FinanceDraftsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold mb-6">📂 Finance Legal Drafts</h1>
      <ul className="space-y-2 text-lg">
        <li><a href="/legal-drafts/finance/itr" className="text-blue-600 hover:underline">ITR</a></li>
<li><a href="/legal-drafts/finance/form-16" className="text-blue-600 hover:underline">Form 16</a></li>
<li><a href="/legal-drafts/finance/loan-agreements" className="text-blue-600 hover:underline">Loan Agreements</a></li>
<li><a href="/legal-drafts/finance/bank-statements" className="text-blue-600 hover:underline">Bank Statements</a></li>
<li><a href="/legal-drafts/finance/investment-proofs" className="text-blue-600 hover:underline">Investment Proofs</a></li>
<li><a href="/legal-drafts/finance/insurance-policies" className="text-blue-600 hover:underline">Insurance Policies</a></li>

      </ul>
    </div>
  );
}
