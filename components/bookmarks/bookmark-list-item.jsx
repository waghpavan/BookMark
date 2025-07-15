"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useBookmarks } from "../../hooks/use-bookmarks"
import { ExternalLink, Trash2, Globe, Edit } from "lucide-react" // Import Edit icon

export default function BookmarkListItem({ bookmark, onEdit }) {
  // Add onEdit prop
  const { deleteBookmark } = useBookmarks()

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this bookmark?")) {
      await deleteBookmark(bookmark._id)
    }
  }

  const getDomainFromUrl = (url) => {
    try {
      return new URL(url).hostname.replace("www.", "")
    } catch {
      return url
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-slate-200/50 bg-white/80 backdrop-blur-sm">
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
              {/* Title and domain text colors */}
              <h3 className="font-semibold text-slate-900 truncate">{bookmark.title}</h3>
              <p className="text-sm text-slate-500 truncate">{getDomainFromUrl(bookmark.url)}</p>
            </div>
            <div className="flex items-center space-x-2">
              {bookmark.tags?.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-violet-100 text-violet-700 font-medium"
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
              className="hover:bg-violet-50 hover:border-violet-200 text-slate-700"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Visit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(bookmark)} // Call onEdit with the bookmark
              className="text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
