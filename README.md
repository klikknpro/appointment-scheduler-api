# Appointment scheduler microservice

## School project

This school project is an appointment scheduler microservice, using Node.js, Express.

- [About the project](#about-the-project)
- [Features of version 1.0.0](#features-of-version-1.0.0)
- [Setup requirements](#setup-requirements)
- [How to start](#how-to-start)
- [Main technologies and services](#main-technologies-and-services)

## About the project

Clients can book 30 minute long appointments. The service will check for colliding appointment times and alert the client. Successful bookings will be stored in local MongoDB.

## Features of version 1.0.0

- basic CRUD operations
- the client must include only the very minimal amount of data
  - start time, and/or booked appointment ID (from MongoDB)
  - commenting is optional
- descriptive error messages
  - plus error handler middleware
- basic testing

## Setup requirements

- Terminal
- Visual Studio Code
- Insomnia, Postman
- Node.js
- Mongo DB

## How to start

1. Clone the repository and open with Visual Studio Code

2. Using the terminal:

```
cd backend
npm install
cd ..
```

3. Create an .env file at the backend root

- fill out with your own data or ask permission from the developer

```
PORT=8080
APP_URL=http://localhost:3000
CONNECTION_STRING=
```

4. Start the localhost

```
cd backend
npm run dev
(<!-- using nodemon in development -->)
```

## Main technologies and services

### Back-end

Node.js, Express \
MongoDB, Mongoose \
Jest \
Morgan \
