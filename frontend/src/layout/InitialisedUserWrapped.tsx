import { useAuth0 } from "@auth0/auth0-react";
import React, { FunctionComponent } from "react";
import ApiLoading from "../api/ApiLoading";

const InitialisedUserWrapped: FunctionComponent = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <ApiLoading message="We're getting everything ready for you..." />;
  }

  return <>{children}</>;
};

export default InitialisedUserWrapped;
