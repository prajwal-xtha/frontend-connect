import { useEffect,useState } from "react";
import { useAuth } from "../storage/auth";

function Profile(){
  const [owner,setowner]=useState([])
  const { token } = useAuth();
  const backend = import.meta.env.VITE_production;
  const profile =async () =>{
    if (!token) {
      console.log("No token found in localStorage");
      return;
    }
    try {
      const response = await fetch(`${backend}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    
            const data = await response.json();
            console.log("data",data)
            setowner(data.owner)
          } catch (error) {
            console.error(error);
            alert("Server Error");
          }
        };
      
  
  useEffect(()=>{
  profile();
  },[token])



    
    return(<>

<div className="min-h-screen bg-gray-100 flex justify-center px-8 py-6">
        {/* Feed */}
        <div className="w-full max-w-2xl">
          {owner.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-md mb-8 overflow-hidden border border-gray-200"
            >
              <div className="p-4">
               <section className="flex justify-between"><h2 className="text-gray-900 font-bold text-lg">
                  {post.postuser}
                </h2>
<p className="text-3xl">=</p></section>
                <p className="text-gray-600 mt-2">{post.postcaption}</p>
              </div>

              <img
                src={post.posturl}
                alt=""
                className="w-full h-[500px] object-cover"
              />

              <div className="flex justify-around items-center p-4 border-t border-gray-200">
              
                  <button
                    // onClick={() => handleLike(post._id)}
                    className="cursor-pointer text-gray-700 hover:text-blue-600 font-medium"
                  >
                    🤍 {post.postlike} Like
                  </button>
             

                <button className="text-gray-700 hover:text-green-600 font-medium">
                  💬 Comment
                </button>

                <button className="text-gray-700 hover:text-purple-600 font-medium">
                  📤 Share
                </button>
              </div>
            </div>
          ))}
        </div>

       
      </div>
   
    </>)
}
export default Profile