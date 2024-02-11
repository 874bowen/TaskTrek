# TaskTrek - Task Management System (Backend)

🚀 Welcome to TaskTrek - your task management solution!

TaskTrek is a Flask-based backend for managing tasks in your projects. It provides APIs to create, update, and delete tasks, manage users, and much more.

## Features

- **Task Management**: Create, read, update, and delete tasks.
- **User Management**: Manage users, authentication, and authorization.
- **RESTful APIs**: Well-structured APIs for easy integration with frontend applications.

## Getting Started

To get started with TaskTrek, follow these steps:

### Prerequisites

- Python 3.x installed on your system.
- pip package manager.

### Installation

1. Clone the TaskTrek repository to your local machine:

    ```bash
    git clone https://github.com/874bowen/TaskTrek.git
    ```

2. Navigate to the project directory:

    ```bash
    cd server
    ```

3. Create a virtual environment (optional but recommended):

    ```bash
    python3 -m venv venv
    ```

4. Activate the virtual environment:

    - On Windows:

    ```bash
    venv\Scripts\activate
    ```

    - On macOS and Linux:

    ```bash
    source venv/bin/activate
    ```

5. Install dependencies from the `requirements.txt` file:

    ```bash
    pip install -r requirements.txt
    ```

### Usage
0. Create a table named `task_trek` using your mysql

1. Create a `.env` file in root directory and paste and update the following

    ```bash
    DBUSER = your-root
    DBPASS = your-password
    DBHOST = localhost
    DBPORT = 3306
    DBNAME = task_trek
    ```

2. Run migrations 

    ```bash
    flask db init            # Initialize migrations
    flask db migrate -m "Initial migration"  # Generate initial migration
    flask db upgrade   # Apply initial migration
    ```

3. Start the Flask server:

    ```bash
    python app.py
    ```

4. The server will start running at `http://localhost:5000`.

### API Documentation

Document the TaskTrek APIs by describing the endpoints and providing examples of usage in API.md file in the server folder. Below are sample requests:


#### GET Request

- Endpoint: `/api/tasks`
- Description: Retrieves all tasks.
- Example:

    ```json
    GET http://localhost:5000/api/tasks
    ```

#### POST Request

- Endpoint: `/api/tasks`
- Description: Creates a new task.
- Example:

    ```json
    POST http://localhost:5000/api/tasks
    Content-Type: application/json

    {
        "title": "Task Title",
        "description": "Task Description"
    }
    ```

#### PUT Request

- Endpoint: `/api/tasks/<task_id>`
- Description: Updates an existing task.
- Example:

    ```json
    PUT http://localhost:5000/api/tasks/1
    Content-Type: application/json

    {
        "title": "Updated Task Title",
        "description": "Updated Task Description"
    }
    ```
## Contributing

We welcome contributions to TaskTrek! If you find any bugs or have suggestions for new features, please open an issue on GitHub or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

👨‍💻 Happy task managing with TaskTrek! If you have any questions or need further assistance, feel free to reach out to us.
