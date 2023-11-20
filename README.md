# Log Ingestor
A log ingestor and query interface system that can efficiently handle vast volumes of log data, and offer a simple interface for querying this data using full-text search or specific field filters.

## Setup locally:

### Requirements:
    - Go
    - npm
    - MongoDB

- clone this repo and cd into it

- start frontend:
```bash 
cd frontend
npm install
npm run dev
```

- start backend:
```bash
cd backend
go get -d ./...
go run main.go
```

- setup mongodb:
    - enter credentials in `backend/example.env` file and rename it to .env

## Tech Stack:
- Frontend: React.js with TypeScript, TailwindCSS, and Vite for bundling
- Backend: Go, mux for routing, and mongoDB for database

### API Endpoints:
- GET /logs: returns logs that match the specified filters
    - filters: an object that contains the filters to apply to the logs
    - example:
    - /logs?message=payment
    - /logs?level=error&message=payment&spanId=span

- POST /submitlog : adds a new log

## demo:
![demo](assets/demo.gif)

## I'll be hosting the frontend on Vercel, and for the backend I will do the following:
- Using linode or digitalocean, have a linux server, and install docker on it.
- Run a docker container with the backend code, and use nginx as a reverse proxy.
