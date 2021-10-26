import { ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import { RunningStateEnum } from "shared-api-client";
import ApiError from "../api/ApiError";
import ApiLoading from "../api/ApiLoading";
import { RunningState } from "./RunningState";
import useGetAllMyBots from "./useGetAllMyBots";

const SubmittedOffers = (): JSX.Element => {
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
             <Link
                        to={`/create-custom-bot`}
                        className="block underline"
                      >
         Add a new bot
        </Link>
      </ApiLoading>
    );
  }
  console.log("DATA",data)
  return (
    <div className="mb-8">
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="pb-6 text-3xl font-bold text-dark-shade">
            My Bots
          </h1>
          <p className="pb-6">
            These are your bots!
          </p>
          <ul className="divide-y divide-gray-200">
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
                          <div className="min-w-0 flex-1 flex items-center">
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                              <div>
                                <p className="text-sm font-medium text-indigo-600 truncate">
                                  {customBot.name}
                                </p>
                              </div>
                              <div className="hidden md:block">
                                <div>
                                  <p className="text-sm text-gray-900">
                                    Last run{" "}
                                    <time
                                      dateTime={customBot.lastRun!.toString()}
                                    >
                                      {customBot.lastRun.toLocaleDateString()}
                                    </time>
                                  </p>
                                  <p className="mt-2 flex items-center text-sm text-gray-500">
                                    <RunningState
                                      result={customBot.runningState === RunningStateEnum.STARTED}
                                    />
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <ChevronRightIcon
                              className="h-5 w-5 text-gray-400"
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
        <Link
                        to={`/create-custom-bot`}
                        className="block hover:bg-gray-50"
                      >Create new bot</Link>
      </div>
    </div>
  );
};

export default SubmittedOffers;
