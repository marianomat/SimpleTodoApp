# To-Do App with React.js & Laravel

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

## 🚀 Getting Started

To get the project up and running, you can choose one of the following methods:

### Docker

1. **Clone the repository:**

    ```bash
    git clone https://github.com/marianomat/SimpleTodoApp
    ```

2. **Navigate to the root directory:**

    ```bash
    cd SimpleTodoApp
    ```

3. **Run the following Docker Compose command to start the application:**

    ```bash
    docker-compose up
    ```

4. **After the containers are up and running, execute the migration command:**

    ```bash
    docker-compose exec backend php artisan migrate --seed
    ```

5. **Running backend tests:**

    ```
    docker-compose exec backend php artisan test
    ```

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
        php artisan migrate --seed
        ```

9.  **Run the server:**

        ```
        php artisan serve
        ```

10. **Running backend tests:**

    ```
    docker-compose exec backend php artisan test
    ```

11. ### Set up the frontend:

    Navigate to frontend folder SimpleTodoAppReact

        ```
        cd ..
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

## 💡 About Authentication

This application uses Laravel Sanctum with Single Page Application (SPA) mode and cookies for authentication. This means that both the frontend and backend projects need to be hosted on the same domain for authentication to work correctly.

### Why Same Domain?

Laravel Sanctum, when used in SPA mode with cookies, relies on the fact that the frontend and backend share the same domain. This allows the backend to set HTTP cookies with authentication tokens that the browser will include with each request. If the projects were on different domains, browsers would treat them as separate entities, preventing the cookies from being sent, and thus authentication would fail.

### Setting Up the Same Domain

Make sure that both the frontend and backend projects are hosted under the same domain. If you're using Docker, ensure that the containers are configured to use the same domain name. If you're setting up manually, configure your server and environment variables accordingly.

🤝 **Contributing**

If you would like to contribute to this project, please feel free to submit a pull request.

Please note that all code should be written in English and should follow the PSR-2 coding standard.

📝 **License**

This project is licensed under the MIT License.
