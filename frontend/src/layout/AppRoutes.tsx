import React from "react";
// import LoginButton from "./LoginButton";
import SharingLinks from "../sharingLinks/SharingLinks";
import Profile from "../Profile";
import FilterSettings from "../filterSettings/FilterSettings";
import ReceivedOffers from "../receivedOffers/ReceivedOffers";
import SubmitOffer from "../submitOffer/SubmitOffer";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import { Route } from "react-router-dom";
import SubmittedOffers from "../submittedOffers/SubmittedOffers";
import SubmittedOfferDetail from "../submittedOffers/SubmittedOfferDetails";
import ReceivedOfferDetails from "../receivedOffers/ReceivedOfferDetails";
import NewLayout from "./NewLayout";

function AppRoutes() {
  return (
    <NewLayout>
      <ProtectedRoute path={"/"} exact={true} component={SharingLinks} />
      <ProtectedRoute path={"/settings"} component={FilterSettings} />
      <ProtectedRoute path={"/profile"} component={Profile} />
      <ProtectedRoute
        path={"/received-roles/:offerId"}
        component={ReceivedOfferDetails}
      />
      <ProtectedRoute path={"/received-roles"} component={ReceivedOffers} />
      <ProtectedRoute
        path={"/submitted-roles/:offerId"}
        component={SubmittedOfferDetail}
      />
      <ProtectedRoute path={"/submitted-roles"} component={SubmittedOffers} />
      <Route path={"/submit/:offerId"} component={SubmitOffer} />
    </NewLayout>
  );
}

export default AppRoutes;
