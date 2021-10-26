import React from "react";
// import LoginButton from "./LoginButton";
import Profile from "../Profile";
import ProtectedRoute from "./ProtectedRoute";
import { Route } from "react-router-dom";
import NewLayout from "./NewLayout";
import CustomBots from "../customBots/CustomBots";
import CreateNewBot from "../customBot/CreateNewBot";
import EditCustomBot from "../customBots/EditCustomBot";

function AppRoutes() {
    return (
        <NewLayout>
            <ProtectedRoute path={"/"} exact={true} component={CustomBots} />
            <ProtectedRoute path={"/profile"} component={Profile} />
            <ProtectedRoute
                path={"/create-custom-bot"}
                component={CreateNewBot}
            />
            <Route path={"/custom-bot/:botuuid"} component={EditCustomBot} />
        </NewLayout>
    );
}

export default AppRoutes;
