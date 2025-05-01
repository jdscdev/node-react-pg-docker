# Node + React + PostgreSQL + Docker App

## Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/jdscdev/node-react-pg-docker-app
cd node-react-pg-docker-app
```

2. **Start the project**
```bash
docker-compose up --build

# To remove Docker containers and volumes
docker-compose down -v --remove-orphans 
```

3. **Visit the app**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/products

4. **Test the project**
```bash
cd frontend
npm test src/tests

cd ../backend
jest tests
```

## CRUD Endpoints
- `GET /api/products` – Get all products
- `POST /api/products` – Create a product `{ name, price }`
- `PUT /api/products/:id` – Update a product `{ name, price }`
- `DELETE /api/products/:id` – Delete a product


**Debug / Run servers**
```bash
cd backend
node server.js

cd ../frontend
npm start
```

## Notes
- The backend connects to PostgreSQL using environment variables from Docker Compose.
- The frontend makes requests to the backend using the browser's localhost. Consider using a proxy setup in development or configuring nginx for production.
