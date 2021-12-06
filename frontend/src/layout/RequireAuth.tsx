import { useAuth0, User } from "@auth0/auth0-react";
import React, { useEffect } from "react";

export function RequireAuth({
    children,
    returnTo,
    onRedirecting,
    loginOptions,
    claimCheck,
}: {
    children: JSX.Element;
    returnTo?: () => string;
    onRedirecting?: () => JSX.Element;
    loginOptions?: any;
    claimCheck?: (user: User | undefined) => boolean;
}) {
    const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    const thisReturnTo = returnTo ?? defaultReturnTo;
    const thisOnRedirecting = onRedirecting ?? defaultOnRedirecting;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const thisLoginOptions = loginOptions ?? {};
    const thisClaimCheck = claimCheck ? claimCheck : () => true;

    /**
     * The route is authenticated if the user has valid auth and there are no
     * JWT claim mismatches.
     */
    const routeIsAuthenticated = isAuthenticated && thisClaimCheck(user);

    useEffect(() => {
        if (isLoading || routeIsAuthenticated) {
            return;
        }
        const opts = {
            ...thisLoginOptions,
            appState: {
                ...thisLoginOptions.appState,
                returnTo: thisReturnTo(),
            },
        };
        (async (): Promise<void> => {
            await loginWithRedirect(opts);
        })();
    }, [
        isLoading,
        routeIsAuthenticated,
        loginWithRedirect,
        thisLoginOptions,
        thisReturnTo,
    ]);

    return routeIsAuthenticated ? children : thisOnRedirecting();
}

const defaultOnRedirecting = (): JSX.Element => <></>;

const defaultReturnTo = (): string =>
    `${window.location.pathname}${window.location.search}`;
