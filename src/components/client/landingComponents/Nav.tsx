
const Nav = () => {

  const links = [
    { href: "/home", title: "Home", },
    { href: "/home", title: "Discover", },
    { href: "/about", title: "About", },
    { href: "/contact", title: "Contact", },
  ]
  return (
    <nav className="flex md:justify-center fixed top-0 left-0 right-0 md:mx-5">
      <div className="logo flex items-center absolute md:left-32 z-10 md:h-[6rem] h-[4rem] ">
        <img className=" " src={`src/assets/logo.svg`} alt="Logo"></img>
        <img className="hidden md:block" src="src/assets/lend.svg" alt="lend" />
      </div>
      <div className="nav absolute h-[4rem]  items-center md:w-1/3 md:rounded-full w-full rounded-sm flex justify-center  md:top-5 ">
        <ul className="md:flex md:justify-around md:w-full hidden h-2/3 items-center bg-gradient-to-tr from-[#9BF0E1] to-[#282C34] md:rounded-full">
          {links.map((link) => (
            <li key={link.title}>
              <a
                href={link.href}
                className="text-white stroke-2 stroke-[#282C34] hover:text-[#4fffe8]"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <a href="/login">
        <button className="md:w-1/12 w-2/6 h-10 bg-[#9BF0E1] rounded-full absolute right-12 top-4 md:right-16 md:top-8 border-4 border-[#4b87ff] font-bold text-sans">
          Dive in
        </button>
      </a>
      <div className="md:hidden absolute right-4 top-5">
        {/* <img width={16} src={`src/assets/menu.svg`} alt="Menu" /> */}
      </div>
    </nav>
  );
}

export default Nav