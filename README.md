#Simple Nodejs CRUD API with express and JWT authentication

This is a simple Nodejs REST API using Express,Mongodb,and JWT authentication.The application performs basic user  CRUD
(Create,Read,Update,Delete) operations and is secured with JWT-based authentication

## API EndPoints

| route | method | operation |
| ----------| -------|--------| 
| /api/users/ |post | register a user
| /api/users/|  get | get all users |
| /api/users/:id | get |get a user(requires a valid JWT for access) |
| /api/users/:id | put | update a user(requires a valid JWT for access)  |
| /api/users/:id | delete | delete a user(requires a valid JWT for access)  |
| /auth/signin/ | post | user login |

## Prerequisites
 -[Nodejs](https://nodejs.org/en/download/package-manager) installed <br/>
 -[Mongodb](https://www.mongodb.com/docs/manual/installation/) installed and running locally or on a cloud service like Mongodb Atlas<br/>
 -[Postman] or [curl] to test the API

 ## Getting started

 ### 1. clone the repository 

 ```bash
 git clone https://github.com/servenn/MERN-CRUD-JWT.git
 cd your-repository
 ```

### 2.  Install dependencies
```bash
    npm install
```
### 3 . Set Up enviroment variables
create a .env file in the root directory and add the following variables
```bash
#Mongodb connection string
mongoUri: mongodb://localhost:27017/your-database-name
#JWT secret-key
jwt_secret = you-jwt-secret-key
#port number
PORT = 5000
```
### 4. Start the server.The API will be running at http//:localhost:3000

```bash
npm run dev
```
