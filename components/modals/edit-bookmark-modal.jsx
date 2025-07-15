"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert" // Import Alert components
import { useBookmarks } from "../../hooks/use-bookmarks"
import { Link, Tag, Folder, Sparkles, Edit, Heading, AlignLeft, Plus } from "lucide-react" // Import Plus icon
import AddFolderModal from "./add-folder-modal" // Import AddFolderModal

export default function EditBookmarkModal({ open, onClose, bookmark }) {
  const { updateBookmark, bookmarks, folders, fetchFolders } = useBookmarks() // Get bookmarks and fetchFolders
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    summary: "",
    tags: "",
    folder: "",
  })
  const [showAddFolderLocal, setShowAddFolderLocal] = useState(false) // New state for local folder modal
  const [duplicateError, setDuplicateError] = useState("") // New state for duplicate error

  useEffect(() => {
    if (bookmark) {
      setFormData({
        url: bookmark.url || "",
        title: bookmark.title || "",
        summary: bookmark.summary || "",
        tags: (bookmark.tags || []).join(", "),
        folder: bookmark.folder || "",
      })
    }
    // Clear errors when modal opens
    if (open) {
      setDuplicateError("")
    }
  }, [bookmark, open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setDuplicateError("") // Clear previous errors

    // Normalize URL for comparison (remove trailing slashes, http/https)
    const normalizeUrl = (url) => {
      try {
        const u = new URL(url)
        return u.hostname + u.pathname.replace(/\/+$/, "") + u.search + u.hash
      } catch {
        return url.replace(/\/+$/, "") // Fallback for invalid URLs
      }
    }

    const newUrlNormalized = normalizeUrl(formData.url)

    // Check for duplicate URL, excluding the current bookmark being edited
    const existingBookmark = bookmarks.find((b) => normalizeUrl(b.url) === newUrlNormalized && b._id !== bookmark._id)

    if (existingBookmark) {
      let errorMessage = "A bookmark with this URL already exists."
      if (existingBookmark.folder) {
        const existingFolder = folders.find((f) => f._id === existingBookmark.folder)
        if (existingFolder) {
          errorMessage += ` It is already in the '${existingFolder.name}' folder.`
        } else {
          errorMessage += ` It is already in a folder.`
        }
      }
      setDuplicateError(errorMessage)
      setLoading(false)
      return // Prevent submission
    }

    const updatedData = {
      url: formData.url,
      title: formData.title,
      summary: formData.summary,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      ...(formData.folder && formData.folder !== "new-folder" && { folder: formData.folder }),
    }

    const result = await updateBookmark(bookmark._id, updatedData)

    if (result.success) {
      onClose()
    } else {
      // Handle API errors if any
      setDuplicateError(result.error || "Failed to update bookmark.")
    }

    setLoading(false)
  }

  const handleChange = (field, value) => {
    if (field === "folder" && value === "new-folder") {
      setShowAddFolderLocal(true)
      setFormData((prev) => ({ ...prev, folder: "" })) // Clear folder selection when "new-folder" is chosen
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleAddFolderModalClose = () => {
    setShowAddFolderLocal(false)
    fetchFolders() // Refresh folders after closing the add folder modal
  }

  if (!bookmark) return null // Don't render if no bookmark is provided

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-slate-200/50">
        <DialogHeader className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-lg">
              <Edit className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-slate-900">Edit Bookmark</DialogTitle>
              <DialogDescription className="text-slate-600">Update the details of your bookmark</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium text-slate-700 flex items-center">
              <Link className="w-4 h-4 mr-2" />
              URL *
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={(e) => handleChange("url", e.target.value)}
              className="h-11 border-slate-200 focus:border-violet-500 focus:ring-violet-500/20 text-slate-900"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-slate-700 flex items-center">
              <Heading className="w-4 h-4 mr-2" />
              Title
            </Label>
            <Input
              id="title"
              placeholder="Bookmark Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="h-11 border-slate-200 focus:border-violet-500 focus:ring-violet-500/20 text-slate-900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary" className="text-sm font-medium text-slate-700 flex items-center">
              <AlignLeft className="w-4 h-4 mr-2" />
              Summary
            </Label>
            <Textarea
              id="summary"
              placeholder="A brief description of the bookmark"
              value={formData.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              className="min-h-[80px] border-slate-200 focus:border-violet-500 focus:ring-violet-500/20 text-slate-900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium text-slate-700 flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              Tags
            </Label>
            <Input
              id="tags"
              placeholder="react, javascript, tutorial"
              value={formData.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              className="h-11 border-slate-200 focus:border-violet-500 focus:ring-violet-500/20 text-slate-900"
            />
            <p className="text-xs text-slate-500 flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              Separate multiple tags with commas for better organization
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="folder" className="text-sm font-medium text-slate-700 flex items-center">
              <Folder className="w-4 h-4 mr-2" />
              Folder (Optional)
            </Label>
            <Select value={formData.folder} onValueChange={(value) => handleChange("folder", value)}>
              <SelectTrigger className="h-11 border-slate-200 focus:border-violet-500 text-slate-900">
                <SelectValue placeholder="Choose a folder to organize" />
              </SelectTrigger>
              <SelectContent>
                {/* Option to create a new folder */}
                <SelectItem value="new-folder">
                  <div className="flex items-center text-violet-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Folder
                  </div>
                </SelectItem>
                {/* Existing folders */}
                {folders.map((folder) => (
                  <SelectItem key={folder._id} value={folder._id}>
                    <div className="flex items-center text-slate-900">
                      <Folder className="w-4 h-4 mr-2 text-slate-500" />
                      {folder.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {duplicateError && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">{duplicateError}</AlertDescription>
            </Alert>
          )}

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
              disabled={loading}
              className="px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>

      {/* Render AddFolderModal locally */}
      <AddFolderModal open={showAddFolderLocal} onClose={handleAddFolderModalClose} />
    </Dialog>
  )
}
