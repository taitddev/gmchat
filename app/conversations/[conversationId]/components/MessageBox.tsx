import { FC, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { format } from "date-fns";

import { FullMessageType } from "@/app/types";
import Avatar from "@/app/components/Avatar";
import ImageModal from "./ImageModal";

interface IMessageBoxProps {
  message: FullMessageType;
  isLast?: boolean;
}

const MessageBox: FC<IMessageBoxProps> = ({ message, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session.data?.user?.email === message?.sender?.email;

  const seenList = (message.seen || [])
    .filter((user) => user.email !== message?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  return (
    <div className={clsx("flex gap-3 p-4", isOwn && "justify-end")}>
      <div className={clsx(isOwn && "order-2")}>
        <Avatar user={message.sender} />
      </div>

      <div className={clsx("flex flex-col gap-2", isOwn && "items-end")}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{message.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(message.createdAt), "p")}
          </div>
        </div>

        <div
          className={clsx(
            "w-fit overflow-hidden text-sm",
            isOwn ? "bg-bluePrimary text-white" : "bg-gray-100",
            message.image ? "rounded-md p-0" : "rounded-full px-3 py-2"
          )}
        >
          <ImageModal
            src={message.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {message.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)}
              src={message.image}
              className="translate cursor-pointer object-cover transition hover:scale-110"
            />
          ) : (
            <div>{message.body}</div>
          )}
        </div>

        {isLast && isOwn && seenList.length > 0 && (
          <div
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
