import Link from "next/link";

const Register = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
  
          {/* Registration Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
  
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
  
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 transition p-3 rounded text-white font-semibold shadow-md"
            >
              Register
            </button>
          </form>
  
          {/* Footer Links */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/" className="text-blue-400 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    );
  };
  
  export default Register;
  