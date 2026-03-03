# 🔗 Mini URL

A modern, full-stack URL shortener built with:

-   ⚡ Vite + React (Frontend)
-   🚀 Node.js + Express (Backend)
-   🐳 Docker (Containerized)
-   🌙 Dark Mode Support
-   📋 Copy-to-Clipboard
-   ☁️ Deployed on Render

------------------------------------------------------------------------

## 🌐 Live Demo

👉 https://mini-url-ibhe.onrender.com

------------------------------------------------------------------------

## ✨ Features

-   Shorten long URLs instantly
-   Clean modern UI
-   Dark / Light mode toggle
-   Copy shortened link with one click
-   Rate limiting protection
-   REST API support
-   Dockerized for easy deployment

------------------------------------------------------------------------

## 🛠 Tech Stack

### Frontend

-   React
-   TypeScript
-   Vite
-   Tailwind CSS

### Backend

-   Node.js
-   Express
-   TypeScript

### Deployment

-   Docker
-   Render

------------------------------------------------------------------------

## 📦 Project Structure

    mini-url/
    │
    ├── client/          # React frontend
    │   ├── public/
    │   ├── src/
    │   └── index.html
    │
    ├── server/          # Express backend
    │   ├── routes/
    │   ├── controllers/
    │   └── index.ts
    │
    ├── Dockerfile
    └── README.md

------------------------------------------------------------------------

## 🚀 Getting Started (Local Development)

### 1️⃣ Clone the repository

``` bash
git clone https://github.com/NKadam1996/mini-url.git
cd mini-url
```

------------------------------------------------------------------------

### 2️⃣ Install dependencies

#### Backend

``` bash
cd server
npm install
```

#### Frontend

``` bash
cd ../client
npm install
```

------------------------------------------------------------------------

### 3️⃣ Setup Environment Variables

Create a `.env` file in the `client` folder:

    VITE_API_BASE=http://localhost:5000

------------------------------------------------------------------------

### 4️⃣ Run Development Servers

#### Start backend

``` bash
cd server
npm run dev
```

#### Start frontend

``` bash
cd client
npm run dev
```

Frontend runs on:

    http://localhost:5173

Backend runs on:

    http://localhost:5000

------------------------------------------------------------------------

## 🐳 Docker Setup

To build and run using Docker:

``` bash
docker build -t mini-url .
docker run -p 5000:5000 mini-url
```

------------------------------------------------------------------------

## 📡 API Endpoints

### Shorten URL

**POST** `/api/shorten`

Request:

``` json
{
  "url": "https://www.example.com"
}
```

Response:

``` json
{
  "shortUrl": "abc123"
}
```

------------------------------------------------------------------------

### Redirect

**GET** `/:code`

Example:

    https://mini-url-ibhe.onrender.com/abc123

Redirects to the original URL.

------------------------------------------------------------------------

## 🔐 Security

-   URL validation
-   Rate limiting
-   Proper API error handling

------------------------------------------------------------------------

## 🧠 Future Improvements

-   Database persistence (MongoDB / PostgreSQL)
-   Custom shortcodes
-   QR code generation

------------------------------------------------------------------------

## 📄 License

MIT License

------------------------------------------------------------------------

## 👨‍💻 Author

Built by Nihar Kadam
