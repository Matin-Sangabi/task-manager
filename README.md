# Node.js Interview Project

## English Documentation

### Overview
This is a Node.js backend application that provides authentication and task management functionality.

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with the following variables:
```
PORT=3001
DB_URL=your_mongodb_connection_string
COOKIE_PARSER=your_cookie_secret
```

### API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/user` - Get user information (requires authentication)

#### Tasks
- Task management endpoints (requires authentication)
- `POST /api/v1/tasks` - create a new task
- `GET /api/v1/tasks` - get all tasks
- `GET /api/v1/tasks/:id` - Get task information 
- `PUT /api/v1/tasks/:id` - Update task information 
- `DELETE /api/v1/tasks/:id` - Delete task  

### Running the Application
```bash
npm start
```