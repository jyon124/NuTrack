import React, { useState, useEffect } from 'react';
import '../styles/Account.scss';

const USERS = 'http://localhost:3001/api/v1/';

const Account = (props) => {

    const [ bmrInput, setBMRInput ] = useState(0);

    useEffect(() => {
        const checkBox = document.querySelector('.checkBox');
        if(checkBox.checked){
          checkBox.checked = false;
        }
        if(!props.user){
            props.getUserInfo();
        }
    }, [props])

    async function handleUpdateBMR(e){
        e.preventDefault();
        if(bmrInput > 0){
            const reqObj ={
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("user")}`
                },
                body: JSON.stringify({user:{
                bmr: parseInt(bmrInput),
            }})
            }
            await fetch(`${USERS}update-profile`, reqObj)
            .then(resp => resp.json())
            .then(data => console.log(data));
        }
    }

    return (
        <div className="account-wrapper">
            {
            props.user ?
            <div>
                <div><strong>Username:</strong> {props.user.user.username}</div>
                <div><strong>Name:</strong> {props.user.user.name}</div>
                <div><strong>Email:</strong> {props.user.user.email}</div>
                <div><strong>BMR:</strong> {props.user.user.bmr}</div>
            </div>
            :
            null
            }
            <div>
                <form className="addItemForm" onSubmit={(e) => handleUpdateBMR(e)}>
                <label className="inputLabel">
                    <input className="userInput" type="text" placeholder="BMR" value={bmrInput} onChange={(e) => setBMRInput(e.target.value)} />
                </label>
                <button className="red submitBtn" type="submit">
                    Update BMR
                </button>
                </form>
            </div>
        </div>
    )
}
export default Account;