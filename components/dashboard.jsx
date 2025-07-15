"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "../context/auth-context"
import { useBookmarks } from "../context/bookmark-context"
import Sidebar from "./sidebar"
import BookmarkGrid from "./bookmark-grid"
import AddBookmarkModal from "./add-bookmark-modal"
import AddFolderModal from "./add-folder-modal"
import { Search, Plus, LogOut, Menu, X, Filter, Grid3X3, List, Sparkles } from "lucide-react"

export default function Dashboard() {
  const { logout } = useAuth()
  const { bookmarks, loading, selectedFolder, selectedTag, clearFilters } = useBookmarks()
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddBookmark, setShowAddBookmark] = useState(false)
  const [showAddFolder, setShowAddFolder] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState("grid")

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.url?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-sm shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-slate-200/50`}
      >
        <Sidebar onAddFolder={() => setShowAddFolder(true)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden hover:bg-slate-100"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>

              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {getFilterTitle()}
                  </h1>
                  {(selectedFolder || selectedTag) && <Sparkles className="w-5 h-5 text-amber-500" />}
                </div>
                <div className="flex items-center space-x-3 mt-1">
                  <p className="text-sm text-slate-500">{getFilterSubtitle()}</p>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">
                    {filteredBookmarks.length} items
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search bookmarks..."
                  className="pl-10 w-64 h-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 px-3"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Add Bookmark */}
              <Button
                onClick={() => setShowAddBookmark(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Bookmark
              </Button>

              {/* User Menu */}
              <Button variant="ghost" onClick={logout} className="hover:bg-red-50 hover:text-red-600">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          {(selectedFolder || selectedTag) && (
            <div className="mt-4 flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <Filter className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">Active filter:</span>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {selectedFolder ? "📁 Folder" : `🏷️ ${selectedTag}`}
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-blue-600 hover:bg-blue-100">
                Clear filter
              </Button>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50/30">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                </div>
                <p className="text-slate-600 font-medium">Loading bookmarks...</p>
              </div>
            </div>
          ) : (
            <BookmarkGrid bookmarks={filteredBookmarks} viewMode={viewMode} />
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Modals */}
      <AddBookmarkModal open={showAddBookmark} onClose={() => setShowAddBookmark(false)} />
      <AddFolderModal open={showAddFolder} onClose={() => setShowAddFolder(false)} />
    </div>
  )
}
