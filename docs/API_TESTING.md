# API Documentation & Testing Guide

## API Endpoints Summary

### Base URLs
- **Backend API:** `http://localhost:8080`
- **Frontend:** `http://localhost:3000`

---

## 1. Authentication Endpoints

### 1.1 Register New User

**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account with email and password

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "fullName": "John Doe"
}
```

**Success Response (201 Created):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "USER",
  "createdAt": "2026-02-07T10:30:00"
}
```

**Error Responses:**

1. **Email Already Exists (400 Bad Request)**
```json
Bad Request
```

2. **Invalid Input (400 Bad Request)**
```json
Bad Request
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123",
    "fullName": "John Doe"
  }'
```

---

### 1.2 User Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and receive JWT token

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNjc0MzcxNDAwLCJleHAiOjE2NzQ0NTc4MDB9.signature",
  "message": "Login successful"
}
```

**Token Structure:**
```
Header.Payload.Signature

Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "sub": "user@example.com",
  "iat": 1674371400,
  "exp": 1674457800
}
```

**Error Responses:**

1. **Invalid Credentials (401 Unauthorized)**
```
Unauthorized
```

2. **Missing Parameters (400 Bad Request)**
```
Bad Request
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123"
  }'
```

---

## 2. User Endpoints

### 2.1 Get Current User Profile (Protected)

**Endpoint:** `GET /api/user/me`

**Description:** Retrieve current authenticated user's profile information

**Authentication Required:** Yes (Bearer Token)

**Request Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:** None

**Success Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "USER",
  "createdAt": "2026-02-07T10:30:00"
}
```

**Error Responses:**

1. **Invalid Token (401 Unauthorized)**
```
Unauthorized
```

2. **Token Expired (401 Unauthorized)**
```
Unauthorized
```

3. **User Not Found (404 Not Found)**
```
Not Found
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/user/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

---

## 3. Authentication Scheme

### Bearer Token Format

All authenticated requests must include the JWT token in the `Authorization` header:

```
Authorization: Bearer <JWT_TOKEN>
```

**Example:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNjc0MzcxNDAwLCJleXAiOjE2NzQ0NTc4MDB9.7L5j3WkM8iKqJ7mK9pL2qO3rS4tU5vW6xY7zZ8aB1cD
```

### Token Properties

| Property | Value | Description |
|----------|-------|-------------|
| Algorithm | HS256 | HMAC SHA-256 |
| Expiration | 24 hours | 86400000 ms |
| Subject | Email | User's email address |
| Audience | N/A | Optional |
| Issuer | N/A | Not set |

---

## 4. HTTP Status Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 200 | OK | Successful request |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input, duplicate email |
| 401 | Unauthorized | Invalid/expired token, wrong credentials |
| 404 | Not Found | User doesn't exist |
| 500 | Server Error | Internal server error |

---

## 5. Testing Guide

### Prerequisites
1. MySQL server running with database `it342_quitayen_lab1`
2. Backend running on `http://localhost:8080`
3. Frontend running on `http://localhost:3000` (optional for API testing)
4. Postman, cURL, or another HTTP client

### Test Scenarios

#### Test 1: User Registration

**Steps:**
1. Open Postman or terminal
2. Send POST request to `/api/auth/register`
3. Include valid email, password, and fullName
4. Verify response is 201 Created
5. Check database for new user record

**Test Data:**
```json
{
  "email": "testuser@example.com",
  "password": "TestPassword123",
  "fullName": "Test User"
}
```

**Expected Result:**
- Status: 201 Created
- Response contains user with role "USER"
- User is stored in database with encrypted password

---

#### Test 2: Registration with Duplicate Email

**Steps:**
1. Register user from Test 1
2. Try to register same email again
3. Verify response is 400 Bad Request

**Test Data:**
```json
{
  "email": "testuser@example.com",
  "password": "DifferentPassword123",
  "fullName": "Another User"
}
```

**Expected Result:**
- Status: 400 Bad Request
- Error message: "Email already registered"

---

#### Test 3: User Login

**Steps:**
1. Register user (Test 1)
2. Send POST request to `/api/auth/login`
3. Include registered email and password
4. Verify response is 200 OK
5. Extract JWT token from response

**Test Data:**
```json
{
  "email": "testuser@example.com",
  "password": "TestPassword123"
}
```

**Expected Result:**
- Status: 200 OK
- Response includes JWT token
- Token can be decoded to show email as subject

---

