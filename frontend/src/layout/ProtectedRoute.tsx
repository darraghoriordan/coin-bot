import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Route } from "react-router-dom";
import ApiLoading from "../api/ApiLoading";

const ProtectedRoute = ({ component, ...args }: any) => {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <ApiLoading message="Loading..." />,
      })}
      {...args}
    />
  );
};

export default ProtectedRoute;
