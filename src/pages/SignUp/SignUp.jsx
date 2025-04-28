import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign up logic
    console.log("Full Name:", fullName, "Email:", email, "Password:", password);
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign up
    console.log("Google Sign Up");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 signupbg">
      <div className="bg-[rgba(255,255,255,0.69)] p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#E44332] mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 border border-accentMain rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E44332]"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-accentMain rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E44332]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-accentMain rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E44332]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E44332] text-white py-2 rounded-lg font-semibold hover:bg-[#c43729] transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <span className="text-black">or</span>
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full mt-6 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <span>
            <FcGoogle />
          </span>
          <span className="font-medium text-gray-700">Sign up with Google</span>
        </button>
      </div>
    </div>
  );
}
