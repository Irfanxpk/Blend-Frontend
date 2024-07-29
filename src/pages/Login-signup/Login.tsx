import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../../graphql/mutations/userMutation/UserGql";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { DrawerDraggable } from "../../components/Common/DrawerDraggable";


const Login = () => {
 
const [loginuser,{data, loading , error}] = useMutation(LOGIN_USER)

  const Navigate = useNavigate();
  const [email, setEmail] = useState(
    sessionStorage.getItem("email_ref") || ""
  );
  const [password, setPassword] = useState("");


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      
      event.preventDefault();
     const res = await loginuser({
        variables: {
          email,
          password,
        }
     })
     console.log("res",res,"data",data);
      console.log("error", error);

      Navigate("/home");
    } catch (error:any ) {
      toast.error(error.message,{
        position: "top-center",});
      console.log("error",error);
      
    }
    
  }

  // to handle the forget password
  const handleforgetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if(!email)toast.error("Please enter email",{
      position: "top-center",
    });
    
    // Navigate("/forgot-password");
  };

  return (
    <div className=" flex bg-gradient-to-br from-[#282C34] to-[#282C34] min-h-screen max-h-full w-full ">
      <div className="flex absolute md:justify-around w-full">
        <div className="flex w-1/3">
          <img src="src/assets/logo.svg" alt="Logo" />
          <img className="hidden md:block" src="src/assets/lend.svg" alt="" />
        </div>
        <div className=" flex md:w-1/2  md:justify-start">
          <h1 className="self-center  text-4xl font-bold text-white">Login</h1>
        </div>
      </div>

      <div className="flex  items-center justify-center w-full container ">
        <div className="md:w-1/3 w-4/5 ">
          <h2 className="text-white text-3xl ">Welcome back!</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 text-gray-50 placeholder-gray-400 border border-gray-400 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9BF0E1]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 text-gray-50 placeholder-gray-400 border border-gray-400 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9BF0E1]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="orange-checkbox"
                  type="checkbox"
                  className="w-4 h-4   focus:ring-[#9BF0E1] border-gray-500 rounded "
                />
                <label className="ml-2 text-sm font-medium text-white ">
                  Remember me
                </label>
              </div>
              <button
                onClick={handleforgetPassword}
                className="text-sm font-medium text-[#9BF0E1] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-slate-500 rounded-md hover:bg-[#9BF0E1] focus:outline-none focus:ring-2 focus:ring-[#9BF0E1] animate-pulse hover:animate-none"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-white">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#9BF0E1] hover:underline">
              Sign up
            </a>
          </p>
        </div>
        <div className="hidden md:block  w-1/3 ml-6 ">
          <img
            className="rounded-xl "
            src="src/assets/loginban.jpg"
            alt="login banner"
          />
        </div>
      </div>
    </div>
  );
}

export default Login