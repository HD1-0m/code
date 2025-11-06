"use client";

import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./globals.css"; // Ensure global styles are imported here

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const r = localStorage.getItem("role");
    if (!r) router.push("/login"); // redirect if not logged in
    else setRole(r);
  }, [router]);

  if (!role) return null; // prevent flash of layout before role loads

  const handleLogout = () => {
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <html lang="en">
      <body>
        <div className="h-screen flex">
          {/* LEFT: SIDEBAR */}
          <div className="w-[210px] h-full bg-white flex flex-col p-5 border-r hidden lg:flex">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <Image src="/logo.png" alt="BasicVmedulife Logo" width={36} height={36} priority />
              <span className="font-bold text-lg text-gray-900">BasicVmedulife</span>
            </Link>

            <div className="w-full mt-4">
              <Menu role={role} />
            </div>

            <button
              onClick={handleLogout}
              className="mt-auto bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* RIGHT: MAIN CONTENT */}
          <div className="flex-1 flex flex-col h-full">
            <div className="flex-shrink-0">
              <Navbar role={role} onLogout={handleLogout} />
            </div>

            <div className="flex-1 overflow-auto p-4 bg-[#F7F8FA] shadow-inner shadow-gray-300">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
