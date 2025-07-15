import { apiClient } from "./api-client"

class FolderService {
  async getAllFolders() {
    return await apiClient.get("/folders")
  }

  async createFolder(name) {
    return await apiClient.post("/folders", { name })
  }

  async deleteFolder(folderId) {
    return await apiClient.delete(`/folders/${folderId}`)
  }

  async updateFolder(folderId, name) {
    return await apiClient.put(`/folders/${folderId}`, { name })
  }
}

export const folderService = new FolderService()
