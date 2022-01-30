import React from 'react'
import Axios from 'axios'
// import axios from 'axios';
function ServerTestButton() {
    async function handleClick(e) {
        e.preventDefault();
        console.log('buttonc licked');
        Axios.get("http://localhost:5000/test").then(function(response) {
            console.log(response);
        })
    }

    return <button onClick={handleClick}>Button</button>
}

export default ServerTestButton;