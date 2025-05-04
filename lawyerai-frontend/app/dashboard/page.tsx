"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name?: string; role?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error("Error parsing user from localStorage", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    router.push("/signin");
  };

  const nameOrEmail = user?.name?.trim() ? user.name : user?.email;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {nameOrEmail} {user?.role && <span className="text-blue-500 capitalize">({user.role})</span>}</h1>
        <p className="text-gray-600 mb-6">Choose an option to proceed:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={() => router.push("/find-lawyer")} className="btn-primary">Find a Lawyer</button>
          <button onClick={() => router.push("/upload-document")} className="btn-primary">Upload Document</button>
          <button onClick={() => router.push("/legal-drafts")} className="btn-primary">Legal Drafts</button>
          <button onClick={() => router.push("/legal-chat")} className="btn-primary">Legal Chat</button>
          <button onClick={() => router.push("/my-documents")} className="btn-primary">My Documents</button>
        </div>
        <button onClick={handleLogout} className="mt-6 text-red-600 hover:underline text-sm">
          Logout
        </button>
      </div>
    </div>
  );
}

