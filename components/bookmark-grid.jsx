"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useBookmarks } from "../context/bookmark-context"
import { ExternalLink, Trash2, Calendar, Tag, Globe, Star } from "lucide-react"

export default function BookmarkGrid({ bookmarks, viewMode = "grid" }) {
  const { deleteBookmark } = useBookmarks()

  const handleDelete = async (bookmarkId) => {
    if (window.confirm("Are you sure you want to delete this bookmark?")) {
      await deleteBookmark(bookmarkId)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getDomainFromUrl = (url) => {
    try {
      return new URL(url).hostname.replace("www.", "")
    } catch {
      return url
    }
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto">
            <ExternalLink className="w-10 h-10 text-blue-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No bookmarks found</h3>
        <p className="text-slate-500 mb-6">Start building your digital library by adding your first bookmark!</p>
        <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            Save any URL
          </div>
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-1" />
            Organize with tags
          </div>
        </div>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {bookmarks.map((bookmark) => (
          <Card
            key={bookmark._id}
            className="hover:shadow-lg transition-all duration-200 border-slate-200/50 bg-white/80 backdrop-blur-sm"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    {bookmark.favicon ? (
                      <img
                        src={bookmark.favicon || "/placeholder.svg"}
                        alt=""
                        className="w-6 h-6 rounded"
                        onError={(e) => {
                          e.target.style.display = "none"
                        }}
                      />
                    ) : (
                      <div className="w-6 h-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded flex items-center justify-center">
                        <Globe className="w-3 h-3 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate">{bookmark.title}</h3>
                    <p className="text-sm text-slate-500 truncate">{getDomainFromUrl(bookmark.url)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {bookmark.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(bookmark.url, "_blank")}
                    className="hover:bg-blue-50 hover:border-blue-200"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Visit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(bookmark._id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {bookmarks.map((bookmark) => (
        <Card
          key={bookmark._id}
          className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-slate-200/50 bg-white/80 backdrop-blur-sm overflow-hidden"
        >
          <CardContent className="p-0">
            {/* Header */}
            <div className="p-4 pb-3">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    {bookmark.favicon ? (
                      <img
                        src={bookmark.favicon || "/placeholder.svg"}
                        alt=""
                        className="w-8 h-8 rounded-lg shadow-sm"
                        onError={(e) => {
                          e.target.style.display = "none"
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                        <Globe className="w-4 h-4 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate text-sm leading-tight">{bookmark.title}</h3>
                    <p className="text-xs text-slate-500 truncate mt-1">{getDomainFromUrl(bookmark.url)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(bookmark._id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>

              {bookmark.summary && (
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{bookmark.summary}</p>
              )}
            </div>

            {/* Tags */}
            {bookmark.tags && bookmark.tags.length > 0 && (
              <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-1">
                  {bookmark.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium border border-blue-100"
                    >
                      <Tag className="w-2 h-2 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {bookmark.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-600 font-medium">
                      +{bookmark.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-4 py-3 bg-gradient-to-r from-slate-50/50 to-blue-50/50 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-slate-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(bookmark.createdAt)}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(bookmark.url, "_blank")}
                  className="h-7 px-3 text-xs hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Visit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
