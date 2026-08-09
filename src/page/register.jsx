import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backend = import.meta.env.VITE_production;
  const navigate = useNavigate();
  const handleRegister = async (e) => {

    e.preventDefault();
    const response = await fetch(`${backend}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log(data)

    console.log('response',data);
    if (data.success) {
      alert("Registration successful");
      navigate("/login"); // or "/login"
    } else {
    alert(data.message)
    }



  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">

{/* Background Glow */}
<div className="absolute w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />
<div className="absolute w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

{/* Card */}
<div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_0_60px_rgba(251,191,36,0.15)]">

  {/* Logo */}
  <div className="flex justify-center mb-6">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30">
      🚀
    </div>
  </div>

  {/* Heading */}
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold text-white tracking-tight">
      Create Account
    </h1>

    <p className="text-zinc-400 text-sm mt-2">
      Join and start your journey today
    </p>
  </div>

  <form onSubmit={handleRegister}>

    {/* Username */}
    <div className="mb-5">
      <label className="block text-sm text-zinc-300 mb-2">
        Username
      </label>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-700 text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all duration-300"
      />
    </div>

    {/* Email */}
    <div className="mb-5">
      <label className="block text-sm text-zinc-300 mb-2">
        Email
      </label>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-700 text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all duration-300"
      />
    </div>

    {/* Password */}
    <div className="mb-6">
      <label className="block text-sm text-zinc-300 mb-2">
        Password
      </label>

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-700 text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all duration-300"
      />
    </div>

    {/* Register Button */}
    <button
      type="submit"
      className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-bold tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-amber-500/25"
    >
      Create Account →
    </button>

  </form>

  {/* Divider */}
  <div className="flex items-center gap-3 my-6">
    <div className="flex-1 h-px bg-zinc-700"></div>
    <span className="text-zinc-500 text-sm">or</span>
    <div className="flex-1 h-px bg-zinc-700"></div>
  </div>

  {/* Google Button */}
  <button className="w-full py-3 rounded-2xl bg-white/5 border border-zinc-700 text-white hover:bg-white/10 transition-all duration-300">
    Continue with Google
  </button>

  {/* Footer */}
  <p className="text-center text-zinc-500 text-sm mt-6">
    Already have an account?{" "}
    <a
      href="/login"
      className="text-amber-400 hover:text-yellow-300 hover:underline transition"
    >
      Login
    </a>
  </p>

</div>
</div>
  );
}

export default Register;