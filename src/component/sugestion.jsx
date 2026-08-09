import { useEffect,useState } from "react";
import { useAuth } from "../storage/auth";
import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

function Suggestion(){

    const [suggestion,setsuggestion]=useState([])
    const [user,setuser]=useState([])
     const { token } = useAuth();
     const backend = import.meta.env.VITE_production;
    const handlesug =async (e) =>{
      if (!token) {
        console.log("No token found in localStorage");
        return;
      }
        try {
          const response = await fetch(`${backend}/sug`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
    
          const data = await response.json();
          const suf=data.suggestion
            setsuggestion(suf)
          const admin= data.admin;
            setuser(admin)
        
          console.log("suggestion:",data)
        } catch (error) {
          console.error(error);
          alert("Server Error");
        }
      };
    

useEffect(()=>{
handlesug();
},[])

    return(<>

      {user.map((u) => (
  <div key={u._id}>
    <h1>{u.username}</h1>
  </div>
))}
  {suggestion.map((user) => (
    <div
      key={user._id}
      className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <img
          src={user.userprofile}
          alt=""
          srcSet=""
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />

        <p className="h-15 flex items-center text-gray-800 font-medium text-sm">
          {user.username}
        </p>
      </div>

      <button className="px-4 py-1 text-black text-sm font-medium rounded-full hover:bg-blue-600 transition">
        Follow
      </button>
    </div>
  ))}
{/* </div> */}
    </>)
}
export default Suggestion