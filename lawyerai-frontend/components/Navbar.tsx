"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("name") || localStorage.getItem("user");
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    router.push("/signin");
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center">
      <span className="text-lg font-semibold">LawyerAI</span>
      <div className="flex items-center gap-4">
        {user && <span>Hello, {user}</span>}
        <button
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}

