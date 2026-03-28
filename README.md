# Sistema de Gestión de Pedidos

This project is a solution for managing orders placed through an app and a website. It includes:
- REST API using Java + Spring Boot
- MongoDB database (Atlas)
- Web interface using React + Bootstrap
- Full CRUD functionality for users and orders
- Typeahead/autocomplete search with debounce
- Automatic documentation using Swagger/OpenAPI

## Tecnologías usadas

For the back end:
- Java 17
- Spring Boot
- Spring Web
- Spring Data MongoDB
- Lombok
- Swagger / OpenAPI (springdoc-openapi)

For the front end:
- React (Vite)
- React Router
- Bootstrap 5
- SCSS

For the DB:
- MongoDB Atlas

## Project Structure

### Internal Structure
<pre> 
SistemaPedidos/
│
├── backend/   (Spring Boot API)
└── frontend/  (React App)
</pre>

### Architecture and Best Practices Implemented

#### Backend (Spring Boot):
The backend follows a layered architecture that separates responsibilities:
- Controller Layer: exposes REST endpoints and receives HTTP requests.
- Service Layer: contains business logic and validations.
- Repository Layer: accesses data using Spring Data MongoDB.
- Model Layer: defines entities persisted in MongoDB.
This helps maintain decoupled, maintainable, and easily testable code.

Patterns applied:
- Repository Pattern (Spring Data MongoDB)
- Dependency Injection (Spring IoC Container)

#### Frontend (React)
The frontend follows a modular structure based on separation of concerns:
- `pages/`: main screens (List / Detail)
- `components/`: reusable components (modal, badge, buttons, typeahead)
- `services/`: communication layer with REST API (fetch)
- `styles/`: separate styles (SCSS)

Best practices applied:
- Component reuse (TypeaheadSearch, StatusBadge, BackButton)
- Separation of UI logic from API (services/)
- State management with useState and useEffect
- Responsive UI using Bootstrap (table-responsive)

### High-level diagram of the functionality:
<pre> 
      ┌──────────────────────────┐
      │ React App (Frontend)     │ 
      │ - Pages                  │ 
      │ - Components             │ 
      │ - Services (fetch)       │ 
      └─────────────┬────────────┘ 
                    │ HTTP (REST) 
                    ▼ 
      ┌──────────────────────────┐ 
      │ Spring Boot API Backend  │ 
      │ Controller Layer         │
      │ Service Layer            │ 
      │ Repository Layer         │ 
      │ Model Layer              │ 
      └─────────────┬────────────┘ 
                    │ Mongo Driver 
                    ▼ 
      ┌──────────────────────────┐ 
      │ MongoDB Atlas Database   │ 
      │ users collection         │ 
      │ orders collection        │ 
      └──────────────────────────┘  
</pre>

## Features

Users:
- Create user
- View users
- View user by ID
- Update user
- Delete user (This feature is only available for testing via Swagger or manually in MongoDB due to time constraints)

Orders:
- Create order
- View orders
- View order by ID
- Update order (address, status, items)
- Delete order
- Search orders by address (typeahead)

### Typeahead search functionality
On the order list screen, there is a search field that:
- Sends requests to the backend as the user types
- Displays suggestions in a dropdown menu
- Displays a message if no matches are found
- Filters orders based on the search text

### Main Endpoints
Users:
- `GET /users`
- `GET /users/{id}`
- `POST /users`
- `PUT /users/{id}`
- `DELETE /users/{id}`
Orders
- `GET /orders`
- `GET /orders/{id}`
- `POST /orders`
- `PUT /orders/{id}`
- `DELETE /orders/{id}`
- `GET /orders/search?query=...`

## How to Run Locally
### Backend 

Requirements:
- Java 17
- Maven
- MongoDB Atlas or local MongoDB

#### 1) Configure MongoDB
In the file `backend/src/main/resources/application.properties` configure your connection:
```
spring.data.mongodb.uri=EDIT_YOUR_MONGO_URI_HERE
spring.data.mongodb.database=sales_orders_db
```
Mongo Atlas example:
```
spring.data.mongodb.uri=mongodb+srv://admin:password@sistemapedidos.xxxxx.mongodb.net/?retryWrites=true&w=majority
spring.data.mongodb.database=sales_orders_db
```

#### 2) Run the backend
In the `backend/` folder:
```
mvn spring-boot:run
```
The backend will run at: `http://localhost:8080`

#### 3) Endpoint Health Check
You can verify that it is working by using the GET endpoint `http://localhost:8080/health`
Expected response:
```
OK
```

#### Swagger / OpenAPI
To test the endpoints directly from your browser:
- Swagger UI: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
For the JSON file describing the API:
- OpenAPI JSON: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

#### Test Data (Seed)
The backend includes a seeder (`DataSeeder`) that automatically creates users and orders the first time the project is started.
Note: It only runs if the `users` collection is empty.

### Frontend

Requirements:
- Node.js 18+

#### 1) Install dependencies
In the `frontend/` folder:
```
npm install
```

#### 2) Run the frontend
Run:
```
npm run dev
```
Frontend available at: [http://localhost:5173](http://localhost:5173)

### Frontend → Backend Connection
The frontend consumes the API at: [http://localhost:8080](http://localhost:8080)
The backend includes CORS configuration to allow requests from: [http://localhost:5173](http://localhost:5173)

## Deploy
Frontend: [https://sistema-de-gestion-de-pedidos.netlify.app/](https://sistema-de-gestion-de-pedidos.netlify.app/)
Backend Swagger: [https://sistema-de-gestion-de-pedidos-production.up.railway.app/swagger-ui/index.html](https://sistema-de-gestion-de-pedidos-production.up.railway.app/swagger-ui/index.html)


## Author
👩‍💻 Gabriela Martinez
LinkedIn: [gabriela-mtnez](https://www.linkedin.com/in/gabriela-mtnez/)
