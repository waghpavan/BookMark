"use client"
import { Button } from "@/components/ui/button"
import { useBookmarks } from "../../hooks/use-bookmarks"
import { Hash } from "lucide-react"

export default function SidebarTags() {
  const { bookmarks, selectedTag, filterByTag } = useBookmarks()

  const allTags = [...new Set(bookmarks.flatMap((bookmark) => bookmark.tags || []))]

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center">
        <Hash className="w-4 h-4 mr-2" />
        Popular Tags
      </h3>
      <div className="space-y-1">
        {allTags.slice(0, 8).map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? "default" : "ghost"}
            className={`w-full justify-start h-9 text-sm ${
              selectedTag === tag
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md" // Active state
                : "hover:bg-slate-100 text-slate-700" // Inactive state
            }`}
            onClick={() => filterByTag(tag)}
          >
            <Hash className="w-3 h-3 mr-2 flex-shrink-0" />
            <span className="truncate">{tag}</span>
          </Button>
        ))}
        {allTags.length === 0 && (
          <div className="text-center py-4">
            <Hash className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">No tags yet</p>
            <p className="text-xs text-slate-400">Tags appear when you add bookmarks</p>
          </div>
        )}
      </div>
    </div>
  )
}
