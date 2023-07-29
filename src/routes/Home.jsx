import React, { useEffect } from "react";
import { authService } from "../firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [nweet, setNweet] = useState("");

  useEffect(() => {
    if (auth.currentUser == null) {
      navigate("/auth");
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (event) => {
    // event 안에 있는 target안에 있는 value를 달라고 하는것
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <form action="" onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="submit" value="Nweet" />
    </form>
  );
};

export default Home;
