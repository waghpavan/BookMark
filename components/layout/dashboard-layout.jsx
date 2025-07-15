"use client"
import { useState } from "react"
import Sidebar from "../sidebar/sidebar"

export default function DashboardLayout({ children, onAddFolder }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-sm shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-slate-200/50`}
      >
        <Sidebar onAddFolder={onAddFolder} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
