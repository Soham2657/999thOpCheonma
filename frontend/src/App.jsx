/*
PURPOSE:
Main wrapper component of the frontend.
This file mainly renders the routing system (AppRoutes).
*/

import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      {/* AppRoutes contains all pages and route definitions */}
      <AppRoutes />
    </>
  );
}