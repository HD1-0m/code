"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) router.push("/login");
    else setRole(storedRole);
  }, [router]);

  if (!role) return null;

  const handleLogout = () => {
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <div className="h-screen flex">
      {/* LEFT: SIDEBAR */}
      <div className="w-[210px] h-full bg-white flex flex-col border-r">
        <Menu role={role} onLogout={handleLogout} />
      </div>

      {/* RIGHT: MAIN AREA */}
      <div className="flex-1 flex flex-col">
        <Navbar role={role} onLogout={handleLogout} />
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </div>
  );
}
