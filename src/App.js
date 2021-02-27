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
  AddItemScreen,
  AddStoreScreen,
  ItemScreen,
  UpdatesScreen,
  OrderScreen,
  StoreScreen,
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
            <Route path="/bag/:id?" component={BagScreen} exact />
            {/* <Route path="/orders" component={OrderScreen} exact /> */}
            <Route path="/itemscreen" component={ItemScreen} exact />
            <Route path="/store" component={StoreScreen} exact />
            {/* <Route path="/updates" component={UpdatesScreen} exact /> */}
            <Route path="/addstore" component={AddStoreScreen} exact />
            <Route path="/additem" component={AddItemScreen} exact />
            <Route path="/profile" component={ProfileScreen} exact />
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
            <ProtectedRoute user={user} path={ROUTES.UPDATES}>
              <UpdatesScreen />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={ROUTES.ORDERS}>
              <OrderScreen />
            </ProtectedRoute>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
