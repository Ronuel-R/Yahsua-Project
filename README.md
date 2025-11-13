"# Yahsua-Project" 
Backend

1. go to taskAPI
2. create virtual environment
3. activate virtual environment
4. install the requirements.txt
5. run development

Frontend

1. go to TaskFE
2. use npm install
3. Run Development

Tasks API

1. Retrieve All Tasks

Endpoint: GET /tasks/
Description: Retrieve all tasks, newest first.
Request Body: None
Response: List of task objects including id, title, description, completed status, and created_at timestamp.

2. Create a New Task

Endpoint: POST /tasks/
Description: Create a new task.
Request Body: Provide title and optional description.
Response: Returns the created task object with id, title, description, completed status (default false), and created_at.

3. Retrieve Task Details

Endpoint: GET /tasks/{id}/
Description: Retrieve details of a specific task by ID.
Request Body: None
Response: Task object with id, title, description, completed status, and created_at.

4. Update All Fields of a Task

Endpoint: PUT /tasks/{id}/
Description: Update all fields of a task.
Request Body: Provide title, description, and completed status.
Response: Returns the updated task object.

5. Update One or More Fields of a Task

Endpoint: PATCH /tasks/{id}/
Description: Update one or more fields of a task.
Request Body: Provide the fields to update (e.g., completed).
Response: Returns the updated task object.

6. Delete a Task

Endpoint: DELETE /tasks/{id}/
Description: Delete a specific task by ID.
Request Body: None
Response: Status code 204 No Content