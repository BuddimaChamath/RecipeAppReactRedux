# Recipe Tracker Project

A full-stack application for managing and tracking recipes, built with **React**, **Redux**, **Node.js**, **Express**, and **MongoDB**.

---

## Features

- Add, edit, view, and delete recipes.
- Manage recipes with ingredients and descriptions.
- Search and sort recipes for better usability.
- Responsive user interface with Bootstrap for styling.




### Installation

1. Clone the repository:
   
   git clone https://github.com/your-username/recipe-tracker-project.git
   cd recipe-tracker-project

2. Install dependencies for the backend:
    
    cd backend
    npm install

3. Install dependencies for the frontend:

    cd ../frontend
    npm install

4. Go back to the root directory:

    cd ..
    npm install

# Environment Variables
# Create a .env file in the backend directory with the following content:

    MONGO_URI=<your_mongodb_connection_string>
    PORT=5000
    NODE_ENV=development

Replace <your_mongodb_connection_string> with your MongoDB Atlas URI or local connection string.

# Running the Application
1. From the root directory, start both the frontend and backend concurrently:

    npm start

2. Access the application:

    Frontend: http://localhost:3000
    Backend: http://localhost:5000

# Folder Structure

    recipe-tracker-project/
    ├── backend/
    │   ├── models/
    │   │   └── Recipe.js
    │   ├── routes/
    │   │   └── recipes.js
    │   ├── .env
    │   ├── server.js
    │   ├── package.json
    │   └── .gitignore
    ├── frontend/
    │   ├── public/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── store/
    │   │   ├── App.js
    │   │   └── index.js
    │   ├── package.json
    │   └── .gitignore
    ├── node_modules/
    ├── package.json
    └── README.md

# Scripts
In the root directory:
    npm start: Runs both the backend and frontend concurrently.

In the backend directory:
    npm run dev: Starts the backend server with live reload using nodemon.

In the frontend directory:
    npm start: Starts the React development server.