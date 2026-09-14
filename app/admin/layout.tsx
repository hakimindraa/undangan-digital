"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, MessageSquare, Upload, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menuItems = [
    { name: "Overview", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Tamu (RSVP & Link)", path: "/admin/guests", icon: <Users size={20} /> },
    { name: "Ucapan", path: "/admin/wishes", icon: <MessageSquare size={20} /> },
    { name: "Import Tamu", path: "/admin/import", icon: <Upload size={20} /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.path
                  ? "bg-primary text-emas"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
        </div>
        
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
