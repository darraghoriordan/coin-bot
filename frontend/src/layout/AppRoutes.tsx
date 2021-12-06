import React from "react";
// import LoginButton from "./LoginButton";
import Profile from "../Profile";
import { RequireAuth } from "./RequireAuth";
import { Route } from "react-router-dom";
import NewLayout from "./NewLayout";
import CustomBots from "../customBots/CustomBots";
import CreateNewBot from "../customBots/CreateNewBot";
import EditCustomBot from "../customBots/EditCustomBot";
import ApiLoading from "../api/ApiLoading";

function AppRoutes() {
    return (
        <NewLayout>
            <Route
                path="/"
                element={
                    <RequireAuth
                        onRedirecting={() => (
                            <ApiLoading message="Loading..." />
                        )}
                    >
                        <CustomBots />
                    </RequireAuth>
                }
            />

            <Route
                path="profile"
                element={
                    <RequireAuth
                        onRedirecting={() => (
                            <ApiLoading message="Loading..." />
                        )}
                    >
                        <Profile />
                    </RequireAuth>
                }
            />

            <Route
                path="create-custom-bot"
                element={
                    <RequireAuth
                        onRedirecting={() => (
                            <ApiLoading message="Loading..." />
                        )}
                    >
                        <CreateNewBot />
                    </RequireAuth>
                }
            />

            <Route
                path="custom-bot/:botUuid"
                element={
                    <RequireAuth
                        onRedirecting={() => (
                            <ApiLoading message="Loading..." />
                        )}
                    >
                        <EditCustomBot />
                    </RequireAuth>
                }
            />
        </NewLayout>
    );
}

export default AppRoutes;
