"use client"

import React, { forwardRef } from "react";
import { Button } from "@/components/ui/button"
import { useBookmarks } from "../context/bookmark-context"
import { Bookmark, Folder, Plus, Hash, Home, Sparkles, TrendingUp } from "lucide-react"

const Sidebar = forwardRef<HTMLDivElement>(({ onAddFolder }, ref) => {
  const { folders, bookmarks, selectedFolder, selectedTag, filterByFolder, filterByTag, clearFilters } = useBookmarks()

  const allTags = [...new Set(bookmarks.flatMap((bookmark) => bookmark.tags || []))]
  const recentBookmarks = bookmarks.slice(0, 5)

  return (
    <div ref={ref} className="h-full flex flex-col bg-white/95 backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
              <Bookmark className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              BookmarkHub
            </h2>
            <p className="text-xs text-slate-500">Your digital sanctuary</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Main Navigation */}
          <div>
            <Button
              variant={!selectedFolder && !selectedTag ? "default" : "ghost"}
              className={`w-full justify-start h-11 ${
                !selectedFolder && !selectedTag
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "hover:bg-slate-100"
              }`}
              onClick={clearFilters}
            >
              <Home className="w-4 h-4 mr-3" />
              All Bookmarks
              <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">{bookmarks.length}</span>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl border border-slate-200/50">
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

          {/* Folders */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center">
                <Folder className="w-4 h-4 mr-2" />
                Folders
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddFolder}
                className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {folders.map((folder) => (
                <Button
                  key={folder._id}
                  variant={selectedFolder === folder._id ? "default" : "ghost"}
                  className={`w-full justify-start h-10 ${
                    selectedFolder === folder._id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "hover:bg-slate-100"
                  }`}
                  onClick={() => filterByFolder(folder._id)}
                >
                  <Folder className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="truncate">{folder.name}</span>
                </Button>
              ))}
              {folders.length === 0 && (
                <div className="text-center py-4">
                  <Folder className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No folders yet</p>
                  <Button variant="ghost" size="sm" onClick={onAddFolder} className="mt-2 text-blue-600">
                    Create your first folder
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Popular Tags */}
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
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "hover:bg-slate-100"
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
        </div>
      </div>
    </div>
  )
})

export default Sidebar
