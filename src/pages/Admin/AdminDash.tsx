import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/admin/adminHome/AdminSideBar"
import AdminNav from "../../components/admin/adminHome/AdminNav";


const AdminDash = () => {
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-9 gap-2 bg-[#23272F] h-screen ">
              <AdminSideBar />
              <div className="col-span-12 row-span-9 col-start-3 bg-[#23272F]  border-white/20 border-[1px] ">
                  <AdminNav/>
                  <Outlet/>
              </div>
             
        
        {/* <div className="col-span-9 row-span-9 col-start-4 bg-orange-700">2</div> */}
      </div>
    </>
  );
};

export default AdminDash