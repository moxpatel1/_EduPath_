# EduPath MongoDB & Authentication API Documentation

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

This will install `bcryptjs` and all other required packages.

### 2. Start the Server
```bash
node backend/server.js
```

The server will run on `http://localhost:5000`

---

## Database Connection
- **MongoDB Cluster**: Connected to `acpc-cluster` on MongoDB Atlas
- **Database Name**: `acpc`
- **Connection Status**: Logs "MongoDB Connected" when successfully connected

---

## API Endpoints

### Base URL
```
http://localhost:5000/api/auth
```

---

## CRUD Operations

### 1. **SIGNUP (CREATE)** - Create New User
**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-03-18T10:30:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

**Validation Rules:**
- All fields are required
- Password must be at least 6 characters
- Email must be unique
- Password and passwordConfirm must match
- Email must be valid format

---

### 2. **LOGIN (READ & VERIFY)** - Authenticate User
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-03-18T10:30:00.000Z"
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 3. **GET ALL USERS** - Read All Users
**Endpoint:** `GET /api/auth/users`

**Response (Success - 200):**
```json
{
  "success": true,
  "count": 2,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-03-18T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "createdAt": "2026-03-18T11:00:00.000Z"
    }
  ]
}
```

---

### 4. **GET SINGLE USER** - Read Specific User
**Endpoint:** `GET /api/auth/user/:id`

**Example:** `GET /api/auth/user/507f1f77bcf86cd799439011`

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-03-18T10:30:00.000Z"
  }
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### 5. **UPDATE USER** - Update User Information
**Endpoint:** `PUT /api/auth/user/:id`

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "newemail@example.com"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "newemail@example.com",
    "createdAt": "2026-03-18T10:30:00.000Z"
  }
}
```

**Notes:**
- Email update checks for duplicates
- All validations are applied

---

### 6. **DELETE USER** - Delete User
**Endpoint:** `DELETE /api/auth/user/:id`

**Example:** `DELETE /api/auth/user/507f1f77bcf86cd799439011`

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-03-18T10:30:00.000Z"
  }
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

## Frontend Integration

### Signup Page (`signup.html`)
- Collects: name, email, password, passwordConfirm
- Sends to: `POST /api/auth/signup`
- On success: Redirects to login page
- Shows error/success messages

### Login Page (`login.html`)
- Collects: email, password
- Sends to: `POST /api/auth/login`
- Stores user info in `localStorage`
- On success: Redirects to index page
- Shows error/success messages

---

## Security Features

1. **Password Hashing**
   - Passwords are hashed using bcryptjs with salt rounds of 10
   - Passwords are never stored in plain text
   - Passwords are never returned in API responses

2. **Email Validation**
   - Email must match regex pattern
   - Email uniqueness is enforced at database level

3. **Input Validation**
   - All fields are validated before processing
   - Password confirmation is checked
   - Minimum length requirements enforced

---

## Testing the APIs

### Using cURL
```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","passwordConfirm":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get all users
curl http://localhost:5000/api/auth/users

# Get single user
curl http://localhost:5000/api/auth/user/[USER_ID]

# Update user
curl -X PUT http://localhost:5000/api/auth/user/[USER_ID] \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","email":"newemail@example.com"}'

# Delete user
curl -X DELETE http://localhost:5000/api/auth/user/[USER_ID]
```

### Using Postman
1. Create a new collection "EduPath API"
2. Create requests for each endpoint
3. Use the examples above as request bodies
4. Test each operation

---

## User Schema (MongoDB)

```javascript
{
  _id: ObjectId,
  name: String (required, trimmed),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min 6 chars),
  createdAt: Date (default: current timestamp)
}
```

---

## Error Handling

All errors return JSON format with:
- `success`: false
- `message`: Error description

**Common HTTP Status Codes:**
- `200` - Success (GET, POST login)
- `201` - Created (POST signup)
- `400` - Bad request (validation error)
- `401` - Unauthorized (invalid credentials)
- `404` - Not found (user doesn't exist)
- `500` - Server error

---

## Files Created/Modified

### New Files
- `backend/models/User.js` - Mongoose User schema
- `backend/routes/auth.js` - Authentication routes

### Modified Files
- `backend/server.js` - Added route imports and usage
- `signup.html` - Connected to API
- `login.html` - Connected to API
- `package.json` - Added bcryptjs dependency

---

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start server: `node backend/server.js`
3. ✅ Test signup at `http://localhost:3000/signup.html` (if serving frontend)
4. ✅ Test login at `http://localhost:3000/login.html`
5. (Optional) Add JWT tokens for session management
6. (Optional) Add email verification
7. (Optional) Add password reset functionality
