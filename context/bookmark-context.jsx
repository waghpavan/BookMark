"use client"

import { createContext, useContext, useState, useEffect } from "react"
import ApiService from "../services/api-service"

const BookmarkContext = createContext()

export function useBookmarks() {
  const context = useContext(BookmarkContext)
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider")
  }
  return context
}

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([])
  const [folders, setFolders] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [selectedTag, setSelectedTag] = useState(null)

  const fetchBookmarks = async (folderId = null, tag = null) => {
    setLoading(true)
    try {
      let url = "/bookmarks"
      if (folderId) {
        url = `/bookmarks/folder/${folderId}`
      } else if (tag) {
        url = `/bookmarks?tag=${tag}`
      }

      const data = await ApiService.get(url)
      setBookmarks(data)
    } catch (error) {
      console.error("Error fetching bookmarks:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFolders = async () => {
    try {
      const data = await ApiService.get("/folders")
      setFolders(data)
    } catch (error) {
      console.error("Error fetching folders:", error)
    }
  }

  const addBookmark = async (bookmarkData) => {
    try {
      const newBookmark = await ApiService.post("/bookmarks", bookmarkData)
      setBookmarks((prev) => [newBookmark, ...prev])
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const deleteBookmark = async (bookmarkId) => {
    try {
      await ApiService.delete(`/bookmarks/${bookmarkId}`)
      setBookmarks((prev) => prev.filter((bookmark) => bookmark._id !== bookmarkId))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const addFolder = async (name) => {
    try {
      const newFolder = await ApiService.post("/folders", { name })
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

  useEffect(() => {
    fetchBookmarks()
    fetchFolders()
  }, [])

  const value = {
    bookmarks,
    folders,
    loading,
    selectedFolder,
    selectedTag,
    fetchBookmarks,
    addBookmark,
    deleteBookmark,
    addFolder,
    filterByFolder,
    filterByTag,
    clearFilters,
  }

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>
}
