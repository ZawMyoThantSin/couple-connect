Couples Relationship Web App

Overview

This project is a web-based relationship management app for couples, providing a private digital space to enhance communication, intimacy, and relationship tracking. It includes features like chat, shared memories, reminders, love challenges, and more.

Tech Stack

Frontend:

Angular – Component-based framework for a dynamic user interface.

Tailwind CSS – Utility-first styling for a modern and responsive UI.

Flowbite – Prebuilt UI components for rapid development.

Lucide Icons – Beautiful, customizable icons for better UI experience.

Backend:

Spring Boot – Robust backend for handling API requests.

Spring Security – Secure authentication and authorization.

OAuth 2.0 & JWT – Secure user authentication and token-based access control.

MySQL – Relational database to store user data and interactions.

Features

Secure Authentication: OAuth and JWT-based login system.

Private Chat & Media Sharing: Encrypted chat for couples to share texts, images, and voice notes.

Shared Timeline & Memories: A digital scrapbook for saving relationship moments.

Special Day Reminders: Automatic tracking of anniversaries and events.

Love Challenges & Quizzes: Fun activities to strengthen relationships.

Collaborative To-Do Lists: A shared space for planning tasks.

Real-time Status Updates: Partners can update their mood and activities.

Virtual Pet or Love Meter: A fun interactive feature to keep engagement high.

Custom Themes & UI Customization: Light/dark mode and personalizations.

Installation & Setup

Backend (Spring Boot)

Clone the repository:

git clone https://github.com/your-repo/couples-app.git
cd couples-app-backend

Configure application.properties for database connection:

spring.datasource.url=jdbc:mysql://localhost:3306/couples_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.security.oauth2.client.registration.google.client-id=your_client_id
spring.security.oauth2.client.registration.google.client-secret=your_client_secret
jwt.secret=your_jwt_secret

Build and run the application:

mvn clean install
mvn spring-boot:run

Frontend (Angular)

Navigate to the frontend directory:

cd couples-app-frontend

Install dependencies:

npm install

Run the Angular application:

ng serve

API Endpoints

Method

Endpoint

Description

POST

/api/auth/register

Register a new user

POST

/api/auth/login

User login (JWT)

GET

/api/user/profile

Get user profile

GET

/api/relationship

Fetch relationship data

POST

/api/chat/send

Send a message

GET

/api/chat/history

Get chat history


Contributors

[Zaw Myo Thant Sin](https://github.com/zawmyothantsin) - Lead Developer

Happy coding! 🚀
