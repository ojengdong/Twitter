import React, { useEffect } from "react";
import { authService, dbService } from "../firebase";
// getDocs : 문서 여러개 가져온다.
import { collection, addDoc, serverTimestamp, getDocs   } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [nweet, setNweet] = useState("");
  // 기본값을 비어있는 array로 함
  const [nweets,setNweets] = useState([]);

  const getNweets = async() => {
    const dbNweets = await getDocs(collection(dbService,"nweets"));
    dbNweets.forEach((doc) => {
      const newObject = {
        // doc.data() : 데이터를 가지고 와서 풀어내는것 
        ...doc.data(),
        id : doc.id,
      };
      setNweets((prev) => [newObject,...prev])
    })
  }

  useEffect(() => {
    getNweets();
  }, [])

  useEffect(() => {
    if (auth.currentUser == null) {
      navigate("/auth");
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // .add : data가 들어감 즉 명시된 데이터를 담은 새로운document을 collection 추가 document ID 를 자동으로 부여하면서
    // dbService.collection("nweets") 이 부분을 사용해서 파이어베이스의 "nweets" 컬렉션에 접근한다
    // dbService.collection("nweets").addDoc()를 호출하여 새로운 문서를 해당 컬렉션에 추가하고
    // 자동으로 생성된 ID를 사용하게 된다.
    // addDoc()메소드의 전달되는 파이어베이스에 저장되는 데이터를 포함한다. 
    // createdAt은 코드 실행 시점의 타임스탬프로, 타임스탬프 값이 데이터에 추가 된다.
      // 이렇게 입력한 텍스트와 작성된 시간을 함께 파이어베이스에 저장할 수 있다.
      // setNweet("")를 호출하여 입력 필드를 초기화 하고 이렇게 하면 다음 nweet을 작성할 때
      // 빈 문자열로 시작하게 된다.
      
    await addDoc(collection(dbService, "nweets"), {
      nweet,
      createdAt: serverTimestamp(),
    });
    setNweet("");
  };

  const onChange = (event) => {
    // event 안에 있는 target안에 있는 value를 달라고 하는것
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  console.log(nweets );

  return (
    <div>
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
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
