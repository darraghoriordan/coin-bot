import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiError from "../api/ApiError";
import ApiLoading from "../api/ApiLoading";
import useDeleteBot from "./hooks/useDeleteBot";
import useGetOneBot from "./hooks/useGetOneBot";
import TriggersList from "../triggers/TriggersList";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

const CustomBotDetails = (): JSX.Element => {
    let { botUuid } = useParams();
    const navigate = useNavigate();

    const { data, status } = useGetOneBot(botUuid || "couldnt-read-id");
    const deleteBotMutation = useDeleteBot();

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
                    <h2 className="pb-6 font-bold text-1xl text-dark-shade">
                        Bot Summary
                    </h2>
                    <p>Running state: {data.runningState}</p>
                    <p>Running interval: {data.runEveryInSeconds} seconds</p>
                    <p className="mb-6">
                        Last run: {data.lastRun.toLocaleString()}
                    </p>

                    <TriggersList
                        botUuid={data.uuid}
                        triggers={data.triggers}
                    />

                    <h2 className="pb-6 font-bold text-1xl text-dark-shade">
                        Actions
                    </h2>
                    <p>Bot currently sends email only</p>
                </div>
                <div className="flex m-4 space-x-4">
                    <Link
                        to={`/custom-bot/${data.uuid}/edit`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent shadow-sm leading-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <PencilAltIcon
                            className="w-4 h-4 mr-2 -ml-0.5"
                            aria-hidden="true"
                        />
                        Edit Bot
                    </Link>

                    <button
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500 disabled:opacity-50"
                        onClick={async () =>
                            // should probably make this better. it redirects right away
                            {
                                await deleteBotMutation.mutate({
                                    botUuid: data.uuid,
                                });

                                navigate("/");
                            }
                        }
                    >
                        <TrashIcon
                            className="w-4 h-4 mr-2 -ml-0.5"
                            aria-hidden="true"
                        />
                        Delete Bot
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomBotDetails;
