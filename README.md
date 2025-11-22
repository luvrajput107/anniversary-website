# Anniversary Website - For Ananya 💖

A private, romantic anniversary website built with React and Node.js. This is a single-user SPA that requires PIN authentication to access.

## Features

- 🔐 PIN-based authentication (4-6 digits)
- 📅 Interactive memory calendar
- 🎵 Song ratings and Spotify playlist integration
- 💌 Interactive shayari envelopes
- 📸 Photo albums and video gallery
- 🎥 Birthday video preview
- 📱 Secret page with shake detection
- 📊 Event tracking and analytics
- 💕 Romantic, pastel-themed UI

## Project Structure

```
WEB-ANANYA/
├── frontend/          # React SPA (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── contexts/
│   │   └── utils/
│   └── package.json
├── backend/           # Node.js + Express + PostgreSQL
│   ├── routes/
│   ├── middleware/
│   ├── prisma/
│   └── package.json
└── DEPLOYMENT_WINDOWS.md
```

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- React Scroll

### Backend
- Node.js (LTS)
- Express.js
- PostgreSQL
- Prisma ORM
- bcrypt
- jsonwebtoken

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (for local development)
- npm or pnpm

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your database URL and secrets:
```
DATABASE_URL="postgresql://user:password@localhost:5432/anniversary_db"
JWT_SECRET="your-secret-key"
SECRET_PAGE_CODE="babyji"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

5. Run database migrations:
```bash
npx prisma migrate dev --name init
```

6. Seed the database:
```bash
npm run seed
```

7. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

**Default PIN:** `123456` (change this after first login!)

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
echo "VITE_API_URL=http://localhost:5000" > .env
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Deployment

See `DEPLOYMENT_WINDOWS.md` for detailed Windows-specific deployment instructions for:
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

## Default Credentials

**PIN:** `123456` (change this immediately in production!)

**Secret Page Code:** `babyji` (set in backend `.env` as `SECRET_PAGE_CODE`)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with PIN
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Events & Tracking
- `POST /api/events` - Log an event
- `POST /api/visit` - Track page visit
- `POST /api/song-rating` - Submit song rating

### Secret Page
- `POST /api/secret/verify` - Verify secret code

## Sections

1. **Login Page** - PIN authentication
2. **Hero** - Anniversary introduction
3. **Memory Calendar** - Interactive date calendar
4. **Our Dates & Songs** - Special dates with associated songs
5. **Shayari Envelopes** - Interactive letter openings
6. **Spotify Playlist** - Embedded playlist
7. **Our Song** - Lyrics and rating system
8. **Birthday Video** - YouTube video preview
9. **Video Gallery** - Collection of videos
10. **Gallery Albums** - Photo albums
11. **Final CTA** - Heart button with animation
12. **Secret Page** - Hidden letter (accessed via shake or footer heart)

## Security Features

- PIN hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies
- Rate limiting on login endpoint
- CORS protection
- No PII stored (per requirement)

## Customization

All content is easily customizable:

- **Memory dates**: Edit `MemoryCalendar.jsx` → `memoryDates` object
- **Songs**: Edit `OurDates.jsx` → `dates` array
- **Shayari**: Edit `ShayariEnvelopes.jsx` → `envelopes` array
- **Video/Image URLs**: Replace placeholder URLs throughout
- **Secret letter**: Edit `SecretPage.jsx` → `letter` variable

## License

Private project - Made only for Ananya Singh 💖

---

Built with love by Luvsingh Rajput

