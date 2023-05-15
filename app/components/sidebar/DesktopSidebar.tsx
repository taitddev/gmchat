"use client";

import { FC, useState } from "react";
import { User } from "@prisma/client";
import useRoutes from "@/hooks/useRoutes";
import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";
import Image from "next/image";

interface IDesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: FC<IDesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="hidden justify-between p-4 py-3 lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r-[1px] lg:bg-white">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-3">
            <Image
              height={32}
              width={32}
              className="mx-auto mb-6 w-auto"
              src="/images/app-logo.png"
              alt="Logo"
            />

            <hr className="h-2 w-full" />

            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>

        <nav className="mt-4 flex flex-col items-center justify-between">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer transition hover:opacity-75"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