#### Test 4: Login with Invalid Password

**Steps:**
1. Register user
2. Try to login with wrong password
3. Verify response is 401 Unauthorized

**Test Data:**
```json
{
  "email": "testuser@example.com",
  "password": "WrongPassword"
}
```

**Expected Result:**
- Status: 401 Unauthorized

---

#### Test 5: Get Current User (Protected)

**Steps:**
1. Login user (Test 3)
2. Copy JWT token from response
3. Send GET request to `/api/user/me`
4. Include token in Authorization header
5. Verify user data in response

**Request:**
```bash
curl -X GET http://localhost:8080/api/user/me \
  -H "Authorization: Bearer {TOKEN_FROM_LOGIN}"
```

**Expected Result:**
- Status: 200 OK
- Response includes user's email, fullName, role, createdAt
- Data matches registered user

---

#### Test 6: Access Protected Endpoint Without Token

**Steps:**
1. Send GET request to `/api/user/me`
2. Omit Authorization header
3. Verify response is 401 Unauthorized

**Request:**
```bash
curl -X GET http://localhost:8080/api/user/me
```

**Expected Result:**
- Status: 401 Unauthorized

---

#### Test 7: Access Protected Endpoint with Invalid Token

**Steps:**
1. Send GET request to `/api/user/me`
2. Include malformed token in header
3. Verify response is 401 Unauthorized

**Request:**
```bash
curl -X GET http://localhost:8080/api/user/me \
  -H "Authorization: Bearer invalid_token_here"
```

**Expected Result:**
- Status: 401 Unauthorized

---

### Frontend Testing Checklist

#### Register Page (`http://localhost:3000/register`)
- [ ] Form displays correctly
- [ ] Can enter email, password, fullName
- [ ] Submit button works
- [ ] Error message shows for duplicate email
- [ ] Redirects to login on success

#### Login Page (`http://localhost:3000/login`)
- [ ] Form displays correctly
- [ ] Can enter email and password
- [ ] Submit button works
- [ ] Error message shows for invalid credentials
- [ ] Redirects to dashboard on success

#### Dashboard Page (`http://localhost:3000/dashboard`)
- [ ] Protected route requires login
- [ ] Displays user information
- [ ] Shows profile details (email, fullName, role)
- [ ] Shows registration date
- [ ] Logout button works
- [ ] Redirects to login after logout

#### Authentication Flow
- [ ] Register → Redirects to login
- [ ] Login → Redirects to dashboard
- [ ] Logout → Redirects to login
- [ ] Direct access to /dashboard without login redirects to /login
- [ ] Token persists on page refresh
- [ ] Can navigate to dashboard after closing and reopening browser

---

### Database Testing

**Check User Table:**
```sql
SELECT * FROM users;
```

**Verify Password Encryption:**
```sql
SELECT id, email, password_hash, full_name, role, created_at FROM users WHERE email = 'testuser@example.com';
```

**Expected Result:**
- `password_hash` should be long encrypted BCrypt string
- `role` should be "USER"
- `created_at` should be recent timestamp

---

## 6. Common Issues & Troubleshooting

### Issue 1: CORS Error
**Error:** "Access to XMLHttpRequest blocked by CORS policy"

**Solution:**
- Ensure backend is running on port 8080
- Check SecurityConfig allows localhost:3000
- Verify request includes proper Content-Type header

---

### Issue 2: JWT Token Invalid
**Error:** "Cannot set user authentication: Cannot create a secure key from an empty key string"

**Solution:**
- Ensure `jwt.secret` is set in application.properties
- Restart backend after changing configuration
- Secret must be at least 32 characters for HS256

---

### Issue 3: Database Connection Failed
**Error:** "Access denied for user 'root'@'localhost' (using password: NO)"

**Solution:**
- Ensure MySQL is running
- Check database.url, username, password in application.properties
- Verify database `it342_quitayen_lab1` exists
- Create database if not exists: `CREATE DATABASE it342_quitayen_lab1;`

---

### Issue 4: Duplicate Email on Registration
**Error:** "Email already registered"

**Solution:**
- Use unique email for testing
- Or delete user from database: `DELETE FROM users WHERE email = 'test@example.com';`

---

## 7. Sample Test Credentials

```
Email: demo@example.com
Password: DemoPassword123
Full Name: Demo User
```

Register this user first, then use for testing login and protected endpoints.

---

**Document Version:** 1.0  
**Last Updated:** February 7, 2026
