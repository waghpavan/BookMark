"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBookmarks } from "../context/bookmark-context"
import { Link, Tag, Folder, Sparkles } from "lucide-react"

export default function AddBookmarkModal({ open, onClose }) {
  const { addBookmark, folders } = useBookmarks()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    url: "",
    tags: "",
    folder: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const bookmarkData = {
      url: formData.url,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      ...(formData.folder && { folder: formData.folder }),
    }

    const result = await addBookmark(bookmarkData)

    if (result.success) {
      setFormData({ url: "", tags: "", folder: "" })
      onClose()
    }

    setLoading(false)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-slate-200/50">
        <DialogHeader className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Link className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-slate-900">Add New Bookmark</DialogTitle>
              <DialogDescription className="text-slate-600">
                Save and organize your favorite links with tags and folders
              </DialogDescription>
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
              className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              required
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
              className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
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
              <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500">
                <SelectValue placeholder="Choose a folder to organize" />
              </SelectTrigger>
              <SelectContent>
                {folders.map((folder) => (
                  <SelectItem key={folder._id} value={folder._id}>
                    <div className="flex items-center">
                      <Folder className="w-4 h-4 mr-2 text-slate-500" />
                      {folder.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose} className="px-6 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Adding...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Add Bookmark
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
