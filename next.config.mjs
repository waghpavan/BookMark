const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: 'http://localhost:3000/api/:path*',
        destination: 'https://bookmarkhub-g5os.onrender.com/api/:path*', // Replace with your backend server's address
      },
    ];
  },
}