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

Orders:
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
The backend will run at: [http://localhost:8080](http://localhost:8080)

#### 3) Endpoint Health Check
You can verify that it is working by using the GET endpoint [http://localhost:8080/health](http://localhost:8080/health)

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
- The frontend consumes the API at: [http://localhost:8080](http://localhost:8080)
- The backend includes CORS configuration to allow requests from: [http://localhost:5173](http://localhost:5173)

### Demo

<details>
  <summary>Screenshots</summary>
Screen 1: Order List
<img width="1913" height="837" alt="image" src="https://github.com/user-attachments/assets/d3f7d549-42fb-4dce-892d-69e55b77726b" />

Screen 2: Order Details
<img width="1917" height="839" alt="image" src="https://github.com/user-attachments/assets/b2656268-e19a-4657-8dd5-b2fc091a0e05" />

*Workflow 1: User creation*

1.1 User creation editor
<img width="1919" height="835" alt="image" src="https://github.com/user-attachments/assets/519ffd62-ba03-4903-9d13-b2b3e132cc61" />

1.2 User created alert
<img width="1919" height="919" alt="image" src="https://github.com/user-attachments/assets/4e43dda1-e09c-4ca7-a3d5-4914ada1df25" />

*Workflow 2: Create Order*

2.1 Order Creation Editor
<img width="1918" height="835" alt="image" src="https://github.com/user-attachments/assets/fcf54424-3705-4a8a-a5c5-f811bacf3cf4" />

2.2 New order added
<img width="1919" height="839" alt="image" src="https://github.com/user-attachments/assets/8154d7e1-27d6-4665-80cf-370a133cec1e" />

*Workflow 3: Delete Order*

3.1 Are you sure you want to delete this order? Warning
<img width="1917" height="872" alt="image" src="https://github.com/user-attachments/assets/7620eb43-c6ce-421c-9ac3-33a3ef825535" />

3.2 Order deleted
<img width="1918" height="837" alt="image" src="https://github.com/user-attachments/assets/076d597b-546a-4d3c-a09b-539ee7fa03f3" />

*Workflow 4: Order editing*

4.1 Editing order
<img width="1913" height="837" alt="image" src="https://github.com/user-attachments/assets/c8e6c394-f7fc-4780-b92f-288b7c67964f" />

4.2 Order edited
<img width="1916" height="838" alt="image" src="https://github.com/user-attachments/assets/318d666a-ece3-4f6c-a7fc-59279e8d9560" />

*Workflow 5: Search for order*

5.1 Enter search term
<img width="1914" height="835" alt="image" src="https://github.com/user-attachments/assets/23af111c-827e-4c35-9cbc-b8eeed6829e2" />

5.2 Match selected
<img width="1912" height="833" alt="image" src="https://github.com/user-attachments/assets/cbfa7c88-c1e1-4bbe-a83e-7b76ce30755e" />

5.3 No matches
<img width="1912" height="834" alt="image" src="https://github.com/user-attachments/assets/7ee23724-7484-434c-bba8-bb5466db5e2e" />

5.4 Clear filter
<img width="1912" height="836" alt="image" src="https://github.com/user-attachments/assets/c362ae12-08aa-4371-84a5-b1f2fb23dc6a" />


</details>

<details>
  <summary>Videos</summary>
*Workflow 1: User creation*

https://github.com/user-attachments/assets/d7e5cdca-5b46-49e9-918f-07f65ffe8fef

*Workflow 2: Create Order*

https://github.com/user-attachments/assets/e5fd314f-9e64-424d-94df-ab58ddd72f3f

https://github.com/user-attachments/assets/84a15820-1b0d-4767-aa0e-0279987b99e9

*Worklow 3: View and Edit Order*

https://github.com/user-attachments/assets/11095e05-dea5-419b-b170-20a604d14a96

https://github.com/user-attachments/assets/021c790c-78f6-420c-97c6-8dd2a5ae49e2

https://github.com/user-attachments/assets/45f87c57-bb2d-485a-874c-42a6d65eedf1

*Workflow 4: Delete Order*

https://github.com/user-attachments/assets/73e4d58a-471a-4f84-be79-284abadcf669

*Workflow 5: Search for order*

https://github.com/user-attachments/assets/d0faa191-e836-4367-b480-328539b5345f


</details>

## Deploy

- Frontend: [Netlify](https://sistema-de-gestion-de-pedidos.netlify.app/)
- Backend Swagger: [Railway](https://sistema-de-gestion-de-pedidos-production.up.railway.app/swagger-ui/index.html)

## Author
👩‍💻 Gabriela Martinez
LinkedIn: [gabriela-mtnez](https://www.linkedin.com/in/gabriela-mtnez/)
