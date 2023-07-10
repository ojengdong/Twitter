import React from 'react'
import { useState } from 'react'
import { authService } from '../firebase';
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    getAuth } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (e) => {
        const {target: {name, value},
    } = e
        if(name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = async(e) => {
        // e.preventDefault(); : 기본행위가 실행되는 걸 원치않다
        e.preventDefault();
        try {
            let data;
            const auth = getAuth();
            console.log(auth)
            if (newAccount) {
                // Creact Account
                data = await createUserWithEmailAndPassword(auth,email, password);
            } else {
                // Log in
                data = await signInWithEmailAndPassword(auth,email,password);
            }
            console.log(data)
        } catch (error) {
            console.log(error)
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
                onChange={onChange} 
            />
            <input 
                type="submit" 
                value={newAccount ? "Create Account" : "Log In"} 
            />
        </form>
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    </div>
    )
}

export default Auth;

