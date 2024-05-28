import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Consultation,
  Home,
  Login,
  Patient,
  Register,
  RootLayout,
  ViewPatient,
} from "./pages";
import { ProtectedPage } from "./components";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useAuth } from "./context/auth.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedPage>
      <RootLayout />
      // </ProtectedPage>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/consultations",
        element: <Consultation />,
      },
      {
        path: "/patients",
        element: <Patient />,
      },
      {
        path: "/patients/:patientId",
        element: <ViewPatient />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  const httpLink = new HttpLink({ uri: "http://localhost:4040/graphql" });
  const { token } = useAuth();

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    // const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `${token}` : "",
      },
    });
    return forward(operation);
  });

  const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
