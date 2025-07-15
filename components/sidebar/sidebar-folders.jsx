"use client"
import { Button } from "@/components/ui/button"
import { useBookmarks } from "../../hooks/use-bookmarks"
import { Folder, Plus } from "lucide-react"

export default function SidebarFolders({ onAddFolder }) {
  const { folders, selectedFolder, filterByFolder } = useBookmarks()

  return (
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
          className="h-8 w-8 p-0 hover:bg-violet-100 hover:text-violet-600 text-slate-700"
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
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md" // Active state
                : "hover:bg-slate-100 text-slate-700" // Inactive state
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
            <Button variant="ghost" size="sm" onClick={onAddFolder} className="mt-2 text-violet-600 hover:bg-violet-50">
              Create your first folder
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
