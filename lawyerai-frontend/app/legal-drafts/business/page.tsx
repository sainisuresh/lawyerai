"use client";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 Available Drafts</h1>
      <ul className="space-y-3 max-w-2xl mx-auto">
        <li><Link href="./employment-contract" className="text-blue-600 hover:underline">Employment Contract</Link></li>
        <li><Link href="./franchise-agreements" className="text-blue-600 hover:underline">Franchise Agreements</Link></li>
        <li><Link href="./gst-registration" className="text-blue-600 hover:underline">Gst Registration</Link></li>
      </ul>
    </div>
  );
}
