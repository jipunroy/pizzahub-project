# PizzaHub Server

PizzaHub Server is the backend API for the PizzaHub pizza ordering platform. It is built with Express.js, TypeScript, MongoDB, and Better Auth.

## Features

- Authentication and session management
- Google OAuth integration
- JWT-based authentication
- Role-based authorization
- Customer, Vendor, and Admin roles
- Menu management APIs
- Menu approval system
- Order management
- Order cancellation
- Vendor Premium subscription
- Stripe webhook integration
- Image upload integration
- Protected API routes
- Ownership validation
- MongoDB database integration

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Better Auth
- JWT (jose)
- Stripe
- ImgBB
- Zod

## Installation

```bash
git clone https://github.com/jipunroy/pizzahub-project.git
cd pizzahub-project/pizzahub-server
npm install
```

## Environment Variables

Create a `.env` file in the server directory.

```env
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000

BETTER_AUTH_SECRET=your_better_auth_secret

MONGODB_URI=your_mongodb_connection_string
DATABASE_NAME=pizzahub

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

IMGBB_API_KEY=your_imgbb_api_key
```

Configure the actual environment variables in your deployment platform. Never commit secrets.

## Run Locally

```bash
npm run dev
```

The API server will run at:

http://localhost:5000

## Health Check

```text
GET /api/health
```

## Build

```bash
npm run build
```

## Start Production Server

```bash
npm start
```

## Admin Utility

Promote a user to admin using the admin utility script:

```bash
npm run admin:promote
```

## Subscription Index Setup

```bash
npm run subscription:indexes
```

## Deployment

The backend is deployed using Render.

- **Backend API:** https://pizzahub-project.onrender.com
- **Frontend:** https://pizzahub-project-wwg9.vercel.app

## Project Structure

```text
pizzahub-server/
├── src/
│   ├── config/
│   ├── lib/
│   ├── middleware/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── scripts/
│   └── server.ts
├── package.json
└── README.md
```

## Author

PizzaHub – Full Stack Pizza Ordering Platform
