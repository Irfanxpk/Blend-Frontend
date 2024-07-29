import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GET_ADMIN } from "../../graphql/mutations/adminMutation/AdminGql";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../../redux/slices/adminSlice";
import { RootState } from "../../redux/store";

const AdminLogin = () => {
  // const admin = useSelector((state: RootState) => state.admin.adminData)
  // useEffect(() => {
  //   if ( admin ) {
  //     navigate("/admin");
  //     return
  //   }
  //   toast.warning("Please use admin credentials", {
  //     position: "top-center",
  //   });
  // }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [getAdmin, { loading }] = useLazyQuery(GET_ADMIN);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await getAdmin({
      variables: { email, password },
    });

    if (loading) {
      toast.loading("Logging in...", {
        position: "top-center",
      });
    }

    if (res.error) {
      toast.error(res.error.message, {
        position: "top-center",
      });
      console.log("Error: ", res.error.message);
    }

    if (res.data && res.data.getAdmin) {
      const admin = res.data.getAdmin;
      dispatch(setAdmin(admin));
      console.log("Data: ", res.data);
      navigate("/admin");
      toast.success("Login successful ", {
        position: "top-center",
      });
    } else if (res.data && !res.data.getAdmin) {
      toast.error("Invalid credentials", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="flex bg-gradient-to-br from-[#282C34] to-[#282C34] min-h-screen max-h-full w-full">
        <div className="flex items-center justify-center w-full container">
          <div className="md:w-1/3 w-4/5">
            <h2 className="text-white text-3xl">Welcome back!</h2>
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
                    className="w-4 h-4 focus:ring-[#9BF0E1] border-gray-500 rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-white">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-[#9BF0E1] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 text-white bg-slate-500 rounded-md hover:bg-[#9BF0E1] focus:outline-none focus:ring-2 focus:ring-[#9BF0E1] hover:animate-pulse"
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
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
