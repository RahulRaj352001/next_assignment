# Trip Planner Frontend

A modern Next.js frontend application for planning and managing trips.

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons
- **Framer Motion** for animations

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── layout.tsx          # Root layout with navigation
├── page.tsx           # Home page
├── submit/page.tsx    # Create new trip
├── dashboard/page.tsx # View all trips
└── edit/[id]/page.tsx # Edit existing trip

components/
├── Navbar.tsx         # Navigation component
└── ui/               # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    └── input.tsx

lib/
├── api.ts            # API client functions
└── utils.ts          # Utility functions
```

## Features

- ✅ Create new trips with title, destination, duration, and budget
- ✅ View all trips in a dashboard with search functionality
- ✅ Edit existing trips
- ✅ Responsive design with modern UI
- ✅ Type-safe API integration

## API Integration

The frontend connects to the Trip Planner API backend running on `http://localhost:5000`. Make sure the backend is running before using the frontend.

## Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```
