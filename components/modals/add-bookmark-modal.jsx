"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { useBookmarks } from "../../hooks/use-bookmarks"
import { Link, Tag, Folder, Sparkles, Plus, Bookmark, Globe } from "lucide-react"
import AddFolderModal from "./add-folder-modal"
import { bookmarkService } from "../../services/bookmark-service"

export default function AddBookmarkModal({ open, onClose, selectedFolderId }) {
  /* -------------------------------------------------- */
  /* state & context                                     */
  /* -------------------------------------------------- */
  const { addBookmark, bookmarks, folders, fetchFolders, updateBookmark, fetchBookmarks } = useBookmarks() // Added fetchBookmarks

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("new-bookmark")
  const [showAddFolderLocal, setShowAddFolderLocal] = useState(false)

  const [formData, setFormData] = useState({
    url: "",
    tags: "",
    folder: "",
  })

  /* “Add existing” tab */
  const [selectedIds, setSelectedIds] = useState([])
  const [unfoldered, setUnfoldered] = useState([])
  const [fetchingUnfoldered, setFetchingUnfoldered] = useState(false)

  /* -------------------------------------------------- */
  /* helpers                                            */
  /* -------------------------------------------------- */
  const normalizeUrl = (url) => {
    try {
      const u = new URL(url)
      return u.hostname + u.pathname.replace(/\/+$/, "") + u.search + u.hash
    } catch {
      return url.replace(/\/+$/, "")
    }
  }

  const getDomain = (url) => {
    try {
      return new URL(url).hostname.replace("www.", "")
    } catch {
      return url
    }
  }

  /* -------------------------------------------------- */
  /* effects                                            */
  /* -------------------------------------------------- */
  /* reset on open */
  useEffect(() => {
    if (!open) return
    setError("")
    setSelectedIds([])
    setFormData((prev) => ({
      ...prev,
      folder: selectedFolderId || "",
    }))
    setActiveTab("new-bookmark")
  }, [open, selectedFolderId])

  /* fetch un-foldered bookmarks when needed */
  useEffect(() => {
    if (!(open && activeTab === "add-existing")) return
    const load = async () => {
      setFetchingUnfoldered(true)
      try {
        const data = await bookmarkService.getUnfolderedBookmarks()
        setUnfoldered(data)
      } catch (e) {
        console.error(e)
        setError("Failed to load un-foldered bookmarks.")
      } finally {
        setFetchingUnfoldered(false)
      }
    }
    load()
  }, [open, activeTab])

  /* -------------------------------------------------- */
  /* handlers                                           */
  /* -------------------------------------------------- */
  const handleChange = (field, value) => {
    if (field === "folder" && value === "new-folder") {
      setShowAddFolderLocal(true)
      setFormData((p) => ({ ...p, folder: "" }))
    } else {
      setFormData((p) => ({ ...p, [field]: value }))
    }
  }

  const submitNew = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    /* duplication guard */
    const exists = bookmarks.find((b) => normalizeUrl(b.url) === normalizeUrl(formData.url))
    if (exists) {
      setError("A bookmark with this URL already exists.")
      setLoading(false)
      return
    }

    const body = {
      url: formData.url,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      ...(formData.folder && { folder: formData.folder }),
    }

    const res = await addBookmark(body)
    if (res.success) {
      setFormData({ url: "", tags: "", folder: "" })
      onClose()
    } else {
      setError(res.error || "Failed to add bookmark.")
    }
    setLoading(false)
  }

  const submitExisting = async (e) => {
    e.preventDefault()
    if (!selectedFolderId) {
      setError("Open a folder first.")
      return
    }
    if (selectedIds.length === 0) {
      setError("Select at least one bookmark.")
      return
    }
    setLoading(true)
    for (const id of selectedIds) {
      // eslint-disable-next-line no-await-in-loop
      const res = await updateBookmark(id, { folder: selectedFolderId })
      if (!res.success) {
        setError(res.error || "Update failed.")
        setLoading(false)
        return
      }
    }
    // Refresh bookmarks for the current folder after successful updates
    await fetchBookmarks(selectedFolderId)
    onClose()
    setLoading(false)
  }

  const toggleId = (id, checked) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))
  }

  const closeFolderModal = () => {
    setShowAddFolderLocal(false)
    fetchFolders()
  }

  /* -------------------------------------------------- */
  /* render                                             */
  /* -------------------------------------------------- */
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl bg-white/95 backdrop-blur-sm border-slate-200/50 overflow-x-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-lg">
              <Link className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-slate-900">Add Bookmark</DialogTitle>
              <DialogDescription className="text-slate-600">
                Save new links or organize existing ones into folders
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* -------------------- Tabs -------------------- */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100 rounded-lg">
            <TabsTrigger
              value="new-bookmark"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              New Bookmark
            </TabsTrigger>
            <TabsTrigger
              value="add-existing"
              disabled={!selectedFolderId}
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              Add Existing to Folder
            </TabsTrigger>
          </TabsList>

          {/* -------- New Bookmark -------- */}
          <TabsContent value="new-bookmark" className="mt-6">
            <form onSubmit={submitNew} className="space-y-5">
              {/* URL ------------------------------------------------ */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 flex items-center">
                  <Link className="w-4 h-4 mr-2" />
                  URL *
                </Label>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) => handleChange("url", e.target.value)}
                  className="h-11 border-slate-200 focus:border-violet-500 focus:ring-violet-500/20"
                  required
                />
              </div>
              {/* Tags ------------------------------------------------ */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Tags
                </Label>
                <Input
                  placeholder="react, javascript"
                  value={formData.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  className="h-11 border-slate-200 focus:border-violet-500 focus:ring-violet-500/20"
                />
                <p className="text-xs text-slate-500 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Separate tags with commas.
                </p>
              </div>
              {/* Folder --------------------------------------------- */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 flex items-center">
                  <Folder className="w-4 h-4 mr-2" />
                  Folder (optional)
                </Label>
                <Select value={formData.folder} onValueChange={(v) => handleChange("folder", v)}>
                  <SelectTrigger className="h-11 border-slate-200 focus:border-violet-500">
                    <SelectValue placeholder="Choose folder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-folder">
                      <Plus className="w-4 h-4 mr-2 text-violet-600" />
                      New Folder
                    </SelectItem>
                    {folders.map((f) => (
                      <SelectItem key={f._id} value={f._id}>
                        <Folder className="w-4 h-4 mr-2 text-slate-500" />
                        {f.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end space-x-2 pt-6 border-t border-slate-200">
                <Button type="button" variant="outline" onClick={onClose} className="bg-transparent">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                >
                  {loading ? "Adding..." : "Add Bookmark"}
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* -------- Add Existing -------- */}
          <TabsContent value="add-existing" className="mt-6">
            <form onSubmit={submitExisting} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 flex items-center">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Select Bookmarks *
                </Label>
                {fetchingUnfoldered ? (
                  <div className="h-40 flex items-center justify-center border border-slate-200 rounded-md">
                    Loading...
                  </div>
                ) : unfoldered.length === 0 ? (
                  <div className="h-40 flex items-center justify-center border border-dashed border-slate-300 rounded-md">
                    No un-foldered bookmarks.
                  </div>
                ) : (
                  <div className="max-h-60 max-w-md overflow-y-auto border border-slate-200 rounded-md p-2 space-y-2">
                    {unfoldered.map((b) => (
                      <Card
                        key={b._id}
                        className="p-3 flex items-center space-x-3 bg-white border border-slate-200 rounded-xl shadow-sm"
                      >
                        <Checkbox
                          checked={selectedIds.includes(b._id)}
                          onCheckedChange={(c) => toggleId(b._id, c)}
                          className="data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                        />
                        <div className="flex-shrink-0">
                          {b.favicon ? (
                            <img
                              src={b.favicon || "/placeholder.svg"}
                              alt=""
                              className="w-5 h-5 rounded"
                              onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                          ) : (
                            <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center">
                              <Globe className="w-3 h-3 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-900 truncate">{b.title || b.url}</div>
                          <div className="text-xs text-slate-500 truncate">{getDomain(b.url)}</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end space-x-2 pt-6 border-t border-slate-200">
                <Button type="button" variant="outline" onClick={onClose} className="bg-transparent">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || selectedIds.length === 0}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                >
                  {loading ? "Adding..." : "Add to Folder"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>

      {/* nested folder modal */}
      <AddFolderModal open={showAddFolderLocal} onClose={closeFolderModal} />
    </Dialog>
  )
}
