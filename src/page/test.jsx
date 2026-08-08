  
  import { useEffect, useState } from "react";

  function Test() {
    const [username, setusername] = useState("");
    const authentication = async () => {
      const token = localStorage.getItem("token");
    
      console.log("TOKEN FROM LS:", token);
    
      if (!token) {
        console.log("No token found in localStorage");
        return;
      }
    
      const response = await fetch("https://connectmedia.onrender.com/api/test", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      const data = await response.json();
       console.log(data);
  
      setusername(data.user.username)
      
    };
    // console.log(username)
    
    useEffect(() => {
      authentication();
    }, []);
    
    return (
      <>
      <img src="" alt="" srcset="" />
        <h1>{username}</h1>
        ..........................................
      </>
    );
  }
  
  export default Test;
