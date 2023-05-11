import { useMemo } from "react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";

const useRoutes = () => {
  const routes = useMemo(
    () => [
      {
        label: "Logout",
        onClick: () => signOut(),
        href: "#",
        icon: HiArrowLeftOnRectangle,
      },
    ],
    []
  );

  return routes;
};

export default useRoutes;
