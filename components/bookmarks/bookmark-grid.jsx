"use client"
import BookmarkCard from "./bookmark-card"
import EmptyBookmarks from "./empty-bookmarks"

export default function BookmarkGrid({ bookmarks, onEdit }) {
  if (bookmarks.length === 0) {
    return <EmptyBookmarks />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark._id} bookmark={bookmark} onEdit={onEdit} />
      ))}
    </div>
  )
}
