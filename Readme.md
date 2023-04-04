# Project Name

A brief description of the project.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [Technologies Used](#technologies-used)
-   [Contributing](#contributing)
-   [License](#license)

## Installation

1. Clone the repository.
2. Install dependencies by running `npm install`.
3. Set up the environment variables in `.env` file.
4. Start the server by running `npm start`.

## Usage

A brief description of how to use the application.

## API Endpoints

### <span style="background-color: #fff;color:blue;padding:5px">Register User</span>

Registers a new user with the provided name, email, and password.

-   **URL:** `/api/users`
-   **Method:** `POST`
-   **Request Body:**

```
{
"name": "John Doe",
"email": "johndoe@example.com",
"password": "password123"
}
```

-   **Success Response:**

-   **Status Code:** `201 Created`
-   **Response Body:**

    ```
    {
      "_id": "614ba82f6d267eb1a816f1e2",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGJhODJmNmQyNjdlYjFhODE2ZjFlMiIsImlhdCI6MTYzMjMzODM0NCwiZXhwIjoxNjM1OTczMzQ0fQ.SVhrtJLEpbykRVvyBZ97dU6ZTHwBYZzLPv0a17RpWcQ"
    }
    ```

-   **Error Response:**

-   **Status Code:** `400 Bad Request`
-   **Response Body:** `Please fill in all fields`

-   **Status Code:** `409 Conflict`
-   **Response Body:** `User already exists`

### <span style="background-color: #fff;color:blue;padding:5px">Login User</span>

Authenticates a user with the provided email and password.

-   **URL:** `/api/users/login`
-   **Method:** `POST`
-   **Request Body:**

```
{
"email": "johndoe@example.com",
"password": "password123"
}
```

-   **Success Response:**

-   **Status Code:** `200 OK`
-   **Response Body:**

    ```
    {
      "_id": "614ba82f6d267eb1a816f1e2",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGJhODJmNmQyNjdlYjFhODE2ZjFlMiIsImlhdCI6MTYzMjMzODM0NCwiZXhwIjoxNjM1OTczMzQ0fQ.SVhrtJLEpbykRVvyBZ97dU6ZTHwBYZzLPv0a17RpWcQ"
    }
    ```

-   **Error Response:**

-   **Status Code:** `401 Unauthorized`
-   **Response Body:** `Invalid email or password`

## Technologies Used

-   Node.js
-   Express
-   bcryptjs
-   jsonwebtoken
-   mongoose

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
