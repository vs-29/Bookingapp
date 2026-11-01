Booking App
A full-stack hotel booking platform built with the MERN stack (MongoDB, Express, React, Node.js). It has three parts: a customer website, an admin dashboard and a REST API.

Features
Customer site (client/)

Search hotels by destination, with a date range picker and guest and room counts
Filter results by minimum and maximum price
Hotel pages with photos, details and available rooms
Reserve rooms for chosen dates; booked dates are saved per room so they can't be double-booked
Register and log in
Admin dashboard (admin/)

Protected routes: only logged-in admins can open the dashboard
Data tables to list, view, create and delete users, hotels and rooms
A summary card on the home page
API (server/)

JWT authentication stored in an HTTP-only cookie, with passwords hashed using bcrypt
Middleware that separates public, user-only and admin-only routes
Aggregate endpoints for the home page: hotel counts by city and by property type
Central error handler that returns a consistent JSON error shape
Tech stack
Part	Built with
Customer site	React, Vite, React Router, Axios, react-date-range, Font Awesome
Admin dashboard	React (Create React App), Material UI, MUI Data Grid
API	Node.js, Express, Mongoose, JSON Web Tokens, bcryptjs
Database	MongoDB
Project structure
Bookingapp/
├── client/   customer website (Vite + React)
├── admin/    admin dashboard (React + Material UI)
└── server/   REST API (Express + MongoDB)
    ├── controllers/   auth, hotels, rooms, users
    ├── models/        Hotel, Room, User
    ├── routes/
    └── utils/         error helper, token verification
API overview
Method	Endpoint	Access
POST	/auth/register, /auth/login	Public
GET	/hotels, /hotels/find/:id, /hotels/rooms/:id	Public
GET	/hotels/countByCity, /hotels/countByType	Public
POST, PUT, DELETE	/hotels, /hotels/:id	Admin
POST, PUT, DELETE	/rooms/:hotelId, /rooms/:id, /rooms/:id/:hotelId	Admin
PUT	/rooms/availability/:id	Public
GET, PUT, DELETE	/users/:id	That user or an admin
GET	/users	Admin
Run it locally
Requires Node.js and a MongoDB database (local or MongoDB Atlas).

1. API
cd server
npm install
Create server/.env:

DB=<your MongoDB connection string>
JWT=<a long random secret>
PORT=8800
npm start
The API runs on http://localhost:8800.

2. Customer site
cd client
npm install
npm run dev
Opens on http://localhost:5173.

3. Admin dashboard
cd admin
npm install
npm start
Opens on http://localhost:3000. To log in, set isAdmin: true on a user in the database.

What I'd improve next
Add a booking record (user, room, dates) so users can see and cancel their reservations
Restrict CORS to the two frontend origins and protect the room availability endpoint
Add tests for the auth and booking flows
Deploy the API and both frontends
