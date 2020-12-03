import React, { useEffect, useState } from "react";
import API from '../services/Api.js';
import '../styles/Auth.scss';

const Verification = (props) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    useEffect(() => {
        const checkBox = document.querySelector('.checkBox');
        if(checkBox.checked){
          checkBox.checked = false;
        }
        if(!props.updateClicked && !props.deleteClicked){
            props.history.push('/');
        }
      }, [props])

    function handleVerify(e){
        e.preventDefault();
        API.handleVerify(username, password)
        .then(data => {
            if(data.error){
                setError(data.error);
            } else {
                if(data.user.username === props.user.user.username){
                    setUsername('');
                    setPassword('');
                    props.setVerified(true);
                    props.history.push('/account');
                } else {
                    setError('Invalid Username or Password');
                }
            }
        })
    }

    function handleGoBack(){
        props.setUpdateClicked(false);
        props.setDeleteClicked(false);
        props.history.push('/account');
    }

    return (
        <div className="sign-in-wrapper">
            <div className="errorMessage-auth">{error}</div>
            <form className="addItemForm" onSubmit={handleVerify}>
                <div className="segment divInForm">
                    <h1 className="verify-title">Please, Verify It's you</h1>
                </div>
                <label className="inputLabel">
                    <input className="userInput" type="text" name="username" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label className="inputLabel">
                    <input className="userInput" type="password" name="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button className="red submitBtn" type="submit">Verify</button>
            </form>
            <div className="updateProToggleBtn" onClick={(e) => handleGoBack(e)}>
                Go Back to Account
            </div>
        </div>
    )
}
export default Verification;