import React, { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./Router";
import { authService } from "../firebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // onAuthStateChanged : 상태가 바뀔때 감지
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        const uid = user.uid
      }else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []) 
  
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      
      <footer>&copy; {new Date().getFullYear()}Nwitter</footer>
    </>
  );
}

export default App;
