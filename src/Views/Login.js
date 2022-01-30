import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../CSS/Login.css';

export default function Login() {
  const [details, setDetails] = useState({ email: "", password: ""});


  async function handleSubmit(e) {
    e.preventDefault();
    console.log(details);
    if(details.email && details.password) {
      Axios.post("http://localhost:5000/login", details).then(function(response) {
        console.log("uhhh");
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        // console.log("hadsfah")
      }).catch(function (error) {
        if (error.response) {
          alert(error.response.data);
        }
      });
    }
    else {
      alert("Fill in all fields");
    }    
  }
  
  return(
  <div id="loginWrapper">
    <form onSubmit={handleSubmit}>
      <div className="formBlock">
        <label>Email: </label>
        <input id ="email" name = "email" type="text" onChange={e => setDetails({...details, email: e.target.value})}></input>
      </div>
      <div className="formBlock">
        <label>Password: </label>
        <input id ="password" name = "password" type="text" onChange={e => setDetails({...details, password: e.target.value})}></input>
      </div>
      <button id="formSubmitButton" type="submit">Submit</button>
    </form>
  </div>

  )
}