import { ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import { RunningStateEnum } from "shared-api-client";
import ApiError from "../api/ApiError";
import ApiLoading from "../api/ApiLoading";
import { RunningState } from "./RunningState";
import useGetAllMyBots from "./hooks/useGetAllMyBots";
import { PlusCircleIcon } from "@heroicons/react/solid";

const CustomBotList = (): JSX.Element => {
    const { data, status } = useGetAllMyBots();

    if (status === "loading") {
        return <ApiLoading />;
    }
    if (status === "error") {
        return <ApiError />;
    }

    if (data && (data as any).statusCode === 401) {
        return <ApiError message="You are not logged in to the api" />;
    }

    if (data && data.length === 0) {
        return (
            <ApiLoading message="You don't have any bots yet">
                <Link to={`/custom-bot/create`} className="block underline">
                    Add a new bot
                </Link>
            </ApiLoading>
        );
    }
    console.log("DATA", data);
    return (
        <div className="mb-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <div className="px-4 py-5 sm:px-6">
                    <h1 className="pb-6 text-3xl font-bold text-dark-shade">
                        Bots
                    </h1>
                    <p className="py-6">
                        <Link
                            to={`/custom-bot/create`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent shadow-sm leading-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <PlusCircleIcon
                                className="w-4 h-4 mr-2 -ml-0.5"
                                aria-hidden="true"
                            />
                            Create new bot
                        </Link>
                    </p>
                    <p className="pb-6">
                        These are your existing bots. Click on a bot for more
                        details or to edit the bot.
                    </p>

                    <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                        {data &&
                            data
                                .sort(function (a, b) {
                                    return +b.createdDate! - +a.createdDate!;
                                })
                                .map((customBot) => {
                                    return (
                                        <li key={customBot.id}>
                                            <Link
                                                to={`/custom-bot/${customBot.uuid}`}
                                                className="block hover:bg-gray-50"
                                            >
                                                <div className="flex items-center px-4 py-4 sm:px-6">
                                                    <div className="flex items-center flex-1 min-w-0">
                                                        <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                            <div>
                                                                <p className="text-sm font-medium text-indigo-600 truncate">
                                                                    {
                                                                        customBot.name
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-gray-900 truncate">
                                                                    triggers:{" "}
                                                                    {
                                                                        customBot
                                                                            .triggers
                                                                            .length
                                                                    }
                                                                </p>
                                                                {/* The only action is at the moment is an email */}
                                                                <p className="text-sm text-gray-900 truncate">
                                                                    actions: {1}
                                                                </p>
                                                            </div>
                                                            <div className="hidden md:block">
                                                                <div>
                                                                    <p className="text-sm text-gray-900">
                                                                        Last run{" "}
                                                                        <time
                                                                            dateTime={customBot.lastRun!.toString()}
                                                                        >
                                                                            {customBot.lastRun.toLocaleTimeString()}{" "}
                                                                            {customBot.lastRun.toLocaleDateString()}
                                                                        </time>
                                                                    </p>
                                                                    <p className="flex items-center mt-2 text-sm text-gray-500">
                                                                        <RunningState
                                                                            result={
                                                                                customBot.runningState ===
                                                                                RunningStateEnum.STARTED
                                                                            }
                                                                        />
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChevronRightIcon
                                                            className="w-5 h-5 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CustomBotList;
