"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface IUserListProps {
  users: User[];
}

const UserList: React.FC<IUserListProps> = ({ users }) => {
  return (
    <aside className="lg fixed inset-y-0 left-0 block w-full overflow-y-auto border-r  border-gray-200 lg:left-20 lg:block lg:w-80 lg:py-3">
      <div className="px-5">
        <div className="flex-col">
          <div className="py-4 text-xl font-bold text-neutral-800">People</div>
        </div>

        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
