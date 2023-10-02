# To-Do App with React.js & Laravel 🔥

## Description

This repository contains a simple To-Do application built using React.js for the frontend and Laravel 10 for the backend. The app allows users to register, log in, create, list, update, and delete to-dos.

## Requirements

-   Create a simple registration and login page for a user in frontend.
-   When a user is authenticated:
    -   The user should be able to create a to-do.
    -   The user should be able to list to-dos.
    -   The user should be able to update a to-do.
    -   The user should be able to delete a to-do.

## Stack Info

-   Frontend: React.js
-   Backend: Laravel 10
-   Database: Mysql

---

## 🚀 Getting Started

To get the project up and running, you can choose one of the following methods:

### Docker

1. **Clone the repository:**

    ```
    git clone https://github.com/marianomat/SimpleTodoApp
    ```

2. **Navigate to the root directory:**

    ```
    cd SimpleTodoApp
    ```

3. **Run the following Docker Compose command to start the application:**

    ```
    docker-compose up -d
    ```

4. **After the containers are up and running, execute the migration command:**

    ```
    docker container exec  simpletodoapp-backend php artisan migrate:fresh --seed
    ```

    Warning: if you get a connection refured, maybe the containers are still not ready, wait a few seconds and try again.

5. **Running backend tests:**

    ```
    docker container exec  simpletodoapp-backend php artisan test
    ```

6. **Try the application!!**

    - Frontend: http://localhost:5173

    _User credentials for testing:_

    - email: user@user.com
    - password: password

### Without Docker Method

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/marianomat/SimpleTodoApp
    ```

2.  **Navigate to the root directory:**

    ```bash
    cd SimpleTodoApp
    ```

3.  ### **Set up the backend:**

    Navigate to backend folder SimpleTodoAPI

    ```
    cd SimpleTodoAPI
    ```

4.  **Install the dependencies:**

    ```
    composer install
    ```

5.  **Create a .env file:**
    Copy the .env.example file and rename it to .env

    ```
    cp .env.example .env
    ```

6.  **Generate key**

    ```
    php artisan key:generate
    ```

7.  **Set up the database:**

    Create a database and set the database credentials in the .env file.

8.  **Run the migration command:**
    You should have the db running at this point

    ```
    php artisan migrate:fresh --seed
    ```

9.  **Running backend tests:**

    ```
    php artisan test
    ```

10. **Run the server:**

    ```
    php artisan serve
    ```

11. ### Set up the frontend:

    Open a new console in root folder (SimpleTodoApp) and navigate to frontend folder SimpleTodoAppReact

    ```
    cd SimpleTodoAppReact
    ```

12. **Install the dependencies:**

    ```
    npm install
    ```

13. **Run the server:**

    ```
    npm run dev
    ```

14. **Try the application!!**

    -   Frontend: http://localhost:5173

    _User credentials for testing:_

    email: user@user.com
    password: password

---

## Using Postman for API Testing

You can use [Postman](https://www.postman.com/) to test the API endpoints. I have provided a collection with pre-configured requests to make it easier for you.

-   [**Fork the Postman Collection**](https://www.postman.com/marianopereyra95/workspace/simpletodoapp/collection/9578844-d734fe92-44cd-4812-a0ba-fd221aaba124?action=share&creator=9578844&active-environment=9578844-cebaa4d7-7010-4aae-84c8-3f0fe1290071)

This collection contains requests for various API endpoints, including creating, listing, updating, and deleting to-dos.

### Instructions:

1. Click on the link above to fork the Postman collection into your own workspace.

2. Open Postman and import the collection.

3. In the collection, select the appropriate request and set the necessary parameters.

4. The collection includes an integrated script that automatically requests and sets the CSRF token before each request. You don't need to do anything manually.

5. Send the request to interact with the API.

**Note:** Make sure your local server is running while testing the API with Postman.

---

## API Documentation with Scribe

This project utilizes [Scribe](https://github.com/knuckleswtf/scribe) for automatic API documentation generation in Laravel.

### Accessing Documentation

To access the API documentation, simply visit [http://localhost:8000/docs](http://localhost:8000/docs) after running your Laravel application.

---

## 💡 About Authentication

This application uses Laravel Sanctum with Single Page Application (SPA) mode and cookies for authentication. This means that both the frontend and backend projects need to be hosted on the same domain for authentication to work correctly.

### Why Same Domain?

Laravel Sanctum, when used in SPA mode with cookies, relies on the fact that the frontend and backend share the same domain. This allows the backend to set HTTP cookies with authentication tokens that the browser will include with each request. If the projects were on different domains, browsers would treat them as separate entities, preventing the cookies from being sent, and thus authentication would fail.

### Why cookies?

Sanctum uses Laravel's built-in cookie based session authentication services. This approach to authentication provides the benefits of CSRF protection, session authentication, as well as protects against leakage of the authentication credentials via XSS.

### Setting Up the Same Domain

Make sure that both the frontend and backend projects are hosted under the same domain. If you're using Docker, ensure that the containers are configured to use the same domain name. If you're setting up manually, configure your server and environment variables accordingly.

---

🤝 **Contributing**

If you would like to contribute to this project, please feel free to submit a pull request.

Please note that all code should be written in English and should follow the PSR-2 coding standard.

📝 **License**

This project is licensed under the MIT License.
