# Admixer Project

## Introduction

This project is a client-side application for interacting with the Admixer API. Due to CORS restrictions on the API, a proxy server is used to forward requests from the client to the API and add the necessary CORS headers to the response.

## Requirements

- Node.js
- Angular

## Setup

1. **Install dependencies:**

   Navigate to the project directory and run:

   ```
   npm install
   ```

2. **Start the proxy server:**

   Navigate to the proxy server directory and run:

   ```
   node server.js
   ```

   The proxy server will start on `http://localhost:3000`.

3. **Start the client-side application:**

   Navigate to the client-side application directory and run:

   ```
   ng serve
   ```

   The client-side application will start on `http://localhost:4200`.

## Usage

Once the proxy server and client-side application are running, you can access the client-side application in your web browser at `http://localhost:4200`.

The client-side application will send requests to the proxy server, which will forward them to the Admixer API and add the necessary CORS headers to the response.

## Notes

- This setup is suitable for development and testing purposes only. In a production environment, the server should be configured to add the necessary CORS headers to the response.

