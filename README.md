# Appointment scheduler REST API microservice

## School project

This school project is an appointment scheduler microservice with REST endpoints, developed using Node.js, Express.

- [About the project](#about-the-project)
- [Features of version 1.0.0](#features-of-version-1.0.0)
- [Setup requirements](#setup-requirements)
- [How to start](#how-to-start)
- [Endpoints](#endpoints)
- [Main technologies and services](#main-technologies-and-services)

## About the project

Clients can book 30 minute long appointments. The service will check for colliding appointments and alert the client. Successful bookings will be stored in MongoDB.

## Features of version 1.0.0

- basic CRUD operations
- the client must include only the very minimal amount of data
  - start time, and/or booked appointment ID (from MongoDB)
  - commenting is optional
- fitting error messages
  - plus error handler middleware
- smoke test

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
PORT={your choice, ie: 8080}
APP_URL={your front-end url, ie: http://localhost:3000}
CONNECTION_STRING={your Mongo database}
```

4. Start the localhost

```
cd backend
npm run dev
(<!-- using nodemon in development -->)
```

## Endpoints

### GET to _api/appointments/?page=_

Each page lists 10 appointments.

```
JSON body:
{
	"date":	"2022-07-19"
}
```

#### _response:_

Will be an array of appointment objects.

```
[
	{
		"_id": "12345",
		"date": "2022-07-19",
		"startTime": "2022-07-19T06:00:00.000Z",
		"endTime": "2022-07-19T06:30:00.000Z",
		"comment": "quick beard trim",
		"__v": 0
	},
  ...
]
```

### GET to _api/appointments/:appointmentID_

#### _response.data:_

Will return that one appointment

```
{
  "date": "2022-07-19",
  "startTime": "2022-07-19T06:00:00.000Z",
  "endTime": "2022-07-19T06:30:00.000Z",
  "comment": "quick beard trim",
  "_id": "12345",
  "__v": 0
}
```

### POST to _api/appointments_

```
JSON body:
{
	"start": "2022-07-19T08:00",
	"comment": "quick beard trim"
}
```

#### _response.data:_

Will return the created appointment

```
{
  "date": "2022-07-19",
  "startTime": "2022-07-19T06:00:00.000Z",
  "endTime": "2022-07-19T06:30:00.000Z",
  "comment": "quick beard trim",
  "_id": "12345",
  "__v": 0
}
```

### PATCH to _api/appointments/:appointmentID_

```
JSON body:
{
	"start": "2022-07-19T09:00",
	"comment": "beard and hair cut, too"
}
```

#### _response.data:_

Will return the modified appointment

```
{
  "date": "2022-07-19",
  "startTime": "2022-07-19T07:00:00.000Z",
  "endTime": "2022-07-19T07:30:00.000Z",
  "comment": "beard and hair cut, too"
  "_id": "12345",
  "__v": 0
}
```

### DELETE to _api/appointments/:appointmentID_

#### _response.data:_

Will return the deleted appointment

```
{
  "date": "2022-07-19",
  "startTime": "2022-07-19T06:00:00.000Z",
  "endTime": "2022-07-19T06:30:00.000Z",
  "comment": "quick beard trim",
  "_id": "12345",
  "__v": 0
}
```

## Main technologies and services

### Back-end

Node.js, Express \
MongoDB, Mongoose \
Jest \
Morgan
