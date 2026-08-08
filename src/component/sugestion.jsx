import { useEffect,useState } from "react";
import { useAuth } from "../storage/auth";

function Suggestion(){

    const [suggestion,setsuggestion]=useState([])
    const [user,setuser]=useState([])
     const { token } = useAuth();
    const handlesug =async (e) =>{
      if (!token) {
        console.log("No token found in localStorage");
        return;
      }
        try {
          const response = await fetch("http://localhost:3000/api/sug", {
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
        {/* <div className="w-80 bg-gray-50 rounded-2xl shadow-md p-4 border border-gray-200"> */}
        {/* <div className="flex items-center gap-4">
        <img
          src="https://imgs.search.brave.com/dCmJ2xhaBW6NvjCS74d7jzg7oaUEI3iWzEkDGdN3wUs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWdvb2dsZS1pY29u/LXN2Zy1kb3dubG9h/ZC1wbmctMTU5NzU1/OS5wbmc_Zj13ZWJw/Jnc9MTI4"
          alt="hello"
          srcSet=""
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />

        <p className="h-15 flex items-center text-gray-800 font-medium text-sm">
          {user.username}
        </p>
      </div> */}
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