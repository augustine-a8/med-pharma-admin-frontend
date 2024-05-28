import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type ProtectedPageProps = {
  children?: JSX.Element;
};

export default function ProtectedPage({ children }: ProtectedPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<{ token: string }>({ token: "" });

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("auth-token");
      if (storedData) {
        console.log(storedData);
        setAuthToken(JSON.parse(storedData));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        console.log("nothing found");
      }
    } catch (error) {
      console.error("Failed to retrieve data from local storage:", error);
    }
  }, []);

  console.log(isAuthenticated);
  if (authToken.token !== "") {
    console.log(authToken);
    return children;
  }

  return <Navigate to="/login" replace={true} />;
}
