import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Header, Footer } from "./components";
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  BrowseScreen,
  BagScreen,
  ProfileScreen,
  ItemScreen,
  UpdatesScreen,
  OrderScreen,
  StoreScreen,
  ForgotPasswordScreen,
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
            {/* <Route path="/bag/:id?" component={BagScreen} exact /> */}
            <ProtectedRoute user={user} path="/bag/:id?">
              <BagScreen />
            </ProtectedRoute>
            <Route path="/product/:id?" component={ItemScreen} exact />
            <Route path="/store/:id?" component={StoreScreen} exact />
            <Route path="/profile" component={ProfileScreen} exact />
            <Route
              path="/forgotpassword"
              component={ForgotPasswordScreen}
              exact
            />

            <ProtectedRoute user={user} path={ROUTES.BROWSE}>
              <BrowseScreen />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={ROUTES.UPDATES}>
              <UpdatesScreen />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={ROUTES.ORDERS}>
              <OrderScreen />
            </ProtectedRoute>
            <Route path="/" component={HomeScreen} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
