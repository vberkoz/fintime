 
# FinTime App

A comprehensive financial time tracking application built with modern web technologies.

## Overview

FinTime is a web application designed to help users track and manage their time spent on activities. It provides a clean, intuitive interface for recording daily activities, viewing monthly summaries, and categorizing tasks.

## Features

- **Daily Activity Tracking**: Log and manage your activities with start and end times
- **Duration Calculation**: Automatic calculation of time spent on each activity
- **Monthly Overview**: View and analyze your activities on a monthly basis
- **Category Management**: Organize activities by categories
- **User Profiles**: Personalized user experience
- **Responsive Design**: Works on desktop and mobile devices

## Technologies

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: TanStack Router (React Router v7)
- **State Management**: TanStack Query (React Query)
- **Form Handling**: TanStack Form with Zod validation
- **UI Components**: 
  - Radix UI primitives
  - Custom UI components
  - Tailwind CSS for styling
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Code Quality**: ESLint with TypeScript support

## Project Structure

```
fintime-app/
├── public/          # Static assets
├── src/             # Source code
│   ├── components/  # Reusable UI components
│   │   └── ui/      # Base UI components (cards, inputs, tooltips)
│   ├── lib/         # Utility functions
│   ├── modules/     # Feature modules
│   │   └── activities/ # Activity management module
│   │       ├── hooks/     # React hooks for activities
│   │       ├── services/  # API services
│   │       └── types/     # TypeScript types
│   ├── routes/      # Application routes
│   ├── App.tsx      # Main App component
│   └── main.tsx     # Entry point
├── index.html       # HTML template
└── vite.config.ts   # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/vberkoz/fintime-app.git
cd fintime-app
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173/`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## API Integration

The application is designed to connect to a backend API. The base URL can be configured using the `VITE_API_BASE_URL` environment variable.

## Architecture

FinTime follows a modular architecture:

- **Components**: Reusable UI elements
- **Modules**: Feature-specific code organized by domain
- **Routes**: Page definitions using TanStack Router
- **Services**: API communication layer
- **Hooks**: Custom React hooks for state management and business logic

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[License information]

## Acknowledgments

- Built with [React](https://react.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Routing powered by [TanStack Router](https://tanstack.com/router)