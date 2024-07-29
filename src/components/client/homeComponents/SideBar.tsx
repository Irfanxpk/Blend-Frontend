import React from "react";
import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaPoo } from "react-icons/fa";
import SideBarContent from "./SideBarContent";



function SideBar() {
  return (
    <>
      <div className="flex md:col-span-3 col-span-4   ">
        <div className="top-0 left-0 h-screen w-16 flex flex-col bg-[#2B2D38] shadow-lg justify-between ">
          <div>
            <SideBarIcon
              icon={<img src="src/assets/logo.svg" alt="logo" />}
              text="Home🏡"
            />
            <Divider />
            <SideBarIcon icon={<BsPlus size="32" />} text="Create Channel 💬" />
            <SideBarIcon icon={<BsFillLightningFill size="20" />} />
            <SideBarIcon icon={<FaPoo size="20" />} />
          </div>
          <div className="">
            <Divider />
            <SideBarIcon icon={<BsGearFill size="22" />} text="Settings ⚙️" />
          </div>
        </div>
        <div className=" w-full  bg-[#10191C] h-screen">
          <SideBarContent />
        </div>
      </div>
    </>
  );
}

const SideBarIcon = ({
  icon,
  text = "tooltip 💡",
}: {
    icon: React.ReactNode;
    text?: string;
}) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
