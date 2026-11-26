# PizzaHub Client

A modern pizza ordering platform built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. PizzaHub provides a responsive interface for customers, vendors, and administrators to manage the pizza ordering experience.

## Features

- Authentication with Better Auth
- Google OAuth sign-in
- Role-based dashboards (Customer, Vendor, Admin)
- Browse and filter approved menu items
- Customer order management
- Order tracking and cancellation
- Vendor menu management
- Admin menu approval and rejection
- Premium vendor subscription UI
- Responsive design
- Motion animations

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Motion
- Better Auth
- Stripe integration (vendor subscriptions)

## Installation

```bash
git clone https://github.com/jipunroy/pizzahub-project.git
cd pizzahub-project/pizzahub-client
npm install
```

## Environment Variables

Create a `.env.local` file in the client directory.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Use the appropriate deployed URLs when configuring production.

## Run Locally

```bash
npm run dev
```

The client will be available at:

http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

## Deployment

The frontend is deployed using Vercel.

- **Frontend:** https://pizzahub-project-wwg9.vercel.app
- **Backend API:** https://pizzahub-project.onrender.com

## Project Structure

```text
pizzahub-client/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── ...
├── public/
├── package.json
└── README.md
```

## Author

PizzaHub – Full Stack Pizza Ordering Platform
