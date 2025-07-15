"use client"

export default function LoadingSpinner({ fullScreen = false, message = "Loading..." }) {
  const containerClass = fullScreen
    ? "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-neutral-50 to-neutral-50" // Adjusted background gradient
    : "flex items-center justify-center p-8"

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-violet-200 rounded-full animate-spin"></div>{" "}
          {/* Adjusted spinner color */}
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-violet-600 rounded-full animate-spin border-t-transparent"></div>{" "}
          {/* Adjusted spinner color */}
        </div>
        <p className="text-slate-600 font-medium">{message}</p> {/* Text color */}
      </div>
    </div>
  )
}
