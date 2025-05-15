# Todo App

A comprehensive Todo application built with **Next.js** and modern web technologies, featuring a REST API for managing tasks and user authentication.

## Getting Started

Follow these steps to set up and run the application locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/abdullahsajid/todo-app.git
   cd todo-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set Environment Variables:**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_BACKEND_BASE_URL=<Your Backend API Base URL>
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Access the Application:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

This application is designed to be deployed on **Vercel** for optimized performance.

1. Link your GitHub repository to Vercel.
2. Set the environment variables in the Vercel dashboard.
3. Deploy the app and access it via the generated URL.

## API Documentation

The application uses a REST API for all backend operations. Below are the key endpoints and their descriptions:

### Base URL
```
<Your Backend API Base URL>
```

### Authentication
- **Sign Up**: `POST /auth/signup`
  ```json
  {
    "username": "example",
    "password": "example123"
  }
  ```
- **Login**: `POST /auth/login`
  ```json
  {
    "username": "example",
    "password": "example123"
  }
  ```

### Todos
- **Get Todos**: `GET /todos`
  - Requires `Authorization` header with a Bearer token.
- **Create Todo**: `POST /todos`
  ```json
  {
    "title": "New Task",
    "completed": false
  }
  ```
- **Update Todo**: `PUT /todos/:id`
  ```json
  {
    "title": "Updated Task",
    "completed": true
  }
  ```
- **Delete Todo**: `DELETE /todos/:id`

## Features

- **Task Management:** Add, edit, and delete tasks.
- **Authentication:** User login and signup functionality.
- **Responsive Design:** Optimized for various devices.
- **Environment Configurations:** Secure and flexible environment variable management.
