import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Header, Footer } from "./components";
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  BrowseScreen,
} from "./screens";
import * as ROUTES from "./constants/routes";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import { useAuthListener } from "./hooks";

function App() {
  const { user } = useAuthListener();

  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <IsUserRedirect
              user={user}
              loggedInPath={ROUTES.HOME}
              path={ROUTES.SIGN_IN}
            >
              <LoginScreen />
            </IsUserRedirect>
            <IsUserRedirect
              user={user}
              loggedInPath={ROUTES.HOME}
              path={ROUTES.SIGN_UP}
            >
              <RegisterScreen />
            </IsUserRedirect>
            <IsUserRedirect
              user={user}
              loggedInPath={ROUTES.BROWSE}
              path={ROUTES.HOME}
              exact
            >
              <HomeScreen />
            </IsUserRedirect>
            <ProtectedRoute user={user} path={ROUTES.BROWSE}>
              <BrowseScreen />
            </ProtectedRoute>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
