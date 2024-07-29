import MainSection from "./MainSection"
import SideBar from "./SideBar"

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
      <>
        <div className="grid grid-cols-12 bg-slate-500">
          <SideBar  />
                <MainSection >
                  {children}
          </MainSection>
        </div>
      </>
    );
}

export default Layout