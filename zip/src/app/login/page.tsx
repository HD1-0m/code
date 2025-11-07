"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Fetch user from the "login" table
      const { data, error } = await supabase
        .from("login")
        .select("email, password, role")
        .eq("email", email)
        .single();

      if (error || !data) {
        setError("Invalid email or password");
        return;
      }

      // 2️⃣ Simple password check (⚠️ use hashing in production)
      if (data.password !== password) {
        setError("Invalid email or password");
        return;
      }

      // 3️⃣ Store role for layout-based redirects
      localStorage.setItem("role", data.role);

      // 4️⃣ Redirect based on role
      switch (data.role) {
        case "student":
          router.push("/student");
          break;
        case "teacher":
          router.push("/teacher");
          break;
        case "admin":
          router.push("/admin");
          break;
        default:
          setError("Unknown role. Contact admin.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-[#CFCEFF]"
    >
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96 text-center"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="BasicVmedulife Logo"
            width={120}
            height={120}
            priority
          />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#0096FF]">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[#6495ED] p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#6495ED]"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[#6495ED] p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-[#6495ED]"
          required
        />

        <button
          type="submit"
          className="w-full py-3 rounded font-semibold bg-[#0096FF] text-white hover:bg-[#6495ED] transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#6495ED] hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
