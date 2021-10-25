import React, { Fragment, FunctionComponent, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    HomeIcon,
    MenuIcon,
    InboxInIcon,
    ChevronDoubleRightIcon,
    AdjustmentsIcon,
    XIcon,
} from "@heroicons/react/outline";
import { NavLink, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import InitialisedUserWrapped from "./InitialisedUserWrapped";
import { QueryClient, QueryClientProvider } from "react-query";

const navigation = [
    { name: "Custom Bots", href: "/", icon: HomeIcon, exact: true },
    
];
function trimText(length: number, text: string | undefined): string {
    if (text && text.length > length) {
        return text.slice(0, length - 4).concat("...");
    }
    return text || "";
}
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
const queryClient = new QueryClient();

const NewLayout: FunctionComponent = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isLoading, isAuthenticated, user, loginWithRedirect, logout } =
        useAuth0();
    const trimmedUsername = trimText(20, user?.name);
    return (
        <QueryClientProvider client={queryClient}>
            <div className="h-screen flex overflow-hidden bg-white">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        static
                        className="fixed inset-0 flex z-40 md:hidden"
                        open={sidebarOpen}
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                    <div className="flex-shrink-0 flex items-center px-4">
                                        <img
                                            className="h-8 w-auto"
                                            src="/android-chrome-512x512.png"
                                            alt="Filtered Reduced"
                                        />
                                        <span className="ml-4 text-lg">
                                            Coinbot
                                        </span>
                                    </div>
                                    <nav className="mt-5 px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <NavLink
                                                exact={item.exact}
                                                key={item.name}
                                                to={item.href}
                                                activeClassName="bg-gray-100 text-gray-900"
                                                className={classNames(
                                                    "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                                    "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        "text-gray-400 group-hover:text-gray-500",
                                                        "mr-4 flex-shrink-0 h-6 w-6"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </nav>
                                </div>
                                <div className="flex-shrink-0 flex flex-col border-t border-gray-200 p-4">
                                    {!isLoading && user && user.picture ? (
                                        <div className="flex-shrink-0 group block">
                                            <div className="flex items-center">
                                                <div>
                                                    <img
                                                        className="inline-block h-10 w-10 rounded-full"
                                                        src={user.picture}
                                                        alt="Profile picture"
                                                    />
                                                </div>

                                                <div className="ml-3">
                                                    <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                                                        {user?.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : undefined}

                                    <div className="flex-shrink-0 w-full block">
                                        {!user ? (
                                            <button
                                                className="w-full mt-4 px-3 py-2 text-xs font-medium text-gray-500 group-hover:text-gray-700 border"
                                                onClick={loginWithRedirect}
                                            >
                                                Sign In
                                            </button>
                                        ) : (
                                            <button
                                                className="w-full mt-4 px-3 py-2 text-xs font-medium text-gray-500 group-hover:text-gray-700 border"
                                                onClick={() =>
                                                    logout({
                                                        returnTo:
                                                            window.location
                                                                .origin,
                                                    })
                                                }
                                            >
                                                Sign Out
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14">
                            {/* Force sidebar to shrink to fit close icon */}
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:flex-shrink-0">
                    <div className="flex flex-col w-64">
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
                            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                                <div className="flex items-center flex-shrink-0 px-4">
                                    <img
                                        className="h-8 w-auto"
                                        src="/android-chrome-512x512.png"
                                        alt="Filtered Reduced"
                                    />
                                    <span className="ml-4 text-lg">
                                        Coinbot
                                    </span>
                                </div>
                                <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                                    {navigation.map((item) => (
                                        <NavLink
                                            exact={item.exact}
                                            key={item.name}
                                            to={item.href}
                                            activeClassName="bg-gray-100 text-gray-900"
                                            className={classNames(
                                                "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    "text-gray-400 group-hover:text-gray-500",
                                                    "mr-3 flex-shrink-0 h-6 w-6"
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </nav>
                            </div>
                            <div className="flex-shrink-0 flex flex-col border-t border-gray-200 p-4">
                                {!isLoading && user && user.picture ? (
                                    <div className="flex-shrink-0 w-full group block">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="inline-block h-9 w-9 rounded-full"
                                                    src={user.picture}
                                                    alt="My Profile Avatar"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 overflow-ellipsis">
                                                    {trimmedUsername}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : undefined}
                                <div className="flex-shrink-0 w-full block">
                                    {!user ? (
                                        <button
                                            className="w-full mt-4 px-3 py-2 text-xs font-medium text-gray-500 group-hover:text-gray-700 border"
                                            onClick={loginWithRedirect}
                                        >
                                            Sign In
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full mt-4 px-3 py-2 text-xs font-medium text-gray-500 group-hover:text-gray-700 border"
                                            onClick={() =>
                                                logout({
                                                    returnTo:
                                                        window.location.origin,
                                                })
                                            }
                                        >
                                            Sign Out
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-0 flex-1 overflow-hidden">
                    <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
                        <button
                            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                        <div className="py-6">
                            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Dashboard
                </h1>
              </div> */}
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                <InitialisedUserWrapped>
                                    <Switch>{children}</Switch>
                                </InitialisedUserWrapped>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </QueryClientProvider>
    );
};

export default NewLayout;
