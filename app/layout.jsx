import "./globals.css" // This MUST be the very first line

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Ensure default text color for the entire app is dark on light background */}
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
