"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setEmail(user.email || "");
    } else {
      router.push("/signin"); // 🔒 No user found, redirect to signin
    }
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("No access token found. Please login again.");
      }

      const res = await fetch("http://localhost:8000/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      // Update name in localStorage
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        user.name = name;
        localStorage.setItem("user", JSON.stringify(user));
      }

      router.push("/dashboard"); // ✅ Done, go to dashboard
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Update Your Profile</h2>
        <p className="text-center mb-4 text-gray-600">Email: {email}</p>
        <input
          className="w-full p-2 mb-2 border rounded"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

