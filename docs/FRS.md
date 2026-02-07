# IT342 Lab 1 - Authentication System
## Functional Requirements Specification (FRS)

**Project:** Full-Stack Authentication System with Spring Boot & React/Next.js  
**Date:** February 7, 2026  
**Student:** Quitayen  

---

## 1. System Overview

This is a complete authentication system that provides secure user registration, login, and profile management. The system uses:
- **Backend:** Spring Boot 3.5.10 with Spring Security and JWT
- **Frontend:** React 19 with Next.js 16
- **Database:** MySQL
- **Security:** BCrypt password encryption and JWT token authentication

---

## 2. Database Design

### Entity Relationship Diagram (ERD)

```
erDiagram
    USERS {
        bigint id PK "Auto-increment ID"
        varchar email "Unique, Not Null"
        varchar password_hash "BCrypt Encrypted"
        varchar full_name "User's Name"
        varchar role "USER or ADMIN"
        timestamp created_at "Registration Date"
    }
```

### Database Table Specifications

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User's email address |
| password_hash | VARCHAR(255) | NOT NULL | BCrypt encrypted password |
| full_name | VARCHAR(255) | NOT NULL | User's full name |
| role | VARCHAR(50) | NOT NULL, DEFAULT 'USER' | User role (USER/ADMIN) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Account creation time |

---

## 3. Functional Requirements

### 3.1 Authentication Module

#### FR1: User Registration (POST /api/auth/register)
- **Description:** Allow new users to create an account
- **Input Parameters:**
  - email (string, required, unique)
  - password (string, required, min 8 characters)
  - fullName (string, required)
- **Output:** User object with user details (id, email, fullName, role)
- **Success Response:** HTTP 201 Created
- **Error Handling:** 
  - 400 Bad Request if email already exists
  - 400 Bad Request for invalid input

#### FR2: User Login (POST /api/auth/login)
- **Description:** Authenticate user and return JWT token
- **Input Parameters:**
  - email (string, required)
  - password (string, required)
- **Output:** Login response with JWT token
- **Success Response:** HTTP 200 OK
- **Error Handling:**
  - 401 Unauthorized for invalid credentials
  - 400 Bad Request for missing parameters
- **Token Details:**
  - Algorithm: HS256
  - Expiration: 24 hours
  - Contains: User email as subject

#### FR3: Get Current User (GET /api/user/me) - Protected
- **Description:** Retrieve current authenticated user's profile
- **Authentication:** Required (Bearer Token)
- **Output:** User object with full details
- **Success Response:** HTTP 200 OK
- **Error Handling:**
  - 401 Unauthorized if token invalid/expired
  - 404 Not Found if user doesn't exist

### 3.2 Security Requirements

#### FR4: Password Encryption
- Use BCrypt with strength 10
- Passwords never stored in plain text
- Password validation on login

#### FR5: JWT Token Management
- Generate secure JWT tokens on login
- Validate token on protected endpoints
- Automatically reject expired tokens
- Token must be sent in Authorization header with "Bearer " prefix

#### FR6: Cross-Origin Resource Sharing (CORS)
- Allow requests from http://localhost:3000
- Allow requests from http://localhost:3001
- Support standard HTTP methods

---

## 4. Technical Architecture

### 4.1 Backend Architecture

```
com.Quitayen.backend/
├── entity/
│   └── User.java              (JPA Entity)
├── repository/
│   └── UserRepository.java    (Spring Data JPA)
├── dto/
│   ├── RegisterRequest.java
│   ├── LoginRequest.java
│   ├── LoginResponse.java
│   └── UserResponse.java
├── service/
│   └── AuthService.java       (Business Logic)
├── controller/
│   ├── AuthController.java    (Auth endpoints)
│   └── UserController.java    (User endpoints)
├── security/
│   ├── JwtProvider.java       (Token generation/validation)
│   ├── JwtFilter.java         (Request authentication filter)
│   └── SecurityConfig.java    (Security configuration)
└── BackendApplication.java
```

### 4.2 Frontend Architecture

