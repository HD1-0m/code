"use client";
import { subscribeToNotifications } from "@/utils/notifications";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AttendenceChart from "@/components/AttendenceChart";
import CountChart from "@/components/CountCharts";
import EventCalender from "@/components/EventCalender";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

export default function AdminDashboard() {
  const router = useRouter();

  // Check role on mount
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role || role !== "admin") {
      router.push("/login");
    }
    subscribeToNotifications();

  }, [router]);

  return (
    <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      {/* LEFT SECTION */}
      <div className="w-full lg:w-2/3 flex flex-col space-y-4">
        {/* Header */}
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>

        {/* User Cards */}
        <div className="flex justify-start gap-4 flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>

        {/* Mid Charts */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendenceChart />
          </div>
        </div>

        {/* Bottom Chart */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalender />
      </div>
    </div>
  );
}

