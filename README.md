# StartupForge — Startup Team Builder Platform

StartupForge is a full-stack web platform that connects startup founders with talented collaborators. Founders can publish startup ideas, post team opportunities, and manage applicants. Collaborators can browse startups, apply to roles, and track their application status. Admins oversee the entire platform.

---

## Live Demo

- **Client:** [startup-forge-main.vercel.app](https://startup-forge-main.vercel.app)
- **Server:** [startup-forge-main-server.vercel.app](https://startup-forge-main-server.vercel.app)

---

## Features

### Roles
| Role | Capabilities |
|------|-------------|
| **Founder** | Create startup profile, post opportunities (3 free / unlimited with Premium), review and accept or reject applications |
| **Collaborator** | Browse startups and opportunities, apply with portfolio and motivation, track application status |
| **Admin** | Manage users (block/unblock), approve or remove startups, view all transactions |

### Core Features
- **Authentication** — Email/password and Google OAuth via Better Auth
- **Role-based dashboards** — Separate views and routes per role
- **Startup profiles** — Logo upload via ImgBB, industry, funding stage, description
- **Opportunity system** — Role title, required skills, work type, commitment level, deadline
- **Application flow** — Portfolio link, motivation message, duplicate prevention, accept/reject
- **Stripe payments** — Premium plan for founders unlocks unlimited opportunity postings
- **Search and filter** — MongoDB `$regex` for search, `$in` for work type and industry filters
- **Pagination** — Server-side pagination on browse opportunities
- **Responsive design** — Mobile, tablet, and desktop friendly throughout

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 15 (App Router) | Framework |
| HeroUI | Component library |
| Tailwind CSS | Styling |
| Better Auth | Authentication client |
| Stripe.js | Payment client |
| Swiper | Carousel |
| Recharts | Charts and analytics |
| Sonner | Toast notifications |
| React Icons | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| MongoDB (Atlas) | Database |
| Better Auth | Authentication server |
| Stripe | Payment processing |
| ImgBB | Image hosting |

---

## Project Structure
```
startupforge/
├── startupforge-client/      # Next.js frontend
│   ├── src/
│   │   ├── app/              # App Router pages and layouts
│   │   ├── components/       # UI components by feature
│   │   ├── lib/              # Auth client, actions, utilities
│   │   ├── hooks/            # Custom React hooks
│   │   └── providers/        # App-level providers
│   └── public/               # Static assets
│
└── startupforge-server/      # Express backend
└── index.js              # All API routes
```
---

## Database Collections

| Collection | Description |
|------------|-------------|
| `user` | Registered users with role, plan, and block status |
| `startups` | Startup profiles with status (pending/approved) |
| `opportunities` | Job roles posted by founders |
| `applications` | Collaborator applications with status |
| `payments` | Stripe payment records |

---

## Environment Variables

### Client — `.env.local`
```env
NEXT_PUBLIC_SERVER=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Stripe account
- ImgBB account
- Google Cloud Console project (for OAuth)

### 1. Clone the repository

```bash
git clone https://github.com/ihriyad/startup-forge.git
cd startupforge
```


### 2. Set up the client

```bash
cd startup-forge-client
npm install
```

Create a `.env` file in the client root and add the environment variables listed above.

```bash
npm run dev
# Client runs on http://localhost:3000
```

### 4. Open in browser

Visit [http://localhost:3000](http://localhost:3000)

---

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Home — banner, featured startups, featured opportunities |
| `/startups` | Browse all approved startups |
| `/startups/[id]` | Startup detail with open opportunities |
| `/opportunities` | Browse opportunities with search and filter |
| `/opportunities/[id]` | Opportunity detail with apply modal |
| `/pricing` | Stripe premium plan for founders |
| `/login` | Email and Google login |
| `/register` | Register with role selection |
| `/dashboard/founder` | Founder dashboard |
| `/dashboard/collaborator` | Collaborator dashboard |
| `/dashboard/admin` | Admin dashboard |
| `/dashboard/profile` | Profile settings for all roles |
| `/payment/success` | Stripe payment confirmation |

---

## Payment Flow

1. Founder posts 3 opportunities (free tier limit)
2. On the 4th attempt, a premium gate is shown
3. Founder visits `/pricing` and clicks Upgrade
4. Redirected to Stripe hosted checkout page
5. On success, transaction is saved and `plan` is upgraded to `premium`
6. Founder can now post unlimited opportunities

---

## Test Credentials
Admin
Email:    admin@admin.com
Password: Admin1234


### Stripe Test Cards
| Scenario | Card Number |
|----------|-------------|
| Payment succeeds | `4242 4242 4242 4242` |
| Payment declined | `4000 0000 0000 9995` |

Use any future expiry date and any 3-digit CVC.

---

## Author

[Imdadul Haque Riyad](https://www.linkedin.com/in/ihriyad/)

---

## License

This project is for educational purposes as part of a development assessment.
