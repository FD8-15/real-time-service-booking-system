# Real-Time Service Booking System

A backend-focused full-stack project that allows users to browse nearby services, manage bookings, and receive real-time updates. The main focus of this project was backend architecture, API development, database integration, authentication, and real-time communication.

---

## Overview

This project demonstrates practical backend development skills using Node.js, Express.js, MongoDB Atlas, and Socket.IO. It includes authentication, REST APIs, cloud image uploads, booking management, and real-time communication.

The frontend interface was used for backend API integration and testing, while the primary development work focused on backend implementation.

---

# Features

## Backend Features

* REST API development using Express.js
* MongoDB Atlas cloud database integration
* JWT Authentication & Authorization
* Real-time communication using Socket.IO
* Booking management APIs
* User profile management
* Cloudinary image upload integration
* Middleware-based error handling
* Secure environment variable configuration
* Modular backend folder structure

---

## Real-Time Functionality

Socket.IO is implemented for:

* Live booking updates
* Instant service status changes
* Real-time communication between users and system

---

# Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Socket.IO
* JWT Authentication
* Cloudinary
* Multer

## Frontend

* HTML
* CSS
* JavaScript

---

# Project Structure

```bash
real-time-service-booking-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── index.js
│   │   └── server.js
│   │
│   ├── public/
│   ├── package.json
│   └── .env
│
├── frontend/
│   └── nearBy_services_frontend.html
│
└── README.md
```

---

# API Modules

## User Module

* User registration
* User login
* JWT authentication
* Profile management

## Service Module

* Nearby service handling
* Service management APIs

## Booking Module

* Create booking
* Manage bookings
* Booking status updates

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/FD8-15/real-time-service-booking-system.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret
CLOUDINARY_API_KEY=your_key
CLOUDINARY_SECRET=your_secret
CLOUD_NAME=your_cloud_name
```

Run backend server:

```bash
npm run dev
```

---

## Frontend Setup

Open:

```bash
frontend/nearBy_services_frontend.html
```

in browser.

---

# Database

This project uses:

* MongoDB Atlas for cloud database hosting
* Mongoose ODM for database operations

---

# What I Learned

Through this project, I learned:

* Backend API development
* MongoDB Atlas integration
* JWT Authentication
* Real-time systems using Socket.IO
* Cloudinary integration
* Middleware handling
* Git & GitHub workflow
* Environment variable management
* Backend project structuring

---

# Future Improvements

* Payment gateway integration
* Admin dashboard
* Notifications system
* Advanced filtering and search
* Full React frontend integration
* Deployment optimization

---

# Author

## Raj Naik

Backend Developer | Full-Stack Learner

GitHub: [https://github.com/FD8-15](https://github.com/FD8-15)

---

# License

This project is for learning and educational purposes.
