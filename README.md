# Microtron Website

React + Vite frontend with a Node/Express API for quote and enquiry management.

## Setup

1. Install dependencies:
   `npm install`
2. Run the frontend locally:
   `npm run dev`
3. Build the frontend for production:
   `npm run build`
4. Start the backend API:
   `npm start`

## Environment

Create a `.env` file from `.env.example` and set:

- `MONGODB_URI` for the MongoDB connection string
- `PORT` for the API port on Render or locally
- `VITE_API_BASE_URL` in the frontend deployment so the app points at the API
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` for outgoing email
- `MAIL_TO` for the inbox that receives quote and contact notifications

## Notes

- Quote requests and contact enquiries are stored in MongoDB when `VITE_API_BASE_URL` is set.
- Each submission sends a branded confirmation email to the customer and a full details email to `MAIL_TO`.
- If the API base URL is not configured, the frontend falls back to local storage for development.
- The backend serves the built `dist/` folder when it exists, so a single Render web service can host both the API and the SPA.
