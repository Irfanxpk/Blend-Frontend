
import { UserList } from "../../components/admin/adminHome/UserList"

const UserManagement = () => {
  return (
    <>
      <div className="">
        {/* <ExpandableCard/> */}
        <div className="max-h-screen ">
          <UserList />
        </div>
      </div>
    </>
  );
}

export default UserManagement