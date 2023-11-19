A log ingestor system that can efficiently handle vast volumes of log data, and offer a simple interface for querying this data using full-text search or specific field filters.


## Setup locally:

### Requirements:

    - Go
    - npm
    - MongoDB

- clone this repo and cd into it

- start frontend:
```bash 
cd frontend
npm run dev
```

- start backend:
```bash
cd backend
go run main.go
```
<!-- 
Tech used:
- Frontend: 
    - React.js with TypeScript
        - React Router, React hook form
    - Tailwindcss
    - Vite
    - Axios

- Backend:
    - Go
    - Gorilla Mux
    - MongoDB for database -->

## System Design:
### Frontend:
- React.js with TypeScript, React Router, React hook form, Axios, Vite
- TailwindCSS for styling

### Backend:
- Go: blazing fast, simple, and efficient language for creating web servers.
- Gorilla Mux: URL router and dispatcher for matching incoming requests to their respective handler.
- MongoDB: NoSQL Database for storing log data.

