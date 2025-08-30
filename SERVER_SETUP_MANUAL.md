# Restaurant Docker Application - Server Setup Manual

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Initial Setup](#initial-setup)
4. [Database Configuration](#database-configuration)
5. [Server Configuration](#server-configuration)
6. [JWT Authentication System](#jwt-authentication-system)
7. [Running the Application](#running-the-application)
8. [API Endpoints](#api-endpoints)
9. [Troubleshooting](#troubleshooting)
10. [Development Workflow](#development-workflow)

## 🔧 Prerequisites

Before starting, ensure you have the following installed:

- **Docker Desktop** (version 4.0+)
- **Docker Compose** (version 2.0+)
- **Git** (for version control)
- **Code Editor** (VS Code recommended)

### Verify Installation
```bash
docker --version
docker-compose --version
```

## 🏗️ Project Overview

This is a full-stack restaurant management application with:

### Backend Stack:
- **Node.js** with Express.js
- **PostgreSQL** database
- **Sequelize** ORM
- **Docker** containerization

### Project Structure:
```
Restaurant-docker/
├── docker-compose.yml          # Docker services configuration
├── server/                     # Backend application
│   ├── Dockerfile.server       # Server container setup
│   ├── index.js                # Main server entry point
│   ├── package.json            # Node.js dependencies
│   ├── config/
│   │   └── db.config.js        # Database configuration
│   ├── controllers/
│   │   └── restaurant.controller.js  # Business logic
│   ├── models/
│   │   ├── db.js               # Database connection
│   │   └── restaurant.model.js # Restaurant data model
│   └── routers/
│       └── restaurant.router.js # API routes
├── client/                     # Frontend application
└── README.md
```

## 🚀 Initial Setup

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Restaurant-docker
```

### Step 2: Environment Setup
The application uses environment variables defined in `docker-compose.yml`:

```yaml
environment:
  - DATABASE_URL=postgresql://postgres:postgres@db:5432/app_db
  - HOST=db
  - USER=postgres
  - PASSWORD=postgres
  - DB=app_db
  - DB_PORT=5432
  - SERVER_PORT=5000
```

### Step 3: Review Docker Configuration
Ensure your `docker-compose.yml` is properly configured:

```yaml
services:
  server:
    build:
      context: ./server
      dockerfile: Dockerfile.server
    ports:
      - "5000:5000"
    volumes:
      - "./server:/app"
      - "/app/node_modules"
    command: nodemon --legacy-watch index.js
    depends_on:
      - db
  
  db:
    image: postgres:16
    restart: always
    ports:
      - "5433:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=app_db
```

## 🗃️ Database Configuration

### Database Details:
- **Type**: PostgreSQL 16
- **Host**: `db` (internal Docker network) / `localhost:5433` (external access)
- **Database**: `app_db`
- **Username**: `postgres`
- **Password**: `postgres`

### Database Schema:
The `restaurants` table will be automatically created with:
```sql
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  imageUrl VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

## ⚙️ Server Configuration

### Key Server Files:

#### 1. `server/index.js` - Main Server File
```javascript
import express from "express";
import cors from "cors";
import restaurantRouter from "./routers/restaurant.router.js";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for client communication
app.use(cors({
  origin: ["http://localhost:5173", "127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/restaurants", restaurantRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
```

#### 2. `server/models/restaurant.model.js` - Data Model
```javascript
import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Restaurant = sequelize.define("restaurant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
```

## � JWT Authentication System

This application implements a comprehensive JWT (JSON Web Token) authentication system with secure user registration and login functionality.

### Authentication Architecture

#### Backend Components:
- **JWT Tokens**: Signed with secret key, 24-hour expiration
- **Password Security**: bcrypt hashing with salt rounds (8)
- **Role-Based Access**: User, Moderator, Admin roles
- **Database Models**: User-Role many-to-many relationship

#### Frontend Components:
- **React Context**: Global authentication state management
- **Token Storage**: localStorage with automatic retrieval
- **HTTP Interceptor**: Auto-attaches tokens to API requests
- **Protected Routes**: Route-level access control

### Authentication Endpoints

#### User Registration
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success):**
```json
{
  "message": "User registered successfully"
}
```

#### User Login
```http
POST /api/v1/auth/signin
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securePassword123"
}
```

**Response (Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "authorities": ["ROLES_USER"],
  "userInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
  }
}
```

### How to Use Authentication

#### 1. User Registration Process
1. **Navigate to Registration**:
   ```
   http://localhost:5173/register
   ```

2. **Fill Registration Form**:
   - Username (unique identifier)
   - Full Name
   - Email Address
   - Password

3. **Submit Form**:
   - Click "Register" button
   - System validates input and creates user
   - Automatic redirect to login page on success

#### 2. User Login Process
1. **Navigate to Login**:
   ```
   http://localhost:5173/login
   ```

2. **Enter Credentials**:
   - Username
   - Password

3. **Authentication Flow**:
   - Click "Login" button
   - System verifies credentials
   - JWT token generated and stored
   - Redirect to home page
   - NavBar shows user avatar with logout option

#### 3. Protected Resource Access
Once logged in, users can:
- View and manage restaurants
- Access user profile
- Perform role-based actions
- API requests automatically include JWT token

#### 4. Logout Process
1. **Click User Avatar** in NavBar
2. **Select "Logout"** from dropdown
3. **Token Cleared** from localStorage
4. **Redirect** to login page

### Security Features

#### Password Security:
- **Hashing**: bcrypt with salt rounds (8)
- **Validation**: Server-side input validation
- **No Plain Text**: Passwords never stored in plain text

#### JWT Token Security:
- **Signed Tokens**: Cryptographically signed with secret
- **Expiration**: 24-hour automatic expiration
- **Header Transmission**: Sent as `x-access-token` header
- **Stateless**: No server-side session storage

#### Role-Based Access Control:
- **Default Role**: New users assigned "user" role
- **Role Hierarchy**: User → Moderator → Admin
- **Authority Format**: "ROLES_USER", "ROLES_ADMIN", etc.
- **Extensible**: Easy to add new roles and permissions

### Environment Configuration

#### Server Environment Variables (.env):
```bash
# JWT Configuration
JWT_SECRET=your-super-secure-secret-key-here

# Database Configuration  
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=restaurant_db
```

#### Client Environment Variables (.env):
```bash
# API Configuration
VITE_BASE_URL="http://localhost:5000/api/v1"
VITE_AUTH_API="/auth"
VITE_RESTO_API="/restaurants"
```

### Authentication State Management

#### React Context Structure:
```javascript
// AuthContext provides:
{
  user: {
    name: "John Doe",
    email: "john@example.com", 
    username: "johndoe",
    token: "eyJhbGciOiJIUzI1NiIs...",
    authorities: ["ROLES_USER"]
  },
  login: (userData) => void,
  logout: () => void,
  isAuthenticated: boolean
}
```

#### Component Usage:
```jsx
import { useAuthContext } from '../context/AuthContext';

const MyComponent = () => {
  const { user, logout } = useAuthContext();
  
  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};
```

### Authentication Flow Diagram

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Register  │───▶│   Database   │───▶│   Login     │
│   /register │    │   User       │    │   /login    │
└─────────────┘    │   Created    │    └─────────────┘
                   └──────────────┘           │
                                              ▼
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Home      │◀───│   JWT Token  │◀───│   Auth      │
│   /         │    │   Generated  │    │   Success   │
└─────────────┘    └──────────────┘    └─────────────┘
```

### Common Authentication Errors

#### Registration Issues:
- **Username Exists**: "Username is already existed"
- **Missing Fields**: "Please provide all required fields"
- **Solution**: Use unique username and fill all fields

#### Login Issues:
- **User Not Found**: "User not found!"
- **Invalid Password**: "Invalid password"
- **Solution**: Verify credentials or register new account

#### Token Issues:
- **Expired Token**: Automatic redirect to login
- **Invalid Token**: Server returns 401 Unauthorized
- **Solution**: Re-login to refresh token

### Testing Authentication

#### Manual Testing:
1. **Start Application**:
   ```bash
   docker-compose up --build
   ```

2. **Test Registration**:
   - Visit: http://localhost:5173/register
   - Create test user
   - Verify redirect to login

3. **Test Login**:
   - Use registered credentials
   - Verify token in localStorage
   - Check NavBar user avatar

4. **Test Protected Routes**:
   - Navigate through application
   - Verify API calls include token
   - Test logout functionality

#### API Testing with curl:
```bash
# Register User
curl -X POST http://localhost:5000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","name":"Test User","email":"test@example.com","password":"password123"}'

# Login User  
curl -X POST http://localhost:5000/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Access Protected Route (with token)
curl -X GET http://localhost:5000/api/v1/restaurants \
  -H "x-access-token: YOUR_JWT_TOKEN_HERE"
```

## �🔄 Running the Application

### Step 1: Build and Start Services
```bash
# Navigate to project directory
cd Restaurant-docker

# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### Step 2: Verify Services are Running
```bash
# Check running containers
docker-compose ps

# Expected output:
# NAME                         STATUS          PORTS
# restaurant-docker-server-1   Up             0.0.0.0:5000->5000/tcp
# restaurant-docker-client-1   Up             0.0.0.0:5173->5173/tcp
# restaurant-docker-db-1       Up             0.0.0.0:5433->5432/tcp
```

### Step 3: Check Server Logs
```bash
# View server logs
docker-compose logs server

# Expected successful output:
# server-1 | Listening to http://localhost:5000
# server-1 | Connection has been etablished successfully
# server-1 | Table created or already exists 555
```

### Step 4: Test API Endpoints
```bash
# Test GET all restaurants
curl -X GET "http://localhost:5000/api/v1/restaurants"
# Expected: []

# Test server health
curl -X GET "http://localhost:5000/"
# Expected: "Restaurant Restful API"
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api/v1/restaurants`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/` | Get all restaurants | None |
| GET | `/:id` | Get restaurant by ID | None |
| POST | `/` | Create new restaurant | `{name, type, imageUrl}` |
| PUT | `/:id` | Update restaurant | `{name, type, imageUrl}` |
| DELETE | `/:id` | Delete restaurant | None |

### Example API Calls:

#### Create Restaurant:
```bash
curl -X POST "http://localhost:5000/api/v1/restaurants" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pizza Palace",
    "type": "Italian",
    "imageUrl": "https://example.com/pizza.jpg"
  }'
```

#### Get All Restaurants:
```bash
curl -X GET "http://localhost:5000/api/v1/restaurants"
```

#### Update Restaurant:
```bash
curl -X PUT "http://localhost:5000/api/v1/restaurants/1" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Pizza Palace",
    "type": "Italian",
    "imageUrl": "https://example.com/new-pizza.jpg"
  }'
```

## 🐛 Troubleshooting

### Common Issues and Solutions:

#### 1. Server Not Starting
**Error**: `Container exits immediately`
```bash
# Check server logs
docker-compose logs server

# Common fixes:
# - Check syntax errors in server files
# - Verify package.json dependencies
# - Rebuild containers
docker-compose down
docker-compose up --build
```

#### 2. Database Connection Failed
**Error**: `connect ECONNREFUSED`
```bash
# Check database status
docker-compose logs db

# Ensure database is ready before server starts
# Add healthcheck or wait script if needed
```

#### 3. Port Already in Use
**Error**: `Port 5000 is already allocated`
```bash
# Find process using port
netstat -ano | findstr :5000

# Kill process or change port in docker-compose.yml
```

#### 4. CORS Issues
**Error**: `Access-Control-Allow-Origin`
```javascript
// Verify CORS configuration in server/index.js
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
```

### Debugging Commands:

```bash
# View all container logs
docker-compose logs

# View specific service logs
docker-compose logs server
docker-compose logs db

# Access container shell
docker-compose exec server sh
docker-compose exec db psql -U postgres -d app_db

# Restart specific service
docker-compose restart server

# Rebuild specific service
docker-compose up --build server
```

## 🔄 Development Workflow

### Daily Development:
1. **Start Services**: `docker-compose up`
2. **Make Changes**: Edit files in `server/` directory
3. **Auto-reload**: Nodemon automatically restarts server
4. **Test API**: Use curl or Postman
5. **Check Logs**: `docker-compose logs server`

### Code Changes:
- Server files auto-reload with nodemon
- No rebuild needed for code changes
- Database persists data in Docker volume

### Adding New Features:
1. **Create new routes** in `server/routers/`
2. **Add controllers** in `server/controllers/`
3. **Update models** in `server/models/`
4. **Test endpoints** with API client

### Production Deployment:
1. Remove volume mounts from docker-compose.yml
2. Set NODE_ENV=production
3. Use specific Docker image tags
4. Configure proper database credentials
5. Set up reverse proxy (nginx)

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize ORM Docs](https://sequelize.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Compose Reference](https://docs.docker.com/compose/)

## 🔐 Security Notes

### Authentication Security (Implemented)
This application now includes a complete JWT authentication system with:
- ✅ **User Registration & Login**: Secure signup/signin flow
- ✅ **Password Hashing**: bcrypt with salt rounds (8)
- ✅ **JWT Tokens**: Cryptographically signed, 24-hour expiration
- ✅ **Role-Based Access**: User, Moderator, Admin roles
- ✅ **Token Management**: Automatic header injection via interceptors
- ✅ **Protected Routes**: Frontend route protection
- ✅ **Session Management**: localStorage with context state

### Additional Production Recommendations
For enhanced production security:
- Change default database credentials
- Use strong JWT secrets (32+ characters)
- Enable HTTPS with SSL certificates
- Implement rate limiting for auth endpoints
- Add email verification for registration
- Set up proper CORS policies
- Use Docker secrets for sensitive data
- Enable API request logging
- Implement token refresh mechanism
- Add password complexity requirements

### Environment Security Checklist
- [ ] JWT_SECRET is cryptographically secure
- [ ] Database passwords are unique and complex
- [ ] API endpoints have proper validation
- [ ] CORS is configured for production domains
- [ ] HTTPS is enabled in production
- [ ] Sensitive data uses environment variables
- [ ] Docker images are regularly updated
- [ ] Security headers are implemented

---

**Last Updated**: July 2025
**Version**: 1.0
**Author**: Restaurant Docker Team
