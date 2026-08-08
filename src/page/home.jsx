// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { useAuth } from "../storage/auth";
import Suggestion from "../component/sugestion";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [Likes, setLikes] = useState([]);
  const { token, setToken } = useAuth();

  const authentication = async () => {
    if (!token) {
      console.log("No token found in localStorage");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("hhh", data);

      setPosts(data.posts);

      if (response.status === 401 || data.success == false) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
        authentication();
    } else {
        setPosts([]);
        navigate("/login");
    }
}, [token]);

  const handleLike = async (postId) => {
  

    try {
      const response = await fetch(
        `http://localhost:3000/api/feed/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await authentication();
      const data = await response.json();

      if (!response.ok) {
      
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center px-8 py-6">
        {/* Feed */}
        <div className="w-full max-w-2xl">
          {posts.map((post) => (
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
                    onClick={() => handleLike(post._id)}
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

        {/* Suggestion Box */}
        <div className="fixed top-18 right-8 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
          <Suggestion />
        </div>
      </div>
    </>
  );
}

export default Home;