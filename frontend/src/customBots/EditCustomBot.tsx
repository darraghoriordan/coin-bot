import React from "react";
import { Link, useParams } from "react-router-dom";
import { TriggerTypeEnum } from "shared-api-client";
import ApiError from "../api/ApiError";
import ApiLoading from "../api/ApiLoading";
import useDeleteBot from "../customBot/useDeleteBot";
import useAddTrigger from "./useAddTrigger";
import useDeleteTrigger from "./useDeleteTrigger";

import useGetOneBot from "./useGetOneBot";
type RequestParams = {
    botuuid: string;
};

const SubmittedOffers = (): JSX.Element => {
    let { botuuid } = useParams<RequestParams>();

    const { data, status } = useGetOneBot(botuuid);
    const deleteBotMutation = useDeleteBot();
    const useAddTriggerMutation = useAddTrigger();
    const useDeleteTriggerMutation = useDeleteTrigger();

    if (status === "loading") {
        return <ApiLoading />;
    }
    if (status === "error") {
        return <ApiError />;
    }

    if (data && (data as any).statusCode === 401) {
        return <ApiError message="You are not logged in to the api" />;
    }

    if (!data) {
        return <ApiLoading message="Not found"></ApiLoading>;
    }

    return (
        <div className="mb-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <div className="px-4 py-5 sm:px-6">
                    <h1 className="pb-6 text-3xl font-bold text-dark-shade">
                        {data.name}
                    </h1>
                    <p>bot state: {data.runningState}</p>
                    <p>bot run interval (s): {data.runEveryInSeconds}</p>
                    <p>bot last run: {data.lastRun.toLocaleString()}</p>
                    <button
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-grey-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                        onClick={() =>
                            // should probably redirect after but whatevs
                            useAddTriggerMutation.mutate({
                                botuuid: data.uuid,
                                model: {
                                    triggerType:
                                        TriggerTypeEnum.TWITTER_USER_MENTION,
                                    allMeta: {
                                        twitterUserMentionMeta: {
                                            mentionText:
                                                "random text to search for",
                                            twitterUserName:
                                                "@A_RANDOM_TWITTER_HANDLE",
                                        },
                                    },
                                },
                            })
                        }
                    >
                        Add random twitter trigger
                    </button>
                    <h2 className="pb-6 text-1xl font-bold text-dark-shade">
                        Triggers
                    </h2>

                    {data.triggers.map((t) => {
                        return (
                            <>
                                <p>Trigger Type: {t.triggerType}</p>
                                <button
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500 disabled:opacity-50"
                                    onClick={() =>
                                        // should probably redirect after but whatevs
                                        useDeleteTriggerMutation.mutate({
                                            botuuid: data.uuid,
                                            triggeruuid: t.uuid,
                                        })
                                    }
                                >
                                    REmove this trigger
                                </button>
                                <pre>{JSON.stringify(t.meta, null, 2)}</pre>
                                <h3 className="pb-6 text-xl font-bold text-dark-shade">
                                    Trigger Run Results
                                </h3>
                                {t.triggerResults &&
                                    t.triggerResults.map((tr) => {
                                        return (
                                            <p>{JSON.stringify(tr, null, 2)}</p>
                                        );
                                    })}
                            </>
                        );
                    })}
                    <h2 className="pb-6 text-1xl font-bold text-dark-shade">
                        Actions
                    </h2>
                    <p>Bot currently sends email only</p>
                </div>
                <button
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500 disabled:opacity-50"
                    onClick={() =>
                        // should probably redirect after but whatevs
                        deleteBotMutation.mutate({ botUuid: data.uuid })
                    }
                >
                    Click to Delete Bot
                </button>
            </div>
        </div>
    );
};

export default SubmittedOffers;
