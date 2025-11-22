# Deployment Guide for Windows

This guide will walk you through deploying the anniversary website on Windows. The frontend will be deployed on Vercel, and the backend will be deployed on Render.

## Prerequisites

### 1. Install Node.js

1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version for Windows
3. Run the installer (.msi file)
4. Follow the installation wizard:
   - Accept the license agreement
   - Choose installation location (default is fine)
   - **Important:** Check "Automatically install the necessary tools" if prompted
   - Complete the installation
5. Verify installation by opening **PowerShell** or **Command Prompt** and running:
   ```powershell
   node --version
   npm --version
   ```
   You should see version numbers for both.

### 2. Install Git

1. Visit [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download the Git for Windows installer
3. Run the installer:
   - Use default options (they're fine for most users)
   - Choose your preferred editor (VS Code recommended)
   - Select "Git from the command line and also from 3rd-party software"
   - Complete the installation
4. Verify installation:
   ```powershell
   git --version
   ```

### 3. PostgreSQL Tools (Optional but Recommended)

You have two options:

**Option A: PostgreSQL Command Line Tools**
1. Download PostgreSQL from [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Install PostgreSQL (you can skip the database setup, we only need the tools)
3. Or install just `psql` separately

**Option B: pgAdmin (GUI Tool)**
1. Download pgAdmin from [https://www.pgadmin.org/download/pgadmin-4-windows/](https://www.pgadmin.org/download/pgadmin-4-windows/)
2. Install pgAdmin - this provides a visual interface to manage PostgreSQL databases

**Note:** If deploying on Render, you won't need local PostgreSQL - Render provides managed PostgreSQL. But having tools locally helps with testing.

### 4. Create Accounts

- **GitHub**: [https://github.com/](https://github.com/) (or GitLab/Bitbucket)
- **Vercel**: [https://vercel.com/](https://vercel.com/)
- **Render**: [https://render.com/](https://render.com/)

---

## Part 1: Backend Deployment on Render

### Step 1: Prepare Backend Code

1. Open PowerShell or Command Prompt in your project folder:
   ```powershell
   cd C:\Users\LENOVO\OneDrive\Desktop\WEB-ANANYA\backend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```powershell
   copy .env.example .env
   ```

4. Edit `.env` and update with placeholder values (we'll set real values on Render):
   ```
   DATABASE_URL="postgresql://placeholder:placeholder@placeholder:5432/placeholder"
   JWT_SECRET="generate-a-random-string-here"
   SECRET_PAGE_CODE="babyji"
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL="https://your-frontend-url.vercel.app"
   ```

5. Test locally (optional, requires local PostgreSQL):
   ```powershell
   npx prisma migrate dev --name init
   npm run seed
   npm run dev
   ```

### Step 2: Create PostgreSQL Database on Render

1. Log in to [Render](https://render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure database:
   - **Name**: `anniversary-db` (or any name you prefer)
   - **Database**: `anniversary_db`
   - **User**: Will be auto-generated
   - **Region**: Choose closest to your users
   - **PostgreSQL Version**: Latest stable
   - **Plan**: Free tier is fine for personal use
4. Click **"Create Database"**
5. **Important:** Wait for the database to be created (takes ~2 minutes)
6. Once created, click on the database name
7. Copy the **Internal Database URL** (you'll use this in the next step)

### Step 3: Deploy Backend Service on Render

1. Push your code to GitHub (or GitLab/Bitbucket):
   ```powershell
   cd C:\Users\LENOVO\OneDrive\Desktop\WEB-ANANYA
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/anniversary-website.git
   git push -u origin main
   ```

   **Note:** If this is your first time using Git, you may need to configure:
   ```powershell
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

2. On Render, click **"New +"** → **"Web Service"**
3. Connect your repository:
   - Select your GitHub/GitLab/Bitbucket account
   - Choose the repository containing your code
   - Click **"Connect"**
4. Configure the service:
   - **Name**: `anniversary-backend` (or any name)
   - **Environment**: `Node`
   - **Build Command**: 
     ```bash
     cd backend && npm install && npx prisma generate
     ```
   - **Start Command**:
     ```bash
     cd backend && npx prisma migrate deploy && npm start
     ```
   - **Root Directory**: Leave empty (or set to `backend` if your repo structure needs it)
   - **Plan**: Free tier is fine

5. Click **"Advanced"** → **"Add Environment Variable"** and add:
   - `DATABASE_URL`: Paste the Internal Database URL from Step 2
   - `JWT_SECRET`: Generate a random string (use PowerShell):
     ```powershell
     -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
     ```
   - `SECRET_PAGE_CODE`: `babyji` (or your chosen secret code)
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://your-frontend-url.vercel.app` (update after frontend deployment)

6. Click **"Create Web Service"**
7. Render will start building and deploying (takes ~5-10 minutes)
8. Once deployed, copy the **Service URL** (e.g., `https://anniversary-backend.onrender.com`)

### Step 4: Run Database Migrations

After the backend is deployed, you need to run migrations. You can do this via Render's shell:

1. On Render, go to your web service
2. Click **"Shell"** tab (or use **"Manual Deploy"** → **"Run Command"**)
3. Run:
   ```bash
   cd backend
   npx prisma migrate deploy
   npm run seed
   ```

Or, you can SSH into the service and run these commands.

### Step 5: Update Backend Environment Variable

After running migrations and seed, you should have a user created. Update your backend `.env` on Render if needed, or verify the default PIN works.

**Default PIN:** `123456` (from seed script - **change this in production!**)

---

## Part 2: Frontend Deployment on Vercel

### Step 1: Prepare Frontend Code

1. Open PowerShell in the frontend folder:
   ```powershell
   cd C:\Users\LENOVO\OneDrive\Desktop\WEB-ANANYA\frontend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Create a `.env` file:
   ```powershell
   New-Item .env -ItemType File
   ```

4. Edit `.env` and add:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   Replace `your-backend-url.onrender.com` with your actual Render backend URL from Part 1, Step 3.

5. Test locally (optional):
   ```powershell
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Step 2: Deploy to Vercel

1. Push your code to GitHub (if not already done):
   ```powershell
   cd C:\Users\LENOVO\OneDrive\Desktop\WEB-ANANYA
   git add .
   git commit -m "Add frontend"
   git push
   ```

2. Log in to [Vercel](https://vercel.com/)
3. Click **"New Project"**
4. Import your repository:
   - Connect your GitHub account if not already connected
   - Select the repository
   - Click **"Import"**
5. Configure project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend` (important!)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com` (your Render backend URL)
7. Click **"Deploy"**
8. Wait for deployment to complete (~2-5 minutes)
9. Once deployed, Vercel will give you a URL like `https://anniversary-website.vercel.app`

### Step 3: Update Backend CORS Settings

1. Go back to Render dashboard
2. Edit your backend service environment variables
3. Update `FRONTEND_URL` to your Vercel URL (e.g., `https://anniversary-website.vercel.app`)
4. Render will automatically redeploy with the new setting

### Step 4: Test the Deployment

1. Visit your Vercel frontend URL
2. Try logging in with the default PIN: `123456`
3. Test various features:
   - Login/logout
   - Calendar date clicks
   - Song ratings
   - Secret page access

---

## Part 3: Changing Default PIN (Important!)

### Option 1: Change via Database (Recommended)

1. Connect to your Render PostgreSQL database (using pgAdmin or psql)
2. Hash a new PIN using bcrypt (you can use Node.js):
   ```powershell
   node -e "const bcrypt = require('bcrypt'); bcrypt.hash('YOUR_NEW_PIN', 10).then(hash => console.log(hash));"
   ```
3. Update the `users` table:
   ```sql
   UPDATE users SET pin_hash = 'YOUR_HASHED_PIN' WHERE username = 'ananya';
   ```

### Option 2: Create a Migration Script

Create a migration script in the backend to update the PIN:

```javascript
// backend/scripts/change-pin.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function changePIN() {
  const newPIN = process.argv[2]; // Get PIN from command line
  if (!newPIN || !/^\d{4,6}$/.test(newPIN)) {
    console.error('Please provide a valid 4-6 digit PIN');
    process.exit(1);
  }

  const hash = await bcrypt.hash(newPIN, 10);
  await prisma.user.update({
    where: { username: 'ananya' },
    data: { pinHash: hash }
  });

  console.log('PIN updated successfully!');
  await prisma.$disconnect();
}

changePIN();
```

Run via Render shell or locally if you have DB access.

---

## Troubleshooting

### Backend Issues

**Problem:** Backend won't start
- Check Render logs: Go to your service → **"Logs"** tab
- Verify all environment variables are set correctly
- Ensure database URL is correct

**Problem:** Database connection failed
- Verify `DATABASE_URL` uses the Internal Database URL from Render
- Check if database is in the same region as your service
- Ensure database is created and active

**Problem:** Migrations fail
- Run migrations manually via Render shell
- Check Prisma schema matches database structure

### Frontend Issues

**Problem:** API calls fail (CORS errors)
- Verify `FRONTEND_URL` in backend environment variables matches your Vercel URL exactly
- Check `VITE_API_URL` in frontend environment variables is correct
- Ensure backend CORS middleware is configured correctly

**Problem:** Can't log in
- Check browser console for errors
- Verify backend is running (visit backend health endpoint)
- Check JWT secret is set correctly
- Verify default PIN (or update it)

**Problem:** Build fails on Vercel
- Check build logs on Vercel dashboard
- Ensure root directory is set to `frontend`
- Verify all dependencies are in `package.json`

### General Issues

**Problem:** Git push fails
- Verify Git is configured: `git config --list`
- Check you're authenticated with GitHub
- Use SSH keys or personal access tokens for authentication

**Problem:** Can't access database
- Use the Internal Database URL (not External)
- Check database is active on Render dashboard
- Verify firewall/security settings

---

## Security Checklist

Before going live:

- [ ] Change default PIN from `123456` to a secure 4-6 digit code
- [ ] Use a strong, random `JWT_SECRET` (at least 32 characters)
- [ ] Set a secure `SECRET_PAGE_CODE`
- [ ] Verify HTTPS is enabled (automatic on Vercel and Render)
- [ ] Test authentication flow thoroughly
- [ ] Review CORS settings
- [ ] Enable rate limiting (already included in backend)
- [ ] Review and update placeholder content (songs, videos, images, etc.)

---

## Updating the Website

### To update content:

1. Make changes to your code locally
2. Test locally:
   ```powershell
   # Backend
   cd backend
   npm run dev

   # Frontend (in another terminal)
   cd frontend
   npm run dev
   ```
3. Commit and push changes:
   ```powershell
   git add .
   git commit -m "Update content"
   git push
   ```
4. Vercel and Render will automatically redeploy

### To update backend only:

1. Push changes to GitHub
2. Render will auto-deploy (or trigger manual deploy)
3. If schema changes, run migrations via Render shell

### To update frontend only:

1. Push changes to GitHub
2. Vercel will auto-deploy
3. Verify environment variables if needed

---

## Support & Resources

- **Render Documentation**: [https://render.com/docs](https://render.com/docs)
- **Vercel Documentation**: [https://vercel.com/docs](https://vercel.com/docs)
- **Prisma Documentation**: [https://www.prisma.io/docs](https://www.prisma.io/docs)
- **React Documentation**: [https://react.dev](https://react.dev)

---

## Quick Reference Commands

### Backend (Local Testing)
```powershell
cd backend
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

### Frontend (Local Testing)
```powershell
cd frontend
npm install
npm run dev
```

### Git Commands
```powershell
git status
git add .
git commit -m "Your message"
git push
```

---

**Congratulations!** Your anniversary website should now be live. Share the Vercel URL with Ananya, and she can access it from anywhere in the world! 💖

