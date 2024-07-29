
const DotBackground = ({children }:{children: JSX.Element}) => {
  return (
    <div className="min-h-screen max-h-full w-full bg-[#282C34]   bg-dot-[#9BF0E1]/[0.5]  ">
      {/* Radial gradient for the container to give a faded look */}
      <div className=" inset-0 flex items-center justify-center dark:bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
}

export default DotBackground