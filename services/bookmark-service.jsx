import { apiClient } from "./api-client"

class BookmarkService {
  async getAllBookmarks() {
    return await apiClient.get("/bookmarks")
  }

  async getBookmarksByFolder(folderId) {
    return await apiClient.get(`/bookmarks/folder/${folderId}`)
  }

  async getBookmarksByTag(tag) {
    return await apiClient.get(`/bookmarks?tag=${encodeURIComponent(tag)}`)
  }

  async createBookmark(bookmarkData) {
    return await apiClient.post("/bookmarks", bookmarkData)
  }

  async deleteBookmark(bookmarkId) {
    return await apiClient.delete(`/bookmarks/${bookmarkId}`)
  }

  async updateBookmark(bookmarkId, bookmarkData) {
    return await apiClient.patch(`/bookmarks/${bookmarkId}`, bookmarkData)
  }

  // New method to fetch bookmarks without a folder
  async getUnfolderedBookmarks() {
    return await apiClient.get("/bookmarks/folderless/all")
  }
}

export const bookmarkService = new BookmarkService()
