import React, { useState, useEffect } from 'react';

import { Route, Navigate} from 'react-router-dom';
import Axios from 'axios';
// https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
function ProtectedRoute({ children }) {
    const [isAuthed, setIsAuthed] = useState();
    useEffect(() => {
        Axios.get("http://localhost:5000/isAuthed", {headers: {"x-access-token": localStorage.getItem("token")}}).then(function(response) {
            setIsAuthed(response.data.auth);
            return(isAuthed);
        })
    }, []);
    if(isAuthed === undefined) return(null); //if you haven't heard back from server yet
    return (isAuthed ? children : <Navigate to="/login" />);
}

export default ProtectedRoute;
