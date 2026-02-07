# IT342 Lab 1 - Secure Authentication System

A full-stack authentication system built with **Spring Boot** (backend) and **Next.js** (frontend) featuring secure user registration, login, JWT token-based authentication, and protected routes.

## 🚀 Features

✅ **User Registration** - Create new accounts with email and password  
✅ **Secure Login** - BCrypt password encryption and JWT token generation  
✅ **Protected Routes** - Only authenticated users can access the dashboard  
✅ **JWT Authentication** - Token-based session management (24-hour expiration)  
✅ **User Profile** - View account information and user details  
✅ **Session Management** - Automatic token validation and refresh  
✅ **MySQL Integration** - Reliable database storage with JPA  
✅ **Responsive Design** - Works seamlessly on all devices  
✅ **Modern UI** - Clean, creative design with glassmorphism effects  

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 2.7.17
- **Language**: Java 11
- **Security**: Spring Security, BCrypt, JWT (JJWT 0.9.1)
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA with Hibernate

### Frontend
- **Framework**: Next.js 16.1.6
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios 1.13.4
- **State Management**: React Context API

## 📋 Project Structure

```
IT342_G1_QUITAYEN_LAB1/
├── backend/
│   ├── src/main/java/com/Quitayen/backend/
│   │   ├── entity/User.java
│   │   ├── repository/UserRepository.java
│   │   ├── service/AuthService.java
│   │   ├── jwt/JwtProvider.java
│   │   ├── jwt/JwtFilter.java
│   │   ├── config/SecurityConfig.java
│   │   ├── controller/AuthController.java
│   │   ├── controller/UserController.java
│   │   └── dto/
│   │       ├── RegisterRequest.java
│   │       ├── LoginRequest.java
│   │       ├── LoginResponse.java
│   │       └── UserResponse.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── web/
│   ├── app/
│   │   ├── page.tsx (Landing page)
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── dashboard/page.tsx
│   ├── lib/
│   │   ├── AuthContext.tsx
│   │   └── ProtectedRoute.tsx
│   └── package.json
├── docs/
│   ├── FRS.md
│   ├── ARCHITECTURE.md
│   ├── API_TESTING.md
│   ├── README_IMPLEMENTATION.md
│   ├── README.md
│   └── TASK_CHECKLIST.md
└── mobile/ (placeholder for future mobile app)
```

## 🚀 Quick Start

### Prerequisites
- Java 11+
- Node.js 18+
- MySQL 8.0+
- Maven 3.6+

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

### Frontend Setup

```bash
cd web
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

### Database Setup

1. Create database:
```sql
CREATE DATABASE it342_quitayen_lab1;
USE it342_quitayen_lab1;

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. Update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/it342_quitayen_lab1
spring.datasource.username=root
spring.datasource.password=your_password
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### User
- `GET /api/user/me` - Get current user profile (requires authentication)

## 🔐 Security Features

- **Password Encryption**: BCrypt with strength 10
- **JWT Tokens**: HS512 algorithm, 24-hour expiration
- **CORS**: Enabled for localhost:3000 and localhost:3001
- **Stateless Sessions**: No session cookies, token-based only
- **Protected Routes**: Frontend route guards for authenticated pages
- **Request Validation**: Input validation on both client and server

## 🔄 Authentication Flow

1. **Registration**: User creates account → Password hashed with BCrypt → Stored in database
2. **Login**: User provides credentials → Password verified → JWT token generated
3. **Authenticated Request**: Token sent in `Authorization: Bearer <token>` header
4. **Token Validation**: JwtFilter validates signature and expiration
5. **Protected Routes**: ProtectedRoute component redirects unauthenticated users to login

## 🎨 UI/UX Highlights

- **Dark Theme**: Slate-900 to purple-900 gradient background
- **Glassmorphism**: Semi-transparent cards with backdrop blur effects
- **Animated Elements**: Pulsing background circles, bouncing emojis
- **Gradient Buttons**: Purple-to-pink gradients with hover effects
- **Feature Cards**: 6 feature cards on landing and dashboard
- **Emoji Icons**: Visual appeal with relevant emojis

## 📝 Documentation

- [FRS.md](docs/FRS.md) - Functional Requirements Specification
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - System architecture and design
- [API_TESTING.md](docs/API_TESTING.md) - API endpoint testing guide
- [README_IMPLEMENTATION.md](docs/README_IMPLEMENTATION.md) - Implementation details
- [TASK_CHECKLIST.md](TASK_CHECKLIST.md) - Project progress tracking

## ✅ Testing

### Frontend
- Test registration flow at `/register`
- Test login flow at `/login`
- Test protected dashboard at `/dashboard`
- Test logout functionality

### Backend
- Use Postman or curl to test API endpoints
- See [API_TESTING.md](docs/API_TESTING.md) for detailed testing instructions

## 🛠️ Troubleshooting

**Port Already in Use**
```bash
# Kill process on port 8080 (backend)
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Kill process on port 3000 (frontend)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Database Connection Issues**
- Verify MySQL is running
- Check username and password in `application.properties`
- Ensure database exists: `CREATE DATABASE it342_quitayen_lab1;`

**Frontend Not Connecting to Backend**
- Verify backend is running on port 8080
- Check CORS configuration in `SecurityConfig.java`
- Check API endpoint in `AuthContext.tsx`

## 📊 Project Status

See [TASK_CHECKLIST.md](TASK_CHECKLIST.md) for detailed task progress and commit history.

## 👤 Author

Quitayen - IT342 Lab 1

## 📄 License

This project is for educational purposes as part of IT342 Laboratory 1.
