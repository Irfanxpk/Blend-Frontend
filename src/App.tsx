import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import LandingPage from "./pages/Landing/LandingPage";
import HomePage from "./pages/home/HomePage";
import UserPage from "./pages/User/UserPage";
import CommunityPage from "./pages/community/CommunityPage";
import PostPage from "./pages/Post/PostPage";
import Login from "./pages/Login-signup/Login";
import Signup from "./pages/Login-signup/Signup";
import AdminDash from "./pages/Admin/AdminDash";
import { ProtectedAdminRoute } from "./routes/protectedRoutes/ProtectedAdminRoute";
import AdminLogin from "./pages/Admin/AdminLogin";
import UserManagement from "./pages/Admin/UserManagement";
import ResetPassword from "./pages/Login-signup/ResetPassword";
import CheckValidity from "./components/client/Auth/CheckValidity";


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // uri:"https://9ctdrrcv-4000.inc1.devtunnels.ms/graphql",
  cache: new InMemoryCache(),
});

function App() {
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<CheckValidity />}>
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
            </Route>
            {/* <Route element={<ProtectedAdminRoute />}> */}
            <Route element={<AdminDash />}>
              <Route path="/admin" element={<UserManagement />} />
              {/* <Route path="/admin/*" element={<AdminLogin />} /> */}
            </Route>
            {/* </Route> */}
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/community/:id" element={<CommunityPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            {/* <Route path="*" element={<LandingPage />} /> */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
