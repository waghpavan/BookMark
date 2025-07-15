"use client"
import { useState } from "react"
import DashboardLayout from "../layout/dashboard-layout"
import DashboardHeader from "../dashboard/dashboard-header"
import BookmarkGrid from "../bookmarks/bookmark-grid"
import BookmarkList from "../bookmarks/bookmark-list"
import AddBookmarkModal from "../modals/add-bookmark-modal"
import AddFolderModal from "../modals/add-folder-modal"
import { useBookmarks } from "../../hooks/use-bookmarks"

export default function DashboardPage() {
  const { bookmarks, loading } = useBookmarks()
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddBookmark, setShowAddBookmark] = useState(false)
  const [showAddFolder, setShowAddFolder] = useState(false)
  const [viewMode, setViewMode] = useState("grid")

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.url?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <DashboardLayout onAddFolder={() => setShowAddFolder(true)}>
      <DashboardHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddBookmark={() => setShowAddBookmark(true)}
        bookmarkCount={filteredBookmarks.length}
      />

      <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-50 to-neutral-50/30">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-violet-200 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-violet-600 rounded-full animate-spin border-t-transparent"></div>
              </div>
              <p className="text-slate-600 font-medium">Loading bookmarks...</p>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <BookmarkGrid bookmarks={filteredBookmarks} />
        ) : (
          <BookmarkList bookmarks={filteredBookmarks} />
        )}
      </main>

      <AddBookmarkModal open={showAddBookmark} onClose={() => setShowAddBookmark(false)} />
      <AddFolderModal open={showAddFolder} onClose={() => setShowAddFolder(false)} />
    </DashboardLayout>
  )
}
