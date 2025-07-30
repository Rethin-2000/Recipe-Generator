
import { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const handleLogin = async ()=> {

      try{
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User logged in:", user);
          navigate('/');
        })
        

      }catch(error){
        console.log("login error:", error);
      }

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#FF6347' }}>
          Login
        </h2>

        {/* Email Field */}
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF6347]"
          onChange={(e)=>setEmail(e.target.value)}
        />

        {/* Password Field */}
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[#FF6347]"
          onChange={(e)=>setPassword(e.target.value)}
        />

        {/* Sign Up Button */}
        <button
          type="button"
          className="w-full bg-[#FF6347] text-white font-semibold py-3 rounded-lg hover:bg-[#e2543d] transition duration-300"
          onClick={handleLogin}
        >
          Login
        </button>
        
      </form>
    </div>
  );
};

export default LoginForm;
