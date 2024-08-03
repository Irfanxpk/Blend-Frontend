import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RESET_PASSWORD } from "../../graphql/mutations/userMutation/UserGql";
import { toast } from "sonner";
import Lottie from "react-lottie";
import animationData from "../../assets/Lotties/reset-password.json";
 // Import your RESET_PASSWORD mutation

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const navigate = useNavigate();
  const [resetPasswordMutation] = useMutation(RESET_PASSWORD);

  const handleResetPassword = async () => {
    const Password = password.trim();
    const ConfirmPassword = confirmPassword.trim();
    if (
      Password !== ConfirmPassword ||
      Password === "" ||
      ConfirmPassword === ""
    ) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await resetPasswordMutation({
        variables: { token, password },
      });

      if (data.resetPassword.success) {
        navigate("/login", { replace: true });
        toast.success("Password reset successful. Please login.");
      } else {
        toast.error(data.resetPassword.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Error resetting password:", error);
      } else {
        toast.error("An unknown error occurred");
        console.error("Unknown error resetting password:", error);
      }
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };



  return (
    <div className="flex bg-gradient-to-br from-[#282C34] to-[#282C34] w-full h-screen justify-center items-center ">
      <div className="max-w-sm rounded overflow-hidden shadow-lg  bg-blue-400 m-1">
        <Lottie options={defaultOptions} style={{ width: "full" }} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Reset Password</div>
          <div className="flex flex-col gap-4">
            <input
              className="rounded-lg bg-slate-700 text-[#9BF0E1] font-semibold placeholder:text-white "
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <input
              className="rounded-lg bg-slate-700 text-[#9BF0E1] font-semibold placeholder:text-white"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            <button
              onClick={handleResetPassword}
              className="bg-blue-500 hover:bg-[#9BF0E1] text-white font-bold py-2 px-4 rounded"
            >
              Confirm
            </button>
          </div>
        </div>
        <div className="px-6 pt-4 pb-2"></div>
      </div>
    </div>
  );
};

export default ResetPassword;
