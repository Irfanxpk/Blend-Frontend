

const MainSection = ( {children}: {children: React.ReactNode}) => {
  return (
    <div className=" bg-slate-500 h-screen w-auto  md:col-span-9 col-span-8 rounded-s-xl">
      {children}
    </div>
  );
}

export default MainSection