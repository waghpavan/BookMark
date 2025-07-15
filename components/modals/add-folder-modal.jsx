"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useBookmarks } from "../../hooks/use-bookmarks"
import { Folder, Plus, Sparkles } from "lucide-react"

export default function AddFolderModal({ open, onClose }) {
  const { addFolder } = useBookmarks()
  const [loading, setLoading] = useState(false)
  const [folderName, setFolderName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await addFolder(folderName)

    if (result.success) {
      setFolderName("")
      onClose()
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-slate-200/50">
        <DialogHeader className="space-y-3">
          <div className="flex items-center space-x-3">
            {/* Icon background matching new primary */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg">
              <Folder className="w-5 h-5 text-white" />
            </div>
            <div>
              {/* Title and description text colors */}
              <DialogTitle className="text-xl font-semibold text-slate-900">Create New Folder</DialogTitle>
              <DialogDescription className="text-slate-600">
                Organize your bookmarks with custom folders
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="space-y-2">
            {/* Label text color */}
            <Label htmlFor="folderName" className="text-sm font-medium text-slate-700 flex items-center">
              <Folder className="w-4 h-4 mr-2" />
              Folder Name *
            </Label>
            {/* Input text color */}
            <Input
              id="folderName"
              placeholder="e.g., JavaScript Resources, Design Inspiration"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="h-11 border-slate-200 focus:border-violet-500 focus:ring-violet-500/20 text-slate-900"
              required
            />
            {/* Helper text color */}
            <p className="text-xs text-slate-500 flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              Choose a descriptive name to easily find your bookmarks
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 bg-transparent text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !folderName.trim()}
              className="px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Folder
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
