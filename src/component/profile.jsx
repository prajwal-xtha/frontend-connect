import { useEffect,useState } from "react";
import { useAuth } from "../storage/auth";

function Profile(){
  
  const { token } = useAuth();
  const profile =async () =>{
    if (!token) {
      console.log("No token found in localStorage");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("profile page")
            const data = await response.json();
            console.log(data)
          } catch (error) {
            console.error(error);
            alert("Server Error");
          }
        };
      
  
  useEffect(()=>{
  profile();
  },[token])



    
    return(<>
<h1>hello</h1>
    </>)
}
export default Profile