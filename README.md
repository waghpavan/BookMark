# BookmarkHub Frontend

A modern React application for managing bookmarks with a beautiful, polished UI.

## Features

- 🔐 **Authentication** - Login/Register with JWT
- 📌 **Bookmark Management** - Save, organize, and delete bookmarks
- 📁 **Folder System** - Organize bookmarks into custom folders
- 🏷️ **Tag System** - Tag-based filtering and organization
- 🔍 **Search** - Search across titles, URLs, and tags
- 📱 **Responsive Design** - Works on all devices
- ✨ **Modern UI** - Beautiful gradients, animations, and glass morphism

## Tech Stack

- **React 18** with JSX
- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Lucide React** icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see backend documentation)

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd bookmark-hub-frontend
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Create environment file
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update environment variables in `.env.local`:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

5. Start the development server
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── bookmarks/        # Bookmark-related components
│   ├── dashboard/        # Dashboard components
│   ├── layout/           # Layout components
│   ├── modals/           # Modal components
│   ├── sidebar/          # Sidebar components
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── pages/                # Page components
├── providers/            # Context providers
├── services/             # API services
└── styles/               # Global styles
\`\`\`

## API Integration

The app integrates with your backend API endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/bookmarks` - Get all bookmarks
- `POST /api/bookmarks` - Create bookmark
- `DELETE /api/bookmarks/:id` - Delete bookmark
- `GET /api/bookmarks/folder/:id` - Get bookmarks by folder
- `GET /api/bookmarks?tag=:tag` - Get bookmarks by tag
- `GET /api/folders` - Get all folders
- `POST /api/folders` - Create folder

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (required)
- `NODE_ENV` - Environment (development/production)
- `PORT` - Port for development server (optional)

## Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License
\`\`\`

Now you have a complete, properly structured React application with:

## ✅ **Complete Backend Integration**
- All API endpoints covered (auth, bookmarks, folders, tags)
- Proper JWT token management
- Error handling and loading states

## 🏗️ **Component-Based Architecture**
- Separated concerns with providers, services, hooks
- Reusable UI components
- Clean folder structure
- Proper separation of pages and components

## 🎨 **Modern, Polished Design**
- Beautiful gradients and animations
- Glass morphism effects
- Responsive design
- Professional UI/UX

## 📦 **Ready to Run**
- Complete package.json with all dependencies
- Environment configuration
- Tailwind CSS setup
- Development and production scripts

## 🚀 **To Run the Project:**

1. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

2. **Set up environment:**
\`\`\`bash
# Create .env.local file with:
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

3. **Start development server:**
\`\`\`bash
npm run dev
\`\`\`

The app will be available at `http://localhost:3000` and will connect to your backend API for full functionality!
