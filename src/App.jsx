import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { baseURL } from "./util";

import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from "./pages/Home"
import Rooms from "./pages/Rooms"

function App() {
  const [user, setUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    setUser();
    const verifyCookie = async () => {
      if (cookies.token && cookies.token !== "undefined") {
        
        await axios
          .post(`${baseURL}/`, {}, { withCredentials: true })
          .then((res) => {
            setUser(res.data.user);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
    verifyCookie();
  }, [cookies, removeCookie]);

  const logout = () => {
    removeCookie("token");
    setUser();
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={user ? <Home user={user} logout={logout} /> : <Navigate to="/login" replace={true} />} />
          <Route path="/create-room" element={user ? <Rooms user={user} logout={logout} /> : <Navigate to="/login" replace={true} />} />
          <Route path="/login" element={user ? <Navigate to="/" replace={true} /> : <Login setUser={setUser} /> } />
          <Route path="/signup" element={user ? <Navigate to="/" replace={true} /> : <SignUp setUser={setUser} /> } />          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;