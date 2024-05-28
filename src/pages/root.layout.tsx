import { Navigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { useAuth } from "../context/auth.context";

export default function Root() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <div className="root">
      <Navbar />
      <div className="root-outlet">
        <Outlet />
      </div>
    </div>
  );
}
