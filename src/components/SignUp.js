import React, { useEffect, useState } from "react";
import '../styles/Auth.scss';
// import { Link } from 'react-router-dom';

const USERS = 'http://localhost:3001/api/v1/users';

const SignUp = (props) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState('');

    useEffect(() => {
        const checkBox = document.querySelector('.checkBox');
        if(checkBox.checked){
          checkBox.checked = false;
        }
        if(localStorage.getItem('user')){
            props.history.push('/')
        }
      }, [props]) // Component Did Mount

    async function handleSignUp(e){
        e.preventDefault();
        if(error !== '') setError('');
        const reqObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user:{
                username: username,
                password: password,
                name: name,
                email: email
            }})
        }
        await fetch(USERS, reqObj)
                .then(resp => resp.json())
                .then(data => {
                    if(data.error) setError(data.error);
                    setUsername('');
                    setPassword('');
                    setName('');
                    setEmail('');
                });
    }

    function leadSignInPage(e){
        props.history.push('/signin');
    }

    return (
        <div>
            <div className="errorMessage-auth">{error}</div>
            <form className="addItemForm" onSubmit={handleSignUp}>
                <div className="segment divInForm">
                    <h1 className="auth-title">Sign Up</h1>
                </div>
                <label className="inputLabel">
                    <input className="userInput" type="text" name="username" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label className="inputLabel">
                    <input className="userInput" type="password" name="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label className="inputLabel">
                    <input className="userInput" type="text" name="name" value={name} placeholder="name" onChange={(e) => setName(e.target.value)}/>
                </label>
                <label className="inputLabel">
                    <input className="userInput" type="text" name="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <button className="red submitBtn" type="submit">Sign Up</button>
                <div className="manualFromOpenBtn" onClick={(e) => leadSignInPage(e)}>Already a member?</div>
            </form>
        </div>
    )
}
export default SignUp;


