Notenrechner Documentation

Overview

The Notenrechner project is a web application designed to manage and calculate grades. The app allows users (e.g., students, teachers) to input, view, and analyze grades across subjects and semesters. The app consists of:

A frontend built with Next.js for the user interface.

A backend built with NestJS for API services and database interactions.

A MySQL database for storing grades, users, subjects, and semesters.

Features

Grade Management: Add, view, update, and delete grades.

User Profiles: View user information.

Subject and Semester Filters: Filter grades by subject or semester.

Analytics: Calculate average grades and view grade distributions.

Application Structure

Folder Structure

Notenrechner/
├── notenrechner/               # Frontend (Next.js)
│   ├── app/                   # Application logic (if applicable)
│   ├── components/            # Reusable React components (e.g., Navbar, Sidebar)
│   ├── lib/                   # Optional library or custom hooks
│   ├── public/                # Static assets (e.g., logo.png)
│   ├── utils/                 # Utility files for API services
│   │   ├── api.ts             # Axios configuration for API calls
│   │   ├── gradesService.ts   # API logic for grades
│   │   ├── usersService.ts    # API logic for users
│   ├── next.config.mjs        # Next.js configuration
│   ├── package.json           # Frontend dependencies and scripts
│   └── tsconfig.json          # TypeScript configuration
│
├── notenrechner-backend/      # Backend (NestJS)
│   ├── src/                   # Source code
│   │   ├── grades/            # Grades module (controller, service, entity)
│   │   ├── users/             # Users module
│   │   ├── app.module.ts      # Main module
│   │   ├── main.ts            # Entry point
│   ├── package.json           # Backend dependencies and scripts
│   ├── ormconfig.json         # Database configuration
│   └── tsconfig.json          # TypeScript configuration
│
├── setup.sql                  # SQL file for initializing the database
└── README.md                  # Project description

Key Directories and Files

Frontend (notenrechner/):

components/: Contains reusable React components.

Example: Navbar.tsx for navigation, Sidebar.tsx for app navigation.

utils/: Contains API service files.

api.ts: Centralized Axios instance.

gradesService.ts: API calls related to grades.

usersService.ts: API calls related to users.

public/: Static assets, such as logos or images.

next.config.mjs: Configuration for Next.js.

Backend (notenrechner-backend/):

src/: Main source code for the backend.

grades/: Contains the controller, service, and entity for grades.

grades.controller.ts: Handles API endpoints for grades.

grades.service.ts: Contains business logic for grades.

grade.entity.ts: Defines the database schema for grades.

users/: Contains the controller, service, and entity for users.

Similar structure to grades/.

app.module.ts: Root module that imports all other modules.

main.ts: Entry point to bootstrap the NestJS app.

ormconfig.json: Configuration for the MySQL database connection.

package.json: Dependencies and scripts for the backend.

Database (setup.sql):

Contains SQL statements to initialize the database with tables for grades, users, subjects, and semesters.

Key Functionalities

Grades Management

Add Grades:

API Endpoint: POST /grades

Frontend Form: Users input subject, grade, semester, and user ID.

View Grades:

API Endpoint: GET /grades/:userId

Frontend Component: Displays a list of grades for a specific user.

Edit Grades:

API Endpoint: PUT /grades/:id

Frontend: A form to update grade details.

Delete Grades:

API Endpoint: DELETE /grades/:id

Frontend: Delete button to remove a grade.

User Profiles

View User:

API Endpoint: GET /users/:userId

Frontend Component: Displays user profile information.

Add User (Admin Feature):

API Endpoint: POST /users

Filters and Analytics

Filter Grades by Subject or Semester:

API Endpoint: GET /grades/:userId?subject=math&semester=winter

Calculate Average Grade:

API Endpoint: GET /grades/:userId/average

Backend calculates the average of all grades for a user.

Installation and Setup

Prerequisites

Node.js and npm

MySQL database

Steps

Clone the repository:

git clone https://github.com/your-repo/notenrechner.git

Install dependencies for the frontend:

cd notenrechner
npm install

Install dependencies for the backend:

cd notenrechner-backend
npm install

Set up the database:

Create a MySQL database named grade_notebook.

Run the SQL script in setup.sql to create tables.

Configure environment variables:

Frontend: Create a .env.local file in the notenrechner directory:

NEXT_PUBLIC_API_URL=http://localhost:3001

Backend: Create a .env file in the notenrechner-backend directory:

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=grade_notebook

Start the backend:

cd notenrechner-backend
npm run start:dev

Start the frontend:

cd notenrechner
npm run dev

Open the app in your browser:

Frontend: http://localhost:3000

Backend: http://localhost:3001

Future Improvements

Authentication: Add user login/logout functionality using JWT.

Visual Analytics: Use Chart.js or similar libraries for grade distribution charts.

Export Data: Allow users to export grades as PDF or Excel.

Deployment: Deploy the app using platforms like Vercel (frontend) and Heroku or AWS (backend).

Conclusion

This documentation provides an overview of the Notenrechner project, its structure, and its functionalities. Follow the installation steps to set up the app locally and start managing grades efficiently. If you encounter any issues, feel free to reach out or consult the code comments for further guidance.