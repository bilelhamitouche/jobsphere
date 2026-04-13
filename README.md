# JobSphere

A modern job board platform built with Next.js 15, React, and Tailwind CSS. JobSphere connects job seekers with employers through a clean, intuitive interface with robust features for both sides of the hiring process.

## Features

### For Job Seekers

- Browse and search job listings with advanced filters
- Save favorite jobs for later reference
- Apply to jobs directly through the platform
- Manage job applications and track their status
- Upload and manage resumes
- View application analytics and insights

### For Employers/Recruiters

- Post and manage job listings
- Review and manage incoming applications
- Create and maintain company profiles
- View recruitment analytics and metrics
- Manage resume database (for recruiters)
- Account and team management

### Platform Features

- Modern, responsive UI with dark/light mode support
- Secure authentication system (email/password)
- File upload capabilities (resumes, company logos, etc.)
- Advanced search and filtering
- Paginated data tables
- Form validation with React Hook Form and Zod
- Server actions for data mutations
- Comprehensive error handling and loading states
- SEO-friendly with proper metadata

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom utilities
- **UI Components**: Shadcn UI
- **State Management**: Tanstack Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation
- **Authentication**: Better Auth
- **Database**: Drizzle ORM with PostgreSQL
- **File Uploads**: UploadThing
- **Icons**: Lucide React & Heroicons
- **Date Utilities**: date-fns
- **Theme**: Next Themes
- **Query Parameters**: Nuqs
- **Linting**: ESLint
- **Code Formatting**: Prettier (via Tailwind CSS)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended) or npm/yarn/bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/jobsphere.git
cd jobsphere
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn
# or
bun install
```

3. Set up environment variables:
   Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Then fill in the required values:

- Database connection URL
- Authentication secrets
- UploadThing configuration
- Other service API keys

4. Run database migrations:

```bash
pnpx drizzle-kit push
# or
npx drizzle-kit push
```

5. Start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality
- `pnpx drizzle-kit push` - Apply database schema changes
- `pnpx drizzle-kit studio` - Open Drizzle Studio to view database

## Project Structure

```
jobsphere/
├── app/                    # Next.js app router
│   ├── (auth)/             # Authentication routes (signin, signup)
│   ├── (main)/             # Main application layout
│   ├── (resources)/        # Static resources pages
│   ├── api/                # API routes
│   ├── company-info/       # Company information pages
│   ├── jobseeker/          # Job seeker dashboard
│   ├── recruiter/          # Recruiter dashboard
│   ├── settings/           # User settings pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── ...                 # Other pages
├── components/             # Reusable components
│   ├── ui/                 # UI component library
│   └── ...                 # Other components
├── lib/                    # Utility functions and helpers
├── actions/                # Server actions
├── public/                 # Static assets
├── styles/                 # Global styles
└── ...                     # Configuration files
```

## Key Components

### UI Library

The application uses a comprehensive UI component library built with Shadcn UI and Tailwind CSS, including:

- Buttons, inputs, forms, cards
- Navigation, sidebars, dropdowns
- Modals, tooltips, notifications
- Tables, pagination, badges
- Avatars, avatars with dropdowns
- Loading skeletons and empty states

### Authentication

- Separate authentication flows for job seekers and recruiters
- Secure password handling with bcrypt
- Session management with cookies
- Protected routes based on user roles

### Data Management

- Tanstack Query for server state management
- Automatic refetching and caching
- Pagination and sorting utilities

### File Handling

- UploadThing integration for file uploads
- Resume upload and processing
- Company logo uploads
- File type validation and size limits

## Deployment

### Vercel (Recommended)

The easiest way to deploy JobSphere is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Other Platforms

You can also deploy to any platform that supports Node.js applications:

- AWS Amplify
- Google Cloud Platform
- Azure App Service
- Docker (self-hosted)
- Traditional VPS

Make sure to set up your environment variables correctly for production.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jobsphere"

# Authentication
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# UploadThing
UPLOADTHING_TOKEN="your-uploadthing-token"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Other services (add as needed)
# NEXT_PUBLIC_SOME_API_KEY="your-key-here"
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to:

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep pull requests focused

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Radix UI](https://radix-ui.com) - Primitive UI components
- [Shadcn UI](https://ui.shadcn.com) - UI library
- [UploadThing](https://uploadthing.com) - File upload API
- [Sonner](https://sonner.emilkowal.ski) - Toast notifications
- [Tanstack Query](https://tanstack.com/query) - Server state management
- [Better Auth](https://better-auth.com) - Authentication framework
- [Drizzle ORM](https://orm.drizzle.team) - TypeScript ORM
- [Lucide](https://lucide.dev) & [Heroicons](https://heroicons.com) - Icon sets
