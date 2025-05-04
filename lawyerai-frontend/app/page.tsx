import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to LawyerAI</h1>
      <div className="flex space-x-4">
        <Link href="/signup" className="px-4 py-2 bg-blue-500 text-white rounded">Signup</Link>
        <Link href="/signin" className="px-4 py-2 bg-green-500 text-white rounded">Signin</Link>
      </div>
    </div>
  );
}

