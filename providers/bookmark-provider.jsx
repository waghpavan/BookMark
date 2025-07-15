"use client"
import { createContext, useState, useEffect } from "react"
import { bookmarkService } from "../services/bookmark-service"
import { folderService } from "../services/folder-service"
import { useAuth } from "../hooks/use-auth"

export const BookmarkContext = createContext()

export function BookmarkProvider({ children }) {
  const { user, loading: authLoading, logout } = useAuth()
  const [bookmarks, setBookmarks] = useState([])
  const [folders, setFolders] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [selectedTag, setSelectedTag] = useState(null)

  useEffect(() => {
    if (authLoading || !user) return

    if (user) {
      loadInitialData()
    } else {
      setBookmarks([])
      setFolders([])
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user])

  const loadInitialData = async () => {
    await Promise.all([fetchBookmarks(), fetchFolders()])
  }

  const fetchBookmarks = async (folderId = null, tag = null) => {
    if (!user) return
    setLoading(true)
    try {
      let data
      if (folderId) {
        data = await bookmarkService.getBookmarksByFolder(folderId)
      } else if (tag) {
        data = await bookmarkService.getBookmarksByTag(tag)
      } else {
        data = await bookmarkService.getAllBookmarks()
      }
      setBookmarks(data)
    } catch (error) {
      console.error("Error fetching bookmarks:", error)
      if (error.message?.toLowerCase().includes("authorization")) {
        logout()
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchFolders = async () => {
    if (!user) return
    try {
      const data = await folderService.getAllFolders()
      setFolders(data)
    } catch (error) {
      console.error("Error fetching folders:", error)
      if (error.message?.toLowerCase().includes("authorization")) {
        logout()
      }
    }
  }

  const addBookmark = async (bookmarkData) => {
    if (!user) return { success: false, error: "Not authenticated" }
    try {
      const newBookmark = await bookmarkService.createBookmark(bookmarkData)
      setBookmarks((prev) => [newBookmark, ...prev])
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const updateBookmark = async (bookmarkId, bookmarkData) => {
    if (!user) return { success: false, error: "Not authenticated" }
    try {
      const updatedBookmark = await bookmarkService.updateBookmark(bookmarkId, bookmarkData)
      setBookmarks((prev) => prev.map((b) => (b._id === bookmarkId ? updatedBookmark : b)))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const deleteBookmark = async (bookmarkId) => {
    if (!user) return { success: false, error: "Not authenticated" }
    try {
      await bookmarkService.deleteBookmark(bookmarkId)
      setBookmarks((prev) => prev.filter((bookmark) => bookmark._id !== bookmarkId))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const addFolder = async (name) => {
    if (!user) return { success: false, error: "Not authenticated" }
    try {
      const newFolder = await folderService.createFolder(name)
      setFolders((prev) => [...prev, newFolder])
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const filterByFolder = (folderId) => {
    setSelectedFolder(folderId)
    setSelectedTag(null)
    fetchBookmarks(folderId)
  }

  const filterByTag = (tag) => {
    setSelectedTag(tag)
    setSelectedFolder(null)
    fetchBookmarks(null, tag)
  }

  const clearFilters = () => {
    setSelectedFolder(null)
    setSelectedTag(null)
    fetchBookmarks()
  }

  const value = {
    bookmarks,
    folders,
    loading,
    selectedFolder,
    selectedTag,
    fetchBookmarks,
    fetchFolders,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    addFolder,
    filterByFolder,
    filterByTag,
    clearFilters,
    refreshData: loadInitialData,
  }

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>
}
