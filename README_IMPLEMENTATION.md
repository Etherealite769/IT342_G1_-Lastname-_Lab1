# IT342 Lab 1 - Authentication System

## Project Overview

A complete, production-ready authentication system built with **Spring Boot 3.5.10** and **React 19/Next.js 16**.

**Features:**
- ✅ User Registration with email validation
- ✅ Secure Login with BCrypt password encryption
- ✅ JWT Token-based authentication
- ✅ Protected routes and user dashboard
- ✅ User profile management
- ✅ MySQL database integration
- ✅ RESTful API with Spring Boot
- ✅ Modern React UI with Tailwind CSS
- ✅ CORS enabled for development

---

## Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.8+

### 1. Database Setup

Create MySQL database:
```bash
mysql -u root -p
CREATE DATABASE it342_quitayen_lab1;
```

### 2. Backend Setup

Navigate to backend directory:
```bash
cd backend
```

Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/it342_quitayen_lab1
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

Run backend:
```bash
mvn clean install
mvn spring-boot:run
```

Backend will start on: `http://localhost:8080`

### 3. Frontend Setup

Navigate to web directory:
```bash
cd web
```

Install dependencies:
```bash
npm install
```

Run frontend:
```bash
npm run dev
```

Frontend will start on: `http://localhost:3000`

---

## Project Structure

### Backend (`/backend`)
```
src/main/java/com/Quitayen/backend/
├── entity/
│   └── User.java                 # JPA Entity
├── repository/
│   └── UserRepository.java       # Data access layer
├── dto/
│   ├── RegisterRequest.java
│   ├── LoginRequest.java
│   ├── LoginResponse.java
│   └── UserResponse.java
├── service/
│   └── AuthService.java          # Business logic
├── controller/
│   ├── AuthController.java       # Auth endpoints
│   └── UserController.java       # User endpoints
├── security/
│   ├── JwtProvider.java          # Token generation
│   ├── JwtFilter.java            # Token validation
│   └── SecurityConfig.java       # Security setup
└── BackendApplication.java
```

### Frontend (`/web`)
```
app/
├── page.tsx                      # Home page
├── layout.tsx                    # Root layout
├── register/
│   └── page.tsx                  # Registration page
├── login/
│   └── page.tsx                  # Login page
└── dashboard/
    └── page.tsx                  # User dashboard

lib/
├── AuthContext.tsx               # Auth state management
└── ProtectedRoute.tsx            # Route protection
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Create account | No |
| POST | `/api/auth/login` | Login & get token | No |

### User

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/user/me` | Get current user | Yes |

---

## Application Features

### 1. Home Page
- Welcome screen with project description
- Navigation buttons for register/login
- Feature highlights
- System information

### 2. Registration Page
- Email input with validation
- Password input
- Full name input
- Submit button
- Link to login page
- Error messages for validation failures

### 3. Login Page
- Email input
- Password input
- Submit button
- Link to registration
- Error messages for invalid credentials

### 4. Dashboard (Protected)
- User profile information
- User details (email, name, role, registration date)
- Welcome message
- Feature cards
- Logout button

---

## Security Features

### Password Encryption
- BCrypt hashing with strength 10
- Passwords never stored in plain text
- Secure comparison during verification

### Token Authentication
- JWT tokens with HS256 algorithm
- 24-hour expiration
- Email stored as subject
- Automatic token validation on protected endpoints

### CORS Configuration
- Enabled for localhost:3000 and localhost:3001
- Prevents unauthorized cross-origin requests

### Protected Routes
- `/dashboard` requires authentication
- Unauthenticated users redirected to login
- Token automatically added to API requests

---

## Documentation

Comprehensive documentation is available in the `/docs` folder:

### 1. **FRS.md** - Functional Requirements Specification
- System overview
- Database design and ERD
- Functional requirements (FR1-FR6)
- API endpoints and examples
- Security requirements
- Testing checklist
- Future enhancements

### 2. **ARCHITECTURE.md** - Technical Architecture
- System architecture diagram
- Class diagrams
- Sequence diagrams
- Authentication flow diagram
- Technology stack
- Security architecture

### 3. **API_TESTING.md** - API Documentation & Testing
- Complete API reference
- Request/response examples
- cURL examples
- Test scenarios with steps
- Frontend testing checklist
- Troubleshooting guide
- Common issues and solutions

---

## Testing

### Manual Testing (Postman/cURL)

**Register User:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123",
    "fullName": "John Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123"
  }'
```

**Get Current User:**
```bash
curl -X GET http://localhost:8080/api/user/me \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

### UI Testing

1. Visit `http://localhost:3000`
2. Create account with valid email
3. Login with credentials
4. View profile on dashboard
5. Test logout functionality
6. Verify protected route access

---

## Technologies Used

### Backend
- **Spring Boot 3.5.10** - Framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database ORM
- **JJWT 0.12.3** - JWT implementation
- **MySQL Connector** - Database driver
- **Lombok** - Code generation
- **BCrypt** - Password hashing

### Frontend
- **React 19.2.3** - UI library
- **Next.js 16.1.6** - Framework
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Axios 1.13.4** - HTTP client

### Database
- **MySQL 8.0+**

---

## Configuration

### Backend Configuration (`application.properties`)

```properties
# DataSource
spring.datasource.url=jdbc:mysql://localhost:3306/it342_quitayen_lab1
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Server
server.port=8080

# JWT
jwt.secret=mySecretKeyForJWTthatmustbeatleast256bitslong1234567890
jwt.expiration=86400000
```

### Frontend Environment

Frontend automatically connects to `http://localhost:8080` for API calls.

---

## Common Issues

### Database Connection Error
**Solution:** Ensure MySQL is running and database `it342_quitayen_lab1` exists.

### CORS Error
**Solution:** Verify backend is running on port 8080 and frontend on 3000.

### JWT Token Invalid
**Solution:** Restart backend after changing JWT secret in properties.

### Port Already in Use
**Backend (8080):**
```bash
kill -9 $(lsof -t -i :8080)  # Mac/Linux
netstat -ano | findstr :8080  # Windows
```

**Frontend (3000):**
```bash
kill -9 $(lsof -t -i :3000)   # Mac/Linux
netstat -ano | findstr :3000  # Windows
```

---

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Refresh token implementation
- [ ] Two-factor authentication
- [ ] OAuth integration (Google, GitHub)
- [ ] User profile update endpoint
- [ ] Admin dashboard
- [ ] Role-based access control (RBAC)
- [ ] API rate limiting
- [ ] Audit logging

---

## Directory Structure

```
IT342_G1_QUITAYEN_LAB1/
├── backend/                      # Spring Boot application
│   ├── src/
│   │   ├── main/java/
│   │   ├── main/resources/
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
├── web/                          # Next.js application
│   ├── app/
│   ├── lib/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
└── docs/                         # Documentation
    ├── FRS.md
    ├── ARCHITECTURE.md
    └── API_TESTING.md
```

---

## Author

**Student:** Quitayen  
**Subject:** IT342 - Web Application Development  
**Lab:** Lab 1 - Authentication System  
**Date:** February 7, 2026  

---

## License

This project is for educational purposes as part of IT342 course.

---

## Support

For issues or questions:
1. Check the documentation in `/docs` folder
2. Review the API Testing guide for endpoint details
3. Consult the troubleshooting section
4. Verify prerequisites are installed and running

---

**Happy Coding! 🚀**
