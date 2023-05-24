# API Documentation

This API provides endpoints for authentication, user progress data, and user posts.

## Authentication

- `POST /register` - Register a new user.
- `POST /login` - User login.

## User Progress Data

- `GET /getAllData` - Get all progress data.
- `GET /:userId/getProgressData` - Get progress data for a specific user.
- `POST /:userId/progressData` - Post progress data for a specific user.

## User Posts

- `GET /:userId/getPost` - Get a specific post for a user.
- `GET /userPost` - Get all user posts.
- `POST /:userId/userPost` - Create a new user post.
- `DELETE /post/:postId` - Delete a specific post.
- `PUT /post/:postId` - Edit a specific post.

## Models

### UserModel

Fields:

- `username` (String, required) - The username of the user.
- `password` (String, required) - The password of the user.
- `email` (String, required) - The email of the user.

### PostModel

Fields:

- `title` (String, required) - The title of the post.
- `content` (String, required) - The content of the post.

### ProgressDataModel

Fields:

- `smoked` (Number) - The number of times smoked.

## Error Handling

- 404 Not Found - When a resource is not found.
- 500 Internal Server Error - When an unexpected error occurs.

