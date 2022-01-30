import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './CSS/App.css';

import Home from './Views/Home';
import Register from './Views/Register';
import Login from './Views/Login';
import Dashboard from './Views/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import Navigation from './Components/Navigation';

import ServerTestButton from './Components/ServerTestButton';
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css'


function App() {

  return (
    <div className="Wrapper">
      <Navigation></Navigation>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
