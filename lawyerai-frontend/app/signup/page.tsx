"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "citizen");

    try {
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.detail || "Signup failed");
      }

      // Auto login
      const loginForm = new FormData();
      loginForm.append("username", email);
      loginForm.append("password", password);

      const loginRes = await fetch("http://localhost:8000/token", {
        method: "POST",
        body: loginForm,
      });

      const data = await loginRes.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
        <input className="w-full p-2 mb-2 border rounded" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input className="w-full p-2 mb-4 border rounded" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
}

