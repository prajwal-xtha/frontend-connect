import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//components
import Navbar from "./component/navbar";
import Suggestion from "./component/sugestion";
import Home from "./page/home";
import Register from "./page/register";
import Login from "./page/login";
import Test from "./page/test";
import Post from "./page/post";
import ProtectedRoute from "./page/protected";
import Profile from "./component/profile";


function App() {
  return (
    <>
    <Navbar /> 
       <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/sug" element={<Suggestion/>} />
        <Route path="/" element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<ProtectedRoute>
            <Post />
          </ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
<Route path='/test' element={<ProtectedRoute>
            <Test />
          </ProtectedRoute>}/>

      </Routes>  
    </>
  );
}

export default App;
