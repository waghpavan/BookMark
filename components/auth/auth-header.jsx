"use client"
import { Bookmark, Sparkles } from "lucide-react"

export default function AuthHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          {/* Icon background matching new primary */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <Bookmark className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>
      {/* Text colors for title and subtitle */}
      <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
        BookmarkHub
      </h1>
      <p className="text-slate-600 text-lg">Your personal link sanctuary</p>
    </div>
  )
}
