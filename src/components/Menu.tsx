"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuProps {
  role: string;
}

export default function Menu({ role }: MenuProps) {
  const pathname = usePathname();

  const menuItems = [
    { title: "Dashboard", path: `/dashboard/${role}`, icon: "/home.png" },
    { title: "Students", path: "/list/students", icon: "/student.png", roles: ["admin"] },
    { title: "Teachers", path: "/list/teachers", icon: "/teacher.png", roles: ["admin","student"] },
    { title: "Classes", path: "/list/classes", icon: "/class.png", roles: ["admin","student"] },
    { title: "Assignment", path: "/list/assignment", icon: "/assignment.png", roles: ["admin","teacher","student"] },
    //{ title: "Exams", path: "/exams", icon: "/exam.png", roles: ["admin","teacher","student"] },
    { title: "Result", path: "/list/results", icon: "/result.png", roles: ["admin","teacher","student"] },
    { title: "Attendance", path: "/list/Attendance", icon: "/attendance.png", roles: ["admin","teacher"] },
    { title: "Settings", path: "/settings", icon: "/setting.png", roles: ["admin","student","teacher"] },
  ];

  return (
    <div className="flex flex-col gap-2 mt-8">
      {menuItems.map((item) => {
        // Hide items that don't include the current role
        if (item.roles && !item.roles.includes(role)) return null;

        const isActive = pathname === item.path;

        return (
          <Link
            key={item.title}
            href={item.path}
            className={`flex items-center gap-6 px-4 py-3 rounded-md cursor-pointer transition-colors duration-200 ${
              isActive
                ? "bg-yellow-500 text-gray-900 font-semibold"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            <Image src={item.icon} alt={item.title} width={24} height={24} />
            <span className="hidden lg:block text-sm font-medium">{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
}





