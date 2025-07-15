"use client"
import { Button } from "@/components/ui/button"
import { useBookmarks } from "../../hooks/use-bookmarks"
import { Home } from "lucide-react"

export default function SidebarNavigation() {
  const { selectedFolder, selectedTag, clearFilters, bookmarks } = useBookmarks()

  return (
    <div>
      <Button
        variant={!selectedFolder && !selectedTag ? "default" : "ghost"}
        className={`w-full justify-start h-11 ${
          !selectedFolder && !selectedTag
            ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg" // Active state
            : "hover:bg-slate-100 text-slate-700" // Inactive state
        }`}
        onClick={clearFilters}
      >
        <Home className="w-4 h-4 mr-3" />
        All Bookmarks
        <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">{bookmarks.length}</span>
      </Button>
    </div>
  )
}
