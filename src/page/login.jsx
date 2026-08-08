import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../storage/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {storeTokenInLS}=useAuth()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://connectmedia.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        storeTokenInLS(data.token);
    
      console.log("Stored token:", localStorage.getItem("token"));
        alert("Login Successful");
        navigate("/")
        
      } else {
        alert(data.message || "Invalid Email or Password");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background */}
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -bottom-20 -right-20"></div>

      {/* Card */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-3xl">
            🔐
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white text-center">
          Welcome Back
        </h1>

        <p className="text-center text-zinc-400 mt-2 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-zinc-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-zinc-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/forgot"
              className="text-sm text-blue-400 hover:text-cyan-300"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold hover:scale-105 duration-300"
          >
            Login →
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-zinc-700"></div>
          <span className="mx-3 text-zinc-500">or</span>
          <div className="flex-1 h-px bg-zinc-700"></div>
        </div>

        {/* Google */}
        <button className="w-full border border-zinc-700 py-3 rounded-xl text-white hover:bg-white/10 transition">
          Continue with Google
        </button>

        {/* Register */}
        <p className="text-center text-zinc-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;