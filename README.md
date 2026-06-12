# Eventa - Full-Stack Event Booking Platform

Eventa is a full-stack MERN event booking application. Users can browse events, register/login, verify accounts with email OTP, request bookings, and manage their bookings. Admin users can manage events, confirm bookings, and track booking/payment status.

## Features

- User authentication with JWT and bcrypt.
- Email OTP verification for account activation.
- Email OTP verification before event booking.
- Role-based access for admin and users.
- Event management with images, dates, categories, prices, and seats.
- Booking flow with pending admin confirmation.
- Admin dashboard for booking and revenue tracking.
- Email notifications with Nodemailer.
- React, Vite, and Tailwind CSS frontend.

## Project Structure

```txt
Client/   React + Vite frontend
Server/   Express + MongoDB backend
```

## Environment Variables

Create `Server/.env` locally:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```

For Render deployment, add the same variables except `PORT`. Render provides `PORT` automatically.

## Local Development

From the project root:

```bash
npm install
npm run install:all
npm run dev
```

This starts both the backend and frontend with `concurrently`.

## Production Build

```bash
npm run build
npm start
```

## Render Deployment

Deploy as one Render Web Service.

```txt
Build Command: npm run build
Start Command: npm start
```

The Express server serves the built frontend from `Client/dist`, and API routes are available under `/api`.
