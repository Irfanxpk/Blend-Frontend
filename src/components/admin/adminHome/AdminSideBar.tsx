import { FaUsers } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";

const AdminSideBar = () => {
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-12 col-span-2 row-span-9 bg-[#23272F]  border-white/20 border-[1px] rounded-xl">
        {/* <div className="row-span-9 bg-orange-900">1</div> */}
        <div className="col-span-6 row-span-1 border-white/20 border-b-[1px] ">
          <div className="flex items-center ml-8  w-full">
            <img src="src/assets/logo.svg" alt="logo" width={60} />
            <img src="src/assets/lend.svg" alt="lend" width={70} />
          </div>
        </div>
        <div className="col-span-6 row-span-1  ">
          <div className="flex items-center  w-full ml-6 mt-8 ">
            <LuLayoutDashboard size={30} color="#A2A6AD" />
            <p className="text-[#A2A6AD] ml-4 text-lg font-bold hover:text-[#9BF0E1] cursor-pointer">
              Dashboard
            </p>
          </div>
        </div>
        <div className="col-span-6 row-span-1  ">
          <div className="flex items-center  w-full ml-6 mt-8  ">
            <FaUsers size={32} color="#A2A6AD" />
            <p className="text-[#A2A6AD] ml-4 text-lg font-bold hover:text-[#9BF0E1] cursor-pointer">
              Users
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default AdminSideBar