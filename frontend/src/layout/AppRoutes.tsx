import React from "react";
// import LoginButton from "./LoginButton";
import Profile from "../Profile";
import { RequireAuth } from "./RequireAuth";
import { Route } from "react-router-dom";
import NewLayout from "./NewLayout";
import CustomBots from "../customBots/CustomBotList";
import CreateNewBot from "../customBots/CustomBotCreate";
import CustomBotDetails from "../customBots/CustomBotDetails";
import ApiLoading from "../api/ApiLoading";
import CustomBotEdit from "../customBots/CustomBotEdit";

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
                path="custom-bot/create"
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
                        <CustomBotDetails />
                    </RequireAuth>
                }
            />
            <Route
                path="custom-bot/:botUuid/edit"
                element={
                    <RequireAuth
                        onRedirecting={() => (
                            <ApiLoading message="Loading..." />
                        )}
                    >
                        <CustomBotEdit />
                    </RequireAuth>
                }
            />
        </NewLayout>
    );
}

export default AppRoutes;
