"use client"
import BookmarkListItem from "./bookmark-list-item"
import EmptyBookmarks from "./empty-bookmarks"

export default function BookmarkList({ bookmarks, onEdit }) {
  if (bookmarks.length === 0) {
    return <EmptyBookmarks />
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkListItem key={bookmark._id} bookmark={bookmark} onEdit={onEdit} />
      ))}
    </div>
  )
}
