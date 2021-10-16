import React, { FunctionComponent } from "react";
import { Switch } from "react-router-dom";
import Navbar from "./Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import InitialisedUserWrapped from "./InitialisedUserWrapped";

const queryClient = new QueryClient();

const Layout: FunctionComponent = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div className="pb-32 mb-10 bg-dark-shade">
          <Navbar />
        </div>

        <main className="relative -mt-32">
          <InitialisedUserWrapped>
            <Switch>{children}</Switch>
          </InitialisedUserWrapped>
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default Layout;
