import React, { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./Router";
import { authService } from "../firebase";

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      }else {
        setIsLoggedIn(false);
      }
      setInit(true)
    })
    console.log(isLoggedIn)
  },[])
  
  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..." }
      
      <footer>&copy; {new Date().getFullYear()}Nwitter</footer>
    </div>
  );
}

export default App;
