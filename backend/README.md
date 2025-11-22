# Anniversary Backend API

Backend server for the anniversary website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your database URL and secrets.

4. Run migrations:
```bash
npx prisma migrate dev --name init
```

5. Seed database:
```bash
npm run seed
```

6. Start server:
```bash
npm run dev
```

## Default PIN

The default PIN is `123456`. Change it in production by updating the seed script or directly in the database.

