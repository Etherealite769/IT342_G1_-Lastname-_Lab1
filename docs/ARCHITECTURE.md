# Architecture & Design Documentation

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            Next.js Application (Port 3000)             │   │
│  │                                                          │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │           React Components                      │    │   │
│  │  │  - Home Page (Welcome)                          │    │   │
│  │  │  - Register Page                                │    │   │
│  │  │  - Login Page                                   │    │   │
│  │  │  - Dashboard/Profile Page                       │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  │                        ↓                                  │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │        AuthContext (State Management)           │    │   │
│  │  │  - User state                                   │    │   │
│  │  │  - Token management                             │    │   │
│  │  │  - Auth functions (register, login, logout)     │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  │                        ↓                                  │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │        Axios HTTP Client                        │    │   │
│  │  │  - API calls to backend                         │    │   │
│  │  │  - JWT token in headers                         │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────┬─────────────────────────────────────┘
                             │ HTTP/REST
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                 Spring Boot Server (Port 8080)                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │               Controllers (REST API)                    │   │
│  │  - AuthController (/api/auth/*)                         │   │
│  │  - UserController (/api/user/*)                         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                        ↓                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │               Security Layer                            │   │
│  │  - JwtFilter (Token extraction & validation)            │   │
│  │  - SecurityConfig (Authorization rules)                 │   │
│  │  - JwtProvider (Token generation/validation)            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                        ↓                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │               Service Layer                             │   │
│  │  - AuthService (Business logic)                         │   │
│  │    • Registration logic                                 │   │
│  │    • Login logic with password verification             │   │
│  │    • User retrieval                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                        ↓                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │             Repository Layer (JPA)                      │   │
│  │  - UserRepository                                       │   │
│  │    • findByEmail()                                      │   │
│  │    • save(), findById()                                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                        ↓                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Entity Model                               │   │
│  │  - User (JPA Entity)                                    │   │
│  │    • id, email, passwordHash, fullName, role           │   │
│  │    • createdAt timestamp                                │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────┬─────────────────────────────────────┘
                             │ JDBC
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                   MySQL Database                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    users table                           │   │
│  │  - id (PK, BIGINT)                                       │   │
│  │  - email (VARCHAR, UNIQUE)                              │   │
│  │  - password_hash (VARCHAR, BCrypt)                       │   │
│  │  - full_name (VARCHAR)                                  │   │
│  │  - role (VARCHAR)                                       │   │
│  │  - created_at (TIMESTAMP)                               │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Class Diagram

```
┌─────────────────────────────────┐
│          User Entity            │
├─────────────────────────────────┤
│ - id: Long                      │
│ - email: String                 │
│ - passwordHash: String          │
│ - fullName: String              │
│ - role: String                  │
│ - createdAt: LocalDateTime      │
├─────────────────────────────────┤
│ + User()                        │
│ + getters/setters               │
│ + onCreate()                    │
└─────────────────────────────────┘
          ↑
          │ JPA Entity
          │
┌─────────────────────────────────┐
│    UserRepository (JPA)         │
├─────────────────────────────────┤
│                                 │
├─────────────────────────────────┤
│ + findByEmail(String): Optional │
│ + save(User): User              │
│ + findById(Long): Optional      │
└─────────────────────────────────┘

┌─────────────────────────────────┐       ┌──────────────────────┐
│      AuthService                │      │   PasswordEncoder    │
├─────────────────────────────────┤       │(BCryptPasswordEncoder)
│ - userRepository                │       └──────────────────────┘
│ - passwordEncoder               │               ↑
│ - jwtProvider                   │               │ uses
├─────────────────────────────────┤               │
│ + register()                    ├──────────────┘
│ + login()                       │
│ + getUserByEmail()              │
│ + mapToUserResponse()           │
└─────────────────────────────────┘
          ↑
          │
          │
┌─────────────────────────────────┐
│    JWT Provider/Filter          │
├─────────────────────────────────┤
│ - jwtSecret                     │
│ - jwtExpirationMs               │
├─────────────────────────────────┤
│ + generateToken(String): String │
│ + extractEmail(String): String  │
│ + isTokenValid(String): Boolean │
│ + isTokenExpired(String): Boolean│
└─────────────────────────────────┘

┌─────────────────────────────────┐
│    Controllers                  │
├─────────────────────────────────┤
│  AuthController                 │
│  - authService                  │
│                                 │
│  UserController                 │
│  - authService                  │
├─────────────────────────────────┤
│ + register(dto): ResponseEntity │
│ + login(dto): ResponseEntity    │
│ + getCurrentUser(): ResponseEntity
└─────────────────────────────────┘

DTOs:
┌────────────────┐  ┌────────────────┐  ┌──────────────────┐
│RegisterRequest │  │ LoginRequest   │  │  LoginResponse   │
├────────────────┤  ├────────────────┤  ├──────────────────┤
│- email         │  │- email         │  │- token           │
│- password      │  │- password      │  │- message         │
│- fullName      │  └────────────────┘  └──────────────────┘
└────────────────┘

┌────────────────────────┐
│   UserResponse         │
├────────────────────────┤
│- id                    │
│- email                 │
│- fullName              │
│- role                  │
│- createdAt             │
└────────────────────────┘
```

## Sequence Diagrams

### Registration Flow

```
User          Browser        Next.js                Backend         Database
 │              │              │                     │                │
 │─Register─────→│              │                     │                │
 │              │─Register Form───→                  │                │
 │              │              │─POST /auth/register--→                │
 │              │              │                     │ Check email    │
 │              │              │                     │────────────────→│
 │              │              │                     │ Email exists?  │
 │              │              │                     │←────────────────│
 │              │              │                     │ Encrypt pwd    │
 │              │              │                     │ Save User      │
 │              │              │                     │────────────────→│
 │              │              │ 201 Created ←────────│                │
 │              │ Redirect─────→│                     │                │
 │              │←──/login──────│
```

### Login Flow

```
User          Browser        Next.js                Backend         Database
 │              │              │                     │                │
 │─Login────────→│              │                     │                │
 │              │─Login Form────→                    │                │
 │              │              │─POST /auth/login---→                 │
 │              │              │                     │ Find by email  │
 │              │              │                     │────────────────→│
 │              │              │                     │ Compare pwd    │
 │              │              │                     │(BCrypt)        │
 │              │              │                     │ Generate JWT   │
 │              │              │ 200 + Token←────────│                │
 │              │ Store Token───→                    │                │
 │              │←──/dashboard──│
```

### Protected Access Flow

```
User          Browser        Next.js                Backend         Database
 │              │              │                     │                │
 │─/dashboard───→│              │                     │                │
 │              │              │ Check Auth? ─→     │                │
 │              │              │←─ Authed with token│                │
 │              │─Request w/Token→GET /user/me──────→                │
 │              │              │ Token Valid?        │                │
 │              │              │←──────────────────┐ │                │
 │              │              │ Extract email     │ │                │
 │              │              │                   │ │                │
 │              │              │                   └─→Find by email   │
 │              │              │                     │────────────────→│
 │              │ 200 User Data←──←────────────────────│                │
 │←─Dashboard────│              │                     │                │
```

## Authentication Flow Diagram

```
┌──────────────┐
│   User       │
└──────┬───────┘
       │
       │ 1. Credentials
       ↓
┌──────────────────────┐
│   Login Page         │
│  - Email             │
│  - Password          │
└──────┬───────────────┘
       │
       │ 2. POST /api/auth/login
       ↓
┌──────────────────────────────────────┐
│        AuthController                │
│  - Receives LoginRequest             │
└──────┬───────────────────────────────┘
       │
       │ 3. Call authService.login()
       ↓
┌──────────────────────────────────────┐
│        AuthService                   │
│  - Find user by email                │
│  - Verify password (BCrypt compare)  │
└──────┬───────────────────────────────┘
       │
       │ 4. Call jwtProvider.generateToken()
       ↓
┌──────────────────────────────────────┐
│        JwtProvider                   │
│  - Create JWT token                  │
│  - Set expiration (24h)              │
│  - Sign with HS256                   │
└──────┬───────────────────────────────┘
       │
       │ 5. Return LoginResponse with token
       ↓
┌──────────────────────────────────────┐
│        Next.js (Browser)             │
│  - Store token in localStorage       │
│  - Set Authorization header          │
│  - Redirect to /dashboard            │
└──────┬───────────────────────────────┘
       │
       │ 6. GET /api/user/me with token
       ↓
┌──────────────────────────────────────┐
│     JwtFilter (Security)             │
│  - Extract token from header         │
│  - Validate signature                │
│  - Check expiration                  │
│  - Set authentication context        │
└──────┬───────────────────────────────┘
       │
       ↓ (if valid)
┌──────────────────────────────────────┐
│     UserController                   │
│  - Receive authenticated request     │
│  - Get principal (email)             │
│  - Call authService.getUserByEmail() │
│  - Return UserResponse               │
└──────┬───────────────────────────────┘
       │
       │ 7. User data displayed on dashboard
       ↓
┌──────────────────────────────────────┐
│     Dashboard Page                   │
│  - Display user profile              │
│  - Show user information             │
│  - Provide logout button             │
└──────────────────────────────────────┘
```

## Technology Stack

### Backend Stack
```
Spring Boot 3.5.10
├── Spring Web (REST API)
├── Spring Data JPA (Database ORM)
├── Spring Security (Authentication & Authorization)
├── JJWT 0.12.3 (JSON Web Tokens)
├── MySQL Connector (Database Driver)
├── Lombok (Code generation)
└── Maven (Build Tool)

Java 17
BCrypt (Password Encryption)
```

### Frontend Stack
```
Next.js 16.1.6
├── React 19.2.3 (UI Framework)
├── TypeScript 5 (Type Safety)
├── Tailwind CSS 4 (Styling)
├── Axios 1.13.4 (HTTP Client)
└── npm (Package Manager)
```

### Database
```
MySQL 8.0+
└── Database: it342_quitayen_lab1
```

### Development Tools
```
VS Code
├── Java Extensions
├── Spring Boot Extensions
├── Next.js Extensions
└── Tailwind CSS IntelliSense
```

## Security Architecture

```
┌─────────────────────────────────────────────┐
│           Client Request                    │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│         CORS Filter (Enable CORS)           │
│         Allowed Origins:                    │
│         - localhost:3000                    │
│         - localhost:3001                    │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│           CSRF Protection                   │
│           (Disabled for API)                │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│       JwtFilter - Token Extraction          │
│       - Check Authorization header          │
│       - Extract JWT from "Bearer {token}"   │
└────────────────────┬────────────────────────┘
                     │
                     ↓
        ┌────────────┴───────────┐
        │                        │
   (Token Valid?)           (No token)
        │                        │
        ↓                        ↓
   ┌─────────┐         ┌──────────────┐
   │Validate │         │Allow if path │
   │Signature│         │is public     │
   └────┬────┘         └───────┬──────┘
        │                      │
        ↓                      ↓
   ┌─────────────┐    ┌────────────────┐
   │Check        │    │Allow access or │
   │Expiration   │    │Redirect to auth│
   └────┬────────┘    └────────────────┘
        │
        ↓
   ┌─────────────┐
   │Set Auth     │
   │Context      │
   └────┬────────┘
        │
        ↓
   ┌──────────────────┐
   │Proceed to        │
   │Controller        │
   └──────────────────┘
```

---

**Document Version:** 1.0  
**Last Updated:** February 7, 2026
