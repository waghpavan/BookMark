"use client"
import SidebarHeader from "./sidebar-header"
import SidebarNavigation from "./sidebar-navigation"
import SidebarStats from "./sidebar-stats"
import SidebarFolders from "./sidebar-folders"
import SidebarTags from "./sidebar-tags"

export default function Sidebar({ onAddFolder }) {
  return (
    <div className="h-full flex flex-col bg-white/95 backdrop-blur-sm">
      <SidebarHeader />
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <SidebarNavigation />
          <SidebarStats />
          <SidebarFolders onAddFolder={onAddFolder} />
          <SidebarTags />
        </div>
      </div>
    </div>
  )
}
