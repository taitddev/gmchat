import Image from "next/image";
import { User } from "@prisma/client";
import useActiveList from "@/hooks/useActiveList";

interface IAvatarProps {
  user?: User;
  size?: "small" | "medium" | "large";
}

const Avatar: React.FC<IAvatarProps> = ({ user, size = "medium" }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  const getSize = () => {
    switch (size) {
      case "small":
        return "h-6 w-6 md:h-8 md:w-8";

      case "medium":
        return "h-9 w-9 md:h-11 md:w-11";

      case "large":
        return "h-11 w-11 md:h-14 md:w-14";

      default:
        break;
    }
  };

  return (
    <div className="relative">
      <div
        className={`relative inline-block overflow-hidden rounded-full ${getSize()}`}
      >
        <Image
          fill
          src={user?.image || "/images/placeholder.jpg"}
          alt="Avatar"
          className="object-cover"
        />
      </div>
      {isActive ? (
        <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white md:h-3 md:w-3" />
      ) : null}
    </div>
  );
};

export default Avatar;