```
app/
├── page.tsx                    (Home/Landing page)
├── layout.tsx                  (Root layout with AuthProvider)
├── globals.css                 (Tailwind styles)
├── register/
│   └── page.tsx               (Registration page)
├── login/
│   └── page.tsx               (Login page)
└── dashboard/
    └── page.tsx               (Protected user dashboard)

lib/
├── AuthContext.tsx            (Authentication context & hooks)
└── ProtectedRoute.tsx         (Protected route wrapper)
```

---

## 5. API Endpoints

| Method | Endpoint | Description | Auth Required | 
|--------|----------|-------------|---|
| POST | /api/auth/register | Create new user account | No |
| POST | /api/auth/login | Authenticate user and get token | No |
| GET | /api/user/me | Get current user profile | Yes |

### Request/Response Examples

#### Register
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": "John Doe"
}

Response: 201 Created
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "USER",
  "createdAt": "2026-02-07T10:30:00"
}
```

#### Login
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

#### Get Current User
```
GET /api/user/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response: 200 OK
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "USER",
  "createdAt": "2026-02-07T10:30:00"
}
```

---

## 6. UI Workflows

### 6.1 Registration Flow
1. User visits home page
2. Clicks "Create Account" button
3. Fills registration form (email, password, full name)
4. System validates input
5. Password is encrypted with BCrypt
6. User is saved to database
7. User is redirected to login page

### 6.2 Login Flow
1. User fills login form (email, password)
2. System validates credentials against database
3. BCrypt compares password with stored hash
4. JWT token is generated
5. Token is stored in localStorage
6. User is redirected to dashboard

### 6.3 Dashboard Flow
1. User views profile information
2. System fetches user data from /api/user/me endpoint
3. User information is displayed
4. User can logout
5. Token is cleared from storage
6. User is redirected to login page

### 6.4 Protected Routes
- Dashboard (/dashboard) is protected
- Unauthenticated users are redirected to login
- Token is automatically included in API requests
- Expired tokens trigger re-authentication

---

## 7. Security Considerations

### 7.1 Authentication
- JWT tokens provided via Authorization header
- Token expiration: 24 hours
- Stateless authentication (no session storage)

### 7.2 Password Security
- BCrypt hashing with strength 10
- Passwords never logged or exposed
- Secure comparison during verification

### 7.3 CORS Configuration
- Limited to localhost development URLs
- Can be configured for production domains

### 7.4 SQL Injection Prevention
- JPA parameterized queries prevent SQL injection
- No raw SQL queries in user input handling

---

## 8. Dependencies

### Backend Dependencies
- Spring Boot Starter Web
- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- MySQL Connector Java
- JJWT (JSON Web Token): 0.12.3
- Lombok
- Spring Boot Dev Tools

### Frontend Dependencies
- React 19.2.3
- Next.js 16.1.6
- Axios 1.13.4
- Tailwind CSS 4
- TypeScript 5

---

## 9. Configuration

### Database Configuration
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/it342_quitayen_lab1
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### JWT Configuration
```properties
jwt.secret=mySecretKeyForJWTthatmustbeatleast256bitslong1234567890
jwt.expiration=86400000
```

### Server Configuration
```properties
server.port=8080
```

---

## 10. Testing Checklist

- [ ] Register new user with valid data
- [ ] Register fails with duplicate email
- [ ] Register fails with invalid email format
- [ ] Login with correct credentials
- [ ] Login fails with incorrect password
- [ ] Login fails with non-existent email
- [ ] Get current user with valid token
- [ ] Get current user fails with invalid token
- [ ] Protected routes redirect to login when unauthenticated
- [ ] Logout clears token and redirects to login
- [ ] CORS headers are correctly set
- [ ] Password is properly encrypted in database

---

## 11. Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Refresh token implementation
- [ ] Remember me feature
- [ ] Two-factor authentication
- [ ] Google/GitHub OAuth integration
- [ ] User profile update endpoint
- [ ] Admin dashboard
- [ ] Role-based access control (RBAC)
- [ ] API rate limiting

---

**Document Version:** 1.0  
**Last Updated:** February 7, 2026
