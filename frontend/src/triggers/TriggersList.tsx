import { PlusCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import { Trigger } from "shared-api-client";
import ApiLoading from "../api/ApiLoading";
import useDeleteTrigger from "./useDeleteTrigger";

const TriggersList = ({
    triggers,
    botUuid,
}: {
    triggers: Trigger[];
    botUuid: string;
}): JSX.Element => {
    const useDeleteTriggerMutation = useDeleteTrigger();
    if (!triggers || triggers.length === 0) {
        return (
            <div className="pb-10">
                <h2 className="pb-6 font-bold text-1xl text-dark-shade">
                    Triggers
                </h2>
                <h3 className="pb-10">
                    This bot doesn't have any triggers yet
                </h3>
                <Link
                    to={`/custom-bot/${botUuid}/save-trigger`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent shadow-sm leading-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusCircleIcon
                        className="w-4 h-4 mr-2 -ml-0.5"
                        aria-hidden="true"
                    />
                    Add a new trigger
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h2 className="pb-6 font-bold text-1xl text-dark-shade">
                Triggers
            </h2>
            {triggers.map((t) => {
                return (
                    <>
                        <p>Trigger Type: {t.triggerType}</p>
                        <button
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500 disabled:opacity-50"
                            onClick={() =>
                                // should probably redirect after but whatevs
                                useDeleteTriggerMutation.mutate({
                                    botuuid: botUuid,
                                    triggeruuid: t.uuid,
                                })
                            }
                        >
                            Remove this trigger
                        </button>
                        <pre>{JSON.stringify(t.meta, null, 2)}</pre>
                        <h3 className="pb-6 text-xl font-bold text-dark-shade">
                            Trigger Run Results
                        </h3>
                        {t.triggerResults &&
                            t.triggerResults.map((tr) => {
                                return <p>{JSON.stringify(tr, null, 2)}</p>;
                            })}
                    </>
                );
            })}
        </div>
    );
};

export default TriggersList;
