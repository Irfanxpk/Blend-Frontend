
const SideBarContent = () => {
  return (
    <>
      <div className=" grid h-screen w-auto ">
        <div>
          <div className="flex justify-start ml-10 mt-4 ">
            <input
              type="text"
              className="rounded-xl bg-slate-600 text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9BF0E1] placeholder-[#9BF0E1] focus:placeholder-slate-300"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBarContent