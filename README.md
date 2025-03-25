# Next.js Blog with Hono and Better Auth

A modern blog application built with Next.js, Hono, and Better Auth, featuring server-side rendering, authentication, and a clean UI.

## Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or later)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- [Cloudflare account](https://dash.cloudflare.com/sign-up)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/raikusy/nextjs-hono-better-auth-d1
cd nextjs-hono-better-auth-d1
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Cloudflare D1 Database

First, create a new D1 database using Wrangler:

```bash
wrangler d1 create nextjs-hono-better-auth-d1
```

This command will output something like:

```
Created database 'nextjs-hono-better-auth-d1' (ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
```

### 4. Configure Environment Variables

1. Copy the example environment files:

```bash
cp .dev.vars.example .dev.vars
cp .env.example .env
```

2. Update `wrangler.jsonc` with your database information:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "nextjs-hono-better-auth-d1",
      "database_id": "YOUR_DATABASE_ID", // Replace with the ID from step 3
    },
  ],
}
```

3. Update the environment variables in `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8787
BETTER_AUTH_URL=http://localhost:8787
```

4. Update the environment variables in `.dev.vars`:

```env
BETTER_AUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 5. Run Database Migrations

```bash
bun run db:migrate
```

### 6. Start the Development Servers

1. Start the Next.js development server:

```bash
bun run dev
```

2. In a new terminal, start the Hono worker:

```bash
bun run worker:dev
```

The application should now be running at:

- Frontend: http://localhost:3000
- API: http://localhost:8787

## Available Scripts

- `bun run dev` - Start the Next.js development server
- `bun run worker:dev` - Start the Hono worker development server
- `bun run db:migrate` - Run database migrations
- `bun run db:migrate-remote` - Run database migrations on the remote database
- `bun run build` - Build the Next.js application
- `bun run start` - Start the production Next.js server
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/         # React components
├── config/            # Configuration files
├── lib/               # Utility functions and shared code
├── server/            # Hono server code
│   ├── routes/       # API routes
│   ├── validations/  # Zod validation schemas
│   └── hono-factory.ts
└── types/            # TypeScript type definitions
```

## Features

- Server-side rendering with Next.js
- API routes with Hono
- Authentication with Better Auth
- Database with Cloudflare D1
- Modern UI with Tailwind CSS and Shadcn UI
- Type-safe development with TypeScript
- Form validation with Zod
- State management with TanStack Query

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
