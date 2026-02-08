import Navigation from "@/components/Navigation";
import { Outlet, useLocation } from "react-router";

export default function Root() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navigation />}
      <Outlet />
    </>
  );
}
