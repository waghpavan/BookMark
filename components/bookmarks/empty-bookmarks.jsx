"use client"
import { ExternalLink, Globe, Tag, Star } from "lucide-react"

export default function EmptyBookmarks() {
  return (
    <div className="text-center py-16">
      <div className="relative mb-6">
        {/* Icon background matching new primary */}
        <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto">
          <ExternalLink className="w-10 h-10 text-violet-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
          <Star className="w-4 h-4 text-white" />
        </div>
      </div>
      {/* Text colors for title and description */}
      <h3 className="text-xl font-semibold text-slate-900 mb-2">No bookmarks found</h3>
      <p className="text-slate-500 mb-6">Start building your digital library by adding your first bookmark!</p>
      {/* Helper text colors */}
      <div className="flex items-center justify-center space-x-4 text-sm text-slate-600">
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
