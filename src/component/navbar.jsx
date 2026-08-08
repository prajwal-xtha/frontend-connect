import { Link } from "react-router-dom";
import { useAuth } from "../storage/auth";
function Navbar() {
  const { token } = useAuth();
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-3xl font-bold text-blue-600 hover:text-blue-700"
          >
            Facebook
          </Link>

          <input
            type="text"
            placeholder="Search..."
            className="hidden md:block bg-gray-100 rounded-full px-4 py-2 w-64 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
          >
            🏠 Home
          </Link>

          <Link
            to="/post"
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
          >
            ➕ Create Post
          </Link>

          <Link
            to="/profile"
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
          >
          profile
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!token && <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition" >Login</Link>}
          {!token && <Link to="/register" className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">Register</Link>}
        </div>

 <div>
 <button onClick={logout}>
      Logout
    </button>
 </div>

      </div>
    </nav>
  );
}

export default Navbar;