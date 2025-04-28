import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle email/password login
    console.log("Email:", email, "Password:", password);
  };

  const handleGoogleSignIn = () => {
    // Handle Google login
    console.log("Google Sign In");
  };

  return (
    <div className="min-h-screen flex items-center justify-center signinbg bg-center bg-cover">
      <div className="bg-[rgba(255,255,255,0.69)] p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#E44332] mb-8">
          Sign In
        </h2>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border-accentMain border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E44332]"
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
              className="w-full px-4 py-2 border-accentMain border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E44332]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E44332] text-white py-2 rounded-lg font-semibold hover:bg-[#c43729] transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <span className="text-black">or</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-6 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <span>
          <FcGoogle />
          </span>
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
