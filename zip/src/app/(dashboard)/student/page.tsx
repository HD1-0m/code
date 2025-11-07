"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BigCalendar from "@/components/BigCalendar";
import EventCalender from "@/components/EventCalender";
import { subscribeToNotifications } from "@/utils/notifications";

export default function StudentDashboard() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role) {
      router.push("/login");
      return;
    }
    if (role !== "student" && role !== "admin") {
      router.push("/login");
      return;
    }

    // ✅ Subscribe student to push notifications
    subscribeToNotifications();

  }, [router]);

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT SECTION */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md shadow">
          <h1 className="text-xl font-semibold mb-4">Student Dashboard</h1>
          <h2 className="text-lg font-semibold mb-2">Schedule (IT A)</h2>
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
