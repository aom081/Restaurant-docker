# Restaurant Docker Application - Server Setup Manual

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Initial Setup](#initial-setup)
4. [Database Configuration](#database-configuration)
5. [Server Configuration](#server-configuration)
6. [Running the Application](#running-the-application)
7. [API Endpoints](#api-endpoints)
8. [Troubleshooting](#troubleshooting)
9. [Development Workflow](#development-workflow)

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

## 🔄 Running the Application

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

For production deployment:
- Change default database credentials
- Use environment variables for secrets
- Enable HTTPS
- Implement authentication/authorization
- Set up proper CORS policies
- Use Docker secrets for sensitive data

---

**Last Updated**: July 2025
**Version**: 1.0
**Author**: Restaurant Docker Team
