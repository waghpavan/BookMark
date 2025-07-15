"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "../../hooks/use-auth"
import { useBookmarks } from "../../hooks/use-bookmarks"
import { Search, Plus, LogOut, Filter, Grid3X3, List, Sparkles } from "lucide-react"

export default function DashboardHeader({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onAddBookmark,
  bookmarkCount,
}) {
  const { logout } = useAuth()
  const { selectedFolder, selectedTag, clearFilters } = useBookmarks()

  const getFilterTitle = () => {
    if (selectedFolder) return "Folder Collection"
    if (selectedTag) return `#${selectedTag}`
    return "All Bookmarks"
  }

  const getFilterSubtitle = () => {
    if (selectedFolder) return "Organized bookmarks"
    if (selectedTag) return "Tagged collection"
    return "Your complete library"
  }

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            {/* Text colors for title and subtitle */}
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {getFilterTitle()}
              </h1>
              {(selectedFolder || selectedTag) && <Sparkles className="w-5 h-5 text-amber-500" />}
            </div>
            <div className="flex items-center space-x-3 mt-1">
              <p className="text-sm text-slate-500">{getFilterSubtitle()}</p>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">
                {bookmarkCount} items
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Search Input text color */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search bookmarks..."
              className="pl-10 w-64 h-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-all text-slate-900"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* View Toggle buttons */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className={`h-8 px-3 ${viewMode === "grid" ? "bg-violet-600 text-white" : "text-slate-700 hover:bg-slate-200"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className={`h-8 px-3 ${viewMode === "list" ? "bg-violet-600 text-white" : "text-slate-700 hover:bg-slate-200"}`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Add Bookmark Button */}
          <Button
            onClick={onAddBookmark}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Bookmark
          </Button>

          {/* User Menu (Logout) */}
          <Button variant="ghost" onClick={logout} className="hover:bg-red-50 hover:text-red-600 text-slate-700">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      {(selectedFolder || selectedTag) && (
        <div className="mt-4 flex items-center space-x-3 p-3 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-lg border border-violet-100">
          <Filter className="w-4 h-4 text-violet-600" />
          <span className="text-sm text-violet-700 font-medium">Active filter:</span>
          <div className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium">
            {selectedFolder ? "📁 Folder" : `🏷️ ${selectedTag}`}
          </div>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-violet-600 hover:bg-violet-100">
            Clear filter
          </Button>
        </div>
      )}
    </header>
  )
}
