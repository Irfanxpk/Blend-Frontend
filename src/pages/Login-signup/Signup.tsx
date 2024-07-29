/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { GoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_USER,
  VALIDATE_OTP,
  GOOGLE_LOGIN,
} from "../../graphql/mutations/userMutation/UserGql";
import { useNavigate } from "react-router-dom";
import { OtpModal } from "../../components/client/modal/OtpModal";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";

const Signup = () => {   

  const user = useSelector((state: RootState) => state.user.userData);



  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState(
    sessionStorage.getItem("signupEmail") || ""
  );
  const [name, setName] = useState(sessionStorage.getItem("signupName") || "");
  const [password, setPassword] = useState(
    sessionStorage.getItem("signupPassword") || ""
  );
  const [confirmPassword, setConfirmPassword] = useState(
    sessionStorage.getItem("signupConfirmPassword") || ""
  );
  const [dob, setDob] = useState(sessionStorage.getItem("signupDob") || "");
  const [id, setId] = useState(sessionStorage.getItem("signupId") || "");

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const [validateOtp] = useMutation(VALIDATE_OTP);
  const [googleLogin] = useMutation(GOOGLE_LOGIN);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  useEffect(() => {
    sessionStorage.setItem("signupEmail", email);
    // if (user) {
    //   navigate("/home");
    // }
  }, [email]);

  useEffect(() => {
    sessionStorage.setItem("signupName", name);
  }, [name]);

  useEffect(() => {
    sessionStorage.setItem("signupPassword", password);
  }, [password]);

  useEffect(() => {
    sessionStorage.setItem("signupConfirmPassword", confirmPassword);
  }, [confirmPassword]);

  useEffect(() => {
    sessionStorage.setItem("signupDob", dob);
  }, [dob]);

  useEffect(() => {
    if (id) {
      sessionStorage.setItem("signupId", id);
    } else {
      sessionStorage.removeItem("signupId");
    }
  }, [id]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        duration: 2000,
        dismissible: true,
      })
      return;
    }

    try {
      const response = await createUser({
        variables: { name, email, password, dob },
      });
      console.log(response.data);
      
      if (loading) {
        console.log("kjhkjh"); 
        
        return toast.loading("Creating User");
       }
      const userId = response.data.createUser.user.id;
      setId(userId);
      setShowOtpModal(true);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      const response = await validateOtp({ variables: { email, otp, id } });
      if (response.data.validateOtp.success) {
        console.log(
          "OTP validated successfully:",
          response.data.validateOtp.user
        );
        setShowOtpModal(false);
        localStorage.clear();
        localStorage.setItem("token", response.data.validateOtp.token);
        sessionStorage.clear();
        sessionStorage.setItem("email_ref", email);

        navigate("/login");

        toast.success("SignUp Successful", {
          description: "PLease Login to continue",
          duration: 5000,
          position: "top-center",
          dismissible: true,
        });
      } else {
        console.error("Invalid OTP");


        toast.error('Invalid OTP', {
          position: 'top-center',
          description: 'Try Entering Correct OTP',
          duration: 2000,
        });


      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      toast.error("Invalid OTP", {
        position: "top-center",
        description: "Try Entering Correct OTP",
        duration: 2000,
      });
    }
  };

  const handleResendOtp = async () => {
    // Logic to resend OTP
    console.log("OTP Resent");
  };

  const handleCancelOtp = () => {
    setShowOtpModal(false);
  };

  const handleGoogleSignin = async (key: any) => {
    try {
      
      const response = await googleLogin({
        variables: { key },
      })
  
      console.log(response.data.createUser_google.user)
      // toast(response.data);
      // if (response.data) {
      //   //  localStorage.setItem("user", response.data.googleLogin);\

      //   dispatch(setUser(response.data.createUser_google.user));
      // }
      navigate("/home");
    } catch (error) {
      console.error("Error creating user:", error);
      if (error) {
        toast.error(error.message, {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      {showOtpModal && (
        <OtpModal
          email={email}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
          onCancel={handleCancelOtp}
        />
      )}
      <div className="flex flex-col bg-gradient-to-br from-[#282C34] to-[#282C34] min-h-screen w-full">
        <div className="flex justify-start items-center">
          <div className="flex ml-4">
            <img src="src/assets/logo.svg" alt="Logo" />
            <img
              className="hidden md:block"
              src="src/assets/lend.svg"
              alt="Lend"
            />
          </div>
          <h1 className="absolute right-1/3 md:right-0 text-4xl font-bold text-white md:hidden">
            Signup
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-center w-full">
          <div className="flex flex-col items-center w-full p-4">
            <div className="md:w-1/2 w-full bg-gray-900 p-8 rounded-xl shadow-lg">
              <h2 className="text-white text-3xl mb-4">Create your account</h2>
              <form onSubmit={handleSignup}>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-white"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 text-white placeholder-gray-400 border border-gray-400 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9BF0E1]"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full text-white px-3 py-2 placeholder-gray-400 border border-gray-400 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9BF0E1]"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full text-white px-3 py-2 placeholder-gray-400 border border-gray-400 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9BF0E1]"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-white"
                    htmlFor="confirm-password"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full text-white px-3 py-2 placeholder-gray-400 border border-gray-400 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9BF0E1]"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-white"
                    htmlFor="dob"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    className="w-full text-white px-3 py-2 placeholder-gray-400 border border-gray-400 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9BF0E1]"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-lg text-white  bg-slate-500 rounded-md hover:bg-[#9BF0E1] hover:text-black hover:animate-pulse animate-none"
                >
                  Sign Up
                </button>
              </form>
              <p className="mt-4 text-white">
                Already have an account?{" "}
                <a href="/login" className="text-[#9BF0E1] hover:underline">
                  Login
                </a>
              </p>
              <div className="hr"></div>
              <p className="mt-4 text-white">
                Or continue with 
              </p>
              <div className="flex justify- mt-4">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const key = credentialResponse.credential;
                    handleGoogleSignin(key);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
                ;
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
