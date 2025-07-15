"use client"
import { Bookmark, Sparkles } from "lucide-react"

export default function SidebarHeader() {
  return (
    <div className="p-6 border-b border-slate-200/50">
      <div className="flex items-center space-x-3">
        <div className="relative">
          {/* Icon background matching new primary */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
            <Bookmark className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
        </div>
        <div>
          {/* Text colors for title and subtitle */}
          <h2 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            BookmarkHub
          </h2>
          <p className="text-xs text-slate-500">Your digital sanctuary</p>
        </div>
      </div>
    </div>
  )
}
