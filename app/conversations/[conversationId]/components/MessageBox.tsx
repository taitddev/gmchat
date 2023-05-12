import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { format } from "date-fns";

import { FullMessageType } from "@/app/types";
import Avatar from "@/app/components/Avatar";

interface IMessageBoxProps {
  message: FullMessageType;
  isLast?: boolean;
}

const MessageBox: FC<IMessageBoxProps> = ({ message, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session.data?.user?.email === message?.sender?.email;

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
      </div>
    </div>
  );
};

export default MessageBox;
