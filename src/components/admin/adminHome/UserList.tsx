import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { gsap } from "gsap";
import { toast } from "sonner";
import { BLOCK_UNBLOCK_USER } from "../../../graphql/mutations/adminMutation/AdminGql";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      image
      IsBlocked
    }
  }
`;

const ITEMS_PER_PAGE = 10;

export function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [BlockUnblockUser] = useMutation(BLOCK_UNBLOCK_USER);

  useEffect(() => {
    if (data) {
      console.log(data);
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setPaginatedUsers(data.users.slice(startIndex, endIndex));
      gsap.fromTo(
        ".user-list-item",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );
    }
  }, [data, currentPage]);

  if (loading) return toast.loading("Loading...");
  if (error) return toast.error(`Error: ${error.message}`);

  const totalPages = Math.ceil((data?.users.length ?? 0) / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBlockUser = async (userId: string, isBlocked: boolean) => {
    try {
      await BlockUnblockUser({
        variables: { id: userId },
        update: (cache, { data }) => {
          const updatedUsers = data?.BlockUnblockUser
            ? data.BlockUnblockUser
            : {};
          const usersInCache = cache.readQuery({ query: GET_USERS });

          if (usersInCache) {
            const updatedUserList = usersInCache.users.map((user) =>
              user.id === userId ? { ...user, IsBlocked: !isBlocked } : user
            );

            cache.writeQuery({
              query: GET_USERS,
              data: { users: updatedUserList },
            });
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });

      toast.success(
        isBlocked ? "User unblocked successfully" : "User blocked successfully",
      );
    } catch (error) {
      toast.error("An error occurred while updating user status.");
    }
  };

  return (
    <div className=" ">
      <div className="overflow-auto h-[600px] rounded-lg p-4">
        <ul className="space-y-4">
          {paginatedUsers.map((user) => (
            <li
              key={user.id}
              className="user-list-item p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                    {user.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400">
                    {user.email}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.IsBlocked ? "Blocked" : "Active"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBlockUser(user.id, user.IsBlocked)}
                    className={`${user.IsBlocked ? "bg-red-500" : "bg-blue-500"} text-white px-4 py-2 rounded`}
                  >
                    {user.IsBlocked ? "Unblock" : "Block"}
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Message
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-around mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-300"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
