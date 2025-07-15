"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useBookmarks } from "../../hooks/use-bookmarks"
import { ExternalLink, Trash2, Calendar, Tag, Globe, Edit } from "lucide-react" // Import Edit icon

export default function BookmarkCard({ bookmark, onEdit }) {
  // Add onEdit prop
  const { deleteBookmark } = useBookmarks()

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this bookmark?")) {
      await deleteBookmark(bookmark._id)
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

  return (
    <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-slate-200/50 bg-white/80 backdrop-blur-sm overflow-hidden">
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
                {/* Title and domain text colors */}
                <h3 className="font-semibold text-slate-900 truncate text-sm leading-tight">{bookmark.title}</h3>
                <p className="text-xs text-slate-500 truncate mt-1">{getDomainFromUrl(bookmark.url)}</p>
              </div>
            </div>
            <div className="flex space-x-1">
              {" "}
              {/* Wrap buttons in a div for spacing */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(bookmark)} // Call onEdit with the bookmark
                className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-slate-700 hover:bg-slate-50 h-8 w-8 p-0"
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
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
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 font-medium border border-violet-100"
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
        <div className="px-4 py-3 bg-gradient-to-r from-slate-50/50 to-neutral-50/50 border-t border-slate-100">
          <div className="flex items-center justify-between">
            {/* Date text color */}
            <div className="flex items-center text-xs text-slate-500">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(bookmark.createdAt)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(bookmark.url, "_blank")}
              className="h-7 px-3 text-xs hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-colors text-slate-700"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Visit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
