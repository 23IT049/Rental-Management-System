# 🏠 Rental Management System

A full-stack 24-hour rental management system built with the MERN stack.

## 🚀 Features

- ✅ User authentication (Register/Login with JWT)
- ✅ Role-based access (Renter/Owner/Admin)
- ✅ Item listing with images
- ✅ Advanced search and filters
- ✅ 24-hour booking system
- ✅ Booking management (Confirm/Cancel/Complete)
- ✅ Owner and renter dashboards
- ✅ Responsive Material-UI design

## 📁 Project Structure

```
rental-management-system/
├── server/              # Backend (Node.js + Express)
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── middleware/     # Auth middleware
│   └── server.js       # Entry point
│
├── client/             # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── context/    # Auth context
│   │   ├── services/   # API services
│   │   └── App.jsx     # Main app
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 18
- Vite
- Material-UI (MUI)
- React Router
- Axios
- date-fns

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd rental-management-system
```

2. **Backend Setup**
```bash
cd server
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your MongoDB URI and JWT secret
```

3. **Frontend Setup**
```bash
cd ../client
npm install

# Create .env file (optional, uses proxy by default)
cp .env.example .env
```

## 🔧 Configuration

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on http://localhost:5173

## 📖 Usage Guide

### 1. Register an Account
- Go to http://localhost:5173/register
- Choose role: Renter (to rent items) or Owner (to list items)
- Fill in details and create account

### 2. As an Owner - List Items
- Login with owner account
- Click "List Item" in navbar
- Fill in item details (title, description, price, etc.)
- Submit to list your item

### 3. As a Renter - Book Items
- Browse items on home page
- Use search and filters
- Click on an item to view details
- Click "Book Now" to create a booking
- Select start date (24-hour rental period)

### 4. Manage Bookings
- **Renters:** View bookings in "My Bookings" → "As Renter" tab
- **Owners:** View rental requests in "My Bookings" → "As Owner" tab
- Owners can confirm/cancel bookings
- Owners can mark bookings as complete

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Items
- `GET /api/items` - Get all items (with filters)
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create item (Protected)
- `PUT /api/items/:id` - Update item (Protected)
- `DELETE /api/items/:id` - Delete item (Protected)

### Bookings
- `POST /api/bookings` - Create booking (Protected)
- `GET /api/bookings` - Get user bookings (Protected)
- `PUT /api/bookings/:id/confirm` - Confirm booking (Protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (Protected)
- `PUT /api/bookings/:id/complete` - Complete booking (Protected)

## 🧪 Testing

### Manual Testing Flow

1. **Test Registration:**
   - Register as Owner: owner@test.com / password123
   - Register as Renter: renter@test.com / password123

2. **Test Item Creation (Owner):**
   - Login as owner
   - Create 2-3 test items
   - Verify items appear in "My Items"

3. **Test Booking (Renter):**
   - Login as renter
   - Browse and search items
   - Book an item
   - Check "My Bookings"

4. **Test Booking Management (Owner):**
   - Login as owner
   - Go to "My Bookings" → "As Owner"
   - Confirm a pending booking
   - Mark as complete

## 🎨 Features Breakdown

### User Roles
- **Renter:** Can browse and book items
- **Owner:** Can list items and manage bookings
- **Admin:** Full access (future enhancement)

### Item Features
- Categories: Electronics, Vehicles, Equipment, Sports, Tools, Other
- Condition: New, Like New, Good, Fair
- Price per 24 hours
- Optional security deposit
- Location-based
- Features list

### Booking Features
- 24-hour rental period (auto-calculated)
- Status: Pending → Confirmed → Active → Completed
- Payment status tracking
- Notes for special instructions

## 🚧 Known Limitations (MVP)

- Image upload uses URLs only (no file upload yet)
- Payment integration is placeholder (Stripe not fully integrated)
- No email notifications
- No real-time chat
- No reviews/ratings
- Basic validation only

## 🔮 Future Enhancements

- [ ] Cloudinary image upload
- [ ] Stripe payment integration
- [ ] Email notifications
- [ ] Real-time chat
- [ ] Reviews and ratings
- [ ] Admin dashboard
- [ ] Analytics
- [ ] Mobile app (React Native)

## 📝 License

MIT

## 👥 Contributors

Your Name

## 🆘 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB URI in `.env`
- Check if IP is whitelisted in MongoDB Atlas
- Ensure network access is configured

### CORS Error
- Verify `CLIENT_URL` in backend `.env`
- Check if both servers are running

### Login Not Working
- Clear browser localStorage
- Check if JWT_SECRET is set in `.env`
- Verify MongoDB connection

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using MERN Stack**
