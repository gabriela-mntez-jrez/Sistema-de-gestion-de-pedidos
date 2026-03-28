# Sistema de Gestión de Pedidos
Este proyecto es una solución para gestión de pedidos realizados desde una aplicación y sitio web. Incluye:
- API REST con Java + Spring Boot
- Base de datos MongoDB (Atlas)
- Interfaz web con React + Bootstrap
- CRUD completo de usuarios y pedidos
- Búsqueda typeahead/autocompletado con debounce
- Documentación automática con Swagger/OpenAPI

## Tecnologías usadas

Para el back-end:
- Java 17
- Spring Boot
- Spring Web
- Spring Data MongoDB
- Lombok
- Swagger / OpenAPI (springdoc-openapi)

Para el front-end:
- React (Vite)
- React Router
- Bootstrap 5
- SCSS

Para la BD:
- MongoDB Atlas

## Estructura del proyecto

### Estructura interna
<pre> 
SistemaPedidos/
│
├── backend/   (Spring Boot API)
└── frontend/  (React App)
</pre>


### Arquitectura y buenas prácticas implementadas

#### Backend (Spring Boot):
El backend sigue una arquitectura en capas (Layered Architecture) separando responsabilidades:
- Controller Layer: expone endpoints REST y recibe requests HTTP.
- Service Layer: contiene la lógica de negocio y validaciones.
- Repository Layer: acceso a datos usando Spring Data MongoDB.
- Model Layer: definición de entidades persistidas en MongoDB.
Esto ayuda a mantener un código desacoplado, mantenible y fácil de testear.

Patrones aplicados:
- Repository Pattern (Spring Data MongoDB)
- Dependency Injection (Spring IoC Container)

#### Frontend (React)
El frontend sigue una estructura modular basada en separación por responsabilidad:
- pages/: pantallas principales (List / Detail)
- components/: componentes reutilizables (modal, badge, botones, typeahead)
- services/: capa de comunicación con API REST (fetch)
- styles/: estilos separados (SCSS)

Buenas prácticas aplicadas:
- Reutilización de componentes (TypeaheadSearch, StatusBadge, BackButton)
- Separación lógica UI vs API (services/)
- Manejo de estados con useState y useEffect
- UI responsive usando Bootstrap (table-responsive)

### Diagrama de alto nivel de la funcionalidad:
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


## Autor
👩‍💻 Gabriela Martinez
LinkedIn: [gabriela-mtnez](https://www.linkedin.com/in/gabriela-mtnez/)
