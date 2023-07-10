import React, { useState } from "react";
import "./App.css";
import AppRouter from "./Router";
import { authService } from "../firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()}Nwitter</footer>
    </div>
  );
}

export default App;
