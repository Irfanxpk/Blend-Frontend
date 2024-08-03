import { useLazyQuery } from "@apollo/client";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CHECK_TOKEN } from "../../../graphql/mutations/userMutation/UserGql";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const CheckValidity = () => {
  const [isToken, setIsToken] = useState<boolean>(false);
  const { token } = useParams();
  console.log("Token from ResetPassword.tsx", token);

  const Navigate = useNavigate();
  const [checkToken, { error}] = useLazyQuery(CHECK_TOKEN);

  console.log(token);

  useEffect(() => {
    if (token) {
      const checkTokenAsync = async () => {
        console.log("Checking token...");
        try {
          const res = await checkToken({ variables: { token } });
          // console.log("res", res);
          const data = res.data
          if (data.checkToken) {
            console.log(data)
            if (data.checkToken.success&&data.checkToken.req_id) {
              setIsToken(true)
            }
          }
        } catch (errors) {
          console.error("Error checking token:", error);
          Navigate("/login");
        }
      };

      checkTokenAsync();
    }
  }, [token, checkToken]);

  return (
    <div>
      {isToken ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
         <Loader />
        </>
      )}
    </div>
  );
};

export default CheckValidity;
