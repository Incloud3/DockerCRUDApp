# DockerCRUDApp

## 1. Frontend:

### index.html
- **Purpose**: Main landing page for CRUD application.
- **Features**: 
  - Contains a form to input user details (Name, Age, Student ID, Email).
  - Table to display all the users from the database.
  - Buttons for Add, Update, and Delete actions.

### script.js
- **Purpose**: Contains all the JavaScript functions for CRUD operations.
- **Features**: 
  - `validateForm()`: Validates form inputs before submission.
  - `fetchAndDisplayData()`: Fetches and displays data from the database.
  - `addData()`: Adds new data to the database.
  - `deleteData()`: Deletes specific data from the database.
  - `updateData()`: Updates specific data in the database.
  - `populateFormForEdit()`: Fills in the form with data for editing.
  - `revertFromEditMode()`: Reverts form from edit mode to normal.
  - `cancelEdit()`: Resets the form and reverts to normal mode.

### style.css
- **Purpose**: Contains some custom styles for the frontend.

## 2. Backend:

### save.php
- **Purpose**: Saves new data to the database.
- **Features**: Connects to the database and inserts new user details.

### fetch_data.php
- **Purpose**: Fetches all user data from the database.
- **Features**: Connects to the database, retrieves all records, and returns them in JSON format.

### update.php
- **Purpose**: Updates specific user data in the database.
- **Features**: Connects to the database and updates user details based on row selection.

### delete.php
- **Purpose**: Deletes specific user data from the database.
- **Features**: Connects to the database and deletes a user record based on selected row.

## 3. Docker:

### Dockerfile
- **Purpose**: Describes the Docker image for the frontend and backend.
- **Features**: 
  - Uses the PHP with Apache image.
  - Copies frontend and backend files into the Docker container.
  - For backend, installs the mysqli extension for PHP.

### docker-compose.yml
- **Purpose**: Helps in defining and running multi-container Docker applications.
- **Features**: 
  - Defines services for frontend, backend, database, and phpmyadmin.
  - Sets up volumes and ports.

## Overview:
The application is a basic CRUD web application. The frontend is written in HTML, CSS, and JavaScript, while the backend uses PHP to interact with a MySQL database.

The frontend provides a form for users to input their details. These details can be added to the database, retrieved and displayed, updated, or deleted. Each operation corresponds to a specific PHP script in the backend.

Docker is used to containerize the application.
