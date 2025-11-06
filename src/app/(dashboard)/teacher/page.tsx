"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BigCalendar from "@/components/BigCalendar";
import EventCalender from "@/components/EventCalender";

export default function TeacherDashboard() {
  const router = useRouter();

  // Check role on mount
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role || (role !== "teacher" && role !== "admin")) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT SECTION */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md shadow flex flex-col gap-4">
          <h1 className="text-xl font-semibold mb-4">Teacher Dashboard</h1>
          <h2 className="text-lg font-semibold mb-2">Schedule</h2>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalender />
      </div>
    </div>
  );
}


