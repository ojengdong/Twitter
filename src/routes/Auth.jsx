import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authService } from '../firebase';
import { createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        getAuth,
        GoogleAuthProvider,
        GithubAuthProvider,
        signInWithPopup } from 'firebase/auth';
import routers from "../components/Router"

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [newAccount, setNewAccount] = useState(true); // Account를 가지고 있는지 확인해서, newAccount가 필요한 경우 true
    const [error,setError] = useState("")
    const navigate = useNavigate()

    const onChange = (e) => {
        const {target: {name, value},} = e
        if(name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value)
        }
    }

    // createUserWithEmailAndPassword는 promise를 return 하기 때문에 async로 비동기화 시킴
    const onSubmit = async(e) => {
        // e.preventDefault(); : 기본행위가 실행되는 걸 원치않다
        e.preventDefault();
        try {
            let data;
            const auth = getAuth();
            console.log(auth)
            // newAccount의 상태에 따라서 받은 input을 submit의 method로 계정 생성에 쓸건지, 로그인제 쓸건지 조건을 주고 있다.
            if (newAccount) {
                // Creact Account
                data = await createUserWithEmailAndPassword(auth,email, password);
            } else {
                // Log in
                data = await signInWithEmailAndPassword(auth,email,password);
            }
            if (data.user != null) {
                navigate("/")
            }
            console.log(data)
        } catch (error) {
            setError(error.message)
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev); 
    const onSosialClick = async (e) => {
        const {
            currentTarget:{name},
            } = e;
        let provider; 
        const auth = getAuth();
        if(name === "google") {
            provider = new GoogleAuthProvider();
        }else if (name === "github"){
            provider = new GithubAuthProvider();
        }
        if(provider){
            const data = await signInWithPopup(auth,provider);
            console.log(data);
            console.log(name);
            navigate('/');
        }
    }

    return (
    <div>
        <form action="" onSubmit={onSubmit}>
            <input 
                name='email' 
                type="text" 
                placeholder='Email'
                required 
                value={email} 
                onChange={onChange} 
            />
            <input 
                name='password' 
                type="password" 
                placeholder='Password' 
                required 
                value={password}
                autoComplete='off'
                onChange={onChange} 
            />
            <input 
                type="submit" 
                value={newAccount ? "Create Account" : "Log In"} 
            />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
        <div>
            <button onClick={onSosialClick} name='google'>
                Continue with Google
            </button>
            <button onClick={onSosialClick} name='github'>
                Continue with Github
            </button>
        </div>
    </div>
    )
}

export default Auth;

