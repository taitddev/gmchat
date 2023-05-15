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
  prevMessage: FullMessageType;
  isLast?: boolean;
}

const MessageBox: FC<IMessageBoxProps> = ({ message, prevMessage, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session.data?.user?.email === message?.sender?.email;

  const isNewGroupMessage = message?.senderId !== prevMessage?.senderId;

  const seenList = (message.seen || [])
    .filter((user) => user.email !== message?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  return (
    <>
      {/* Sender user */}
      {!isOwn && isNewGroupMessage && (
        <div className="flex gap-3">
          <Avatar user={message.sender} size="small" />

          <div className="flex items-baseline gap-1">
            <div className="text-sm text-gray-500">{message.sender.name}</div>
            <div className="text-xs text-gray-400 ">
              {format(new Date(message.createdAt), "p")}
            </div>
          </div>
        </div>
      )}

      {/* Message box */}
      <div className={clsx("flex py-1", isOwn && "justify-end")}>
        <div className={clsx(isOwn && "items-end")}>
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
        </div>
      </div>

      {isLast && isOwn && seenList.length > 0 && (
        <div className="mt-2 text-right text-xs font-light text-gray-500">
          {`Seen by ${seenList}`}
        </div>
      )}
    </>
  );
};

export default MessageBox;
