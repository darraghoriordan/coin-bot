import {
    PencilAltIcon,
    PlusCircleIcon,
    TrashIcon,
} from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import { Trigger } from "shared-api-client";
import useDeleteTrigger from "./hooks/useDeleteTrigger";

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
                    to={`/custom-bot/${botUuid}/trigger/create`}
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
                    <div
                        className="my-5 overflow-hidden bg-white shadow sm:rounded-lg"
                        key={t.id}
                    >
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium text-gray-900 leading-6">
                                Trigger Information
                            </h3>
                            <p className="max-w-2xl mt-1 text-sm text-gray-500">
                                Trigger added on{" "}
                                {t.createdDate.toLocaleDateString()}
                            </p>
                        </div>
                        <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Trigger Type
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {t.triggerType}
                                    </dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Trigger Metadata
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {" "}
                                        <pre>
                                            {JSON.stringify(t.meta, null, 2)}
                                        </pre>
                                    </dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Trigger Run Results
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <p>
                                            Passes:{" "}
                                            {t.triggerResults
                                                ? t.triggerResults
                                                      .filter(
                                                          (tr) => !tr.errorState
                                                      )
                                                      .length.toString()
                                                : "0"}
                                        </p>
                                        <p>
                                            Fails:{" "}
                                            {t.triggerResults
                                                ? t.triggerResults
                                                      .filter(
                                                          (tr) => tr.errorState
                                                      )
                                                      .length.toString()
                                                : "0"}
                                        </p>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div className="flex m-4 space-x-4">
                            <Link
                                to={`/custom-bot/${botUuid}/trigger/${t.uuid}/edit`}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent shadow-sm leading-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PencilAltIcon
                                    className="w-4 h-4 mr-2 -ml-0.5"
                                    aria-hidden="true"
                                />
                                Edit Trigger
                            </Link>

                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500 disabled:opacity-50"
                                onClick={async () =>
                                    // should probably make this better. it redirects right away
                                    {
                                        await useDeleteTriggerMutation.mutate({
                                            botuuid: botUuid,
                                            triggeruuid: t.uuid,
                                        });
                                    }
                                }
                            >
                                <TrashIcon
                                    className="w-4 h-4 mr-2 -ml-0.5"
                                    aria-hidden="true"
                                />
                                Delete Trigger
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TriggersList;
