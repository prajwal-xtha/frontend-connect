import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Post() {
  // const [postuser, setpostuser] = useState("");
  // const [posturl, setposturl] = useState("");
  // const [postcaption, setpostcaption] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [postcaption, setPostcaption] = useState("");




  const navigate = useNavigate();
  const backend = import.meta.env.VITE_production;

  const handlepost =async (e) =>{
    const token = localStorage.getItem("token");
console.log(token);
  
    if (!token) {
      console.log("No token found in localStorage");
      return;
    }
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();

  formData.append("image", image);
  formData.append("postcaption", postcaption);

    try {
      const response = await fetch(`${backend}/post`, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:formData,
      });

      const data = await response.json();

      console.log(data);
      if(data.success){
        alert("post created sucessfull")
        navigate('/')
      }
      else{
        alert("login expire")
        navigate("/login")
      }

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }finally {
      setLoading(false);
    }



  };

  return (
    <>
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
        <form
          onSubmit={handlepost}
          className="w-full max-w-md bg-zinc-800 p-8 rounded-2xl shadow-2xl border border-zinc-700"
        >
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Create Post
          </h1>

          <div className="mb-5">
            <label className="block text-zinc-300 font-medium mb-2">
              Post URL
            </label>
            <input
  type="file"
  name="image"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
  className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white border border-zinc-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
/>
              
            {/* <input type="file" /> */}
          </div>

          <div className="mb-6">
            <label className="block text-zinc-300 font-medium mb-2">
              Post Caption
            </label>

            <input
              type="text"
              name="postCaption"
              value={postcaption}
              onChange={(e) => setPostcaption(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white border border-zinc-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-semibold py-3 rounded-lg"
          >
            Create Post
          </button>
        </form>
      </div>
    </>
  );
}

export default Post;