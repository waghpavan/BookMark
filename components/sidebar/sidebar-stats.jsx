"use client"
import { useBookmarks } from "../../hooks/use-bookmarks"
import { TrendingUp } from "lucide-react"

export default function SidebarStats() {
  const { bookmarks, folders } = useBookmarks()

  return (
    <div className="bg-gradient-to-r from-slate-50 to-neutral-50 p-4 rounded-xl border border-slate-200/50">
      <div className="flex items-center space-x-2 mb-3">
        <TrendingUp className="w-4 h-4 text-slate-600" />
        <h3 className="text-sm font-semibold text-slate-700">Quick Stats</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">{bookmarks.length}</div>
          <div className="text-xs text-slate-500">Bookmarks</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">{folders.length}</div>
          <div className="text-xs text-slate-500">Folders</div>
        </div>
      </div>
    </div>
  )
}
