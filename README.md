
# Auto Research AI
**Auto Research AI** is a full-stack application that allows users to input any research query and receive
high-quality, summarized answers using web search data and generative AI. The platform streamlines the
research process by combining SERP results with LLM-based summarization.
---
## Tech Stack
### Backend
- **Framework:** Express.js with TypeScript
- **Database:** PostgreSQL (hosted on [Neon](https://neon.tech/))
- **ORM:** Prisma
- **APIs used:**
 - [SerpAPI](https://serpapi.com/) for real-time search results
 - [Gemini API (Google Generative AI)](https://ai.google.dev/) for summarization
### Frontend
- **Framework:** React.js
- **Styling:** Tailwind CSS
- **Authentication:** [Clerk](https://clerk.dev/) for secure user login and session management
---
## Features
- User authentication using Clerk
- Search anything and fetch relevant data via SerpAPI
- Summarize search results using Google s Gemini model
- Store all queries and summaries in a PostgreSQL database
Auto Research AI - README
- View past queries with summaries in your dashboard
- Fast and modern UI built with React and Tailwind CSS
---

## Setup Instructions
### 1. Clone the repository
```bash
git clone https://github.com/your-username/auto-research-ai.git
cd auto-research-ai
```
### 2. Backend Setup
```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
Create a `.env` file in the `server/` directory with:
Auto Research AI - README
```
DATABASE_URL=your_neon_database_url
SERP_API_KEY=your_serp_api_key
GEMINI_API_KEY=your_gemini_api_key
```
### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
---
## Authentication
This project uses [Clerk.dev](https://clerk.dev) for authentication.
Set the following variables in the frontend `.env.local` file:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret_key
```
---
## LLM Integration
Search queries are processed through SerpAPI, and the results are summarized using the Gemini Pro API
for optimal clarity and conciseness.
Auto Research AI - README
---
## Deployment
- **Frontend:** Deployable to [Vercel](https://vercel.com)
- **Backend:** Deployable to [Render](https://render.com), [Railway](https://railway.app), or Cloudflare
Workers (if converted to Hono)
---
## Acknowledgements
- [SerpAPI](https://serpapi.com/)
- [Gemini by Google](https://ai.google.dev/)
- [Clerk.dev](https://clerk.dev/)
- [Neon](https://neon.tech/)
- [Prisma ORM](https://www.prisma.io/)
---
## License
This project is licensed under the MIT License.
Feel free to fork and contribute!