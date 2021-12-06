import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import ApiError from "../api/ApiError";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { TriggerTypeEnum, TwitterUserMentionMeta } from "shared-api-client";
import useEditTrigger from "./hooks/useEditTrigger";
import useGetOneTrigger from "./hooks/useGetOneTrigger";
import ApiLoading from "../api/ApiLoading";

const TriggerCreate = (): JSX.Element => {
    const { isAuthenticated } = useAuth0();

    const saveMutation = useEditTrigger();
    let { botUuid, triggerUuid } = useParams();
    const { data, status } = useGetOneTrigger(
        botUuid || "couldnt-read-id",
        triggerUuid || "couldnt-read-id"
    );

    const [formSubmitting, toggleSubmitting] = useState(false);
    if (saveMutation) {
        console.log("submitState", saveMutation);
    }

    if (status === "loading") {
        return <ApiLoading />;
    }
    if (status === "error") {
        return <ApiError />;
    }
    if (!data) {
        return <ApiError message="Couldn't find a bot" />;
    }
    if (saveMutation) {
        console.log("submitState", saveMutation);
    }

    if (!isAuthenticated) {
        return <ApiError message="You are not logged in" />;
    }

    return (
        <Formik
            initialValues={{
                triggerType: TriggerTypeEnum.TWITTER_USER_MENTION,
                allMeta: {
                    twitterUserMentionMeta: data.meta as TwitterUserMentionMeta,
                    noActionTestMeta: {
                        testString: "",
                    },
                },
            }}
            validationSchema={Yup.object({
                triggerType: Yup.mixed<TriggerTypeEnum>()
                    .oneOf(Object.values(TriggerTypeEnum))
                    .required("This is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                toggleSubmitting(true);

                saveMutation.mutate(
                    {
                        botUuid: botUuid!,

                        model: {
                            id: data.id,
                            uuid: data.uuid,
                            allMeta: {
                                twitterUserMentionMeta:
                                    values.triggerType ===
                                    TriggerTypeEnum.TWITTER_USER_MENTION
                                        ? values.allMeta.twitterUserMentionMeta
                                        : undefined,
                                noActionTestMeta:
                                    values.triggerType ===
                                    TriggerTypeEnum.NO_ACTION_DEFAULT
                                        ? values.allMeta.noActionTestMeta
                                        : undefined,
                            },
                        },
                    },
                    { onError: (error) => console.log("custom:", error) }
                );

                toggleSubmitting(false);
                setSubmitting(false);
            }}
        >
            <Form>
                <div className="mb-8">
                    <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                        <h1 className="pb-2 text-3xl font-bold text-dark-shade">
                            Edit trigger meta data
                        </h1>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                        <div className="grid grid-cols-12 gap-6">
                            <h2 className="text-2xl col-span-12">Meta Data</h2>
                            <div className="col-span-12">
                                <div className="inline w-auto">
                                    <label
                                        htmlFor="allMeta.twitterUserMentionMeta.twitterUserName"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Twitter User Name
                                    </label>
                                    <Field
                                        type="text"
                                        name="allMeta.twitterUserMentionMeta.twitterUserName"
                                        id="allMeta.twitterUserMentionMeta.twitterUserName"
                                        step="10"
                                        className="block w-1/2 px-3 py-2 mt-1 border border-gray-300 md:w-1/4 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                                    />
                                </div>
                                <ErrorMessage name="allMeta.twitterUserMentionMeta.twitterUserName">
                                    {(msg) => (
                                        <div className="text-red-500">
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>

                            <div className="col-span-12">
                                <div className="inline w-auto">
                                    <label
                                        htmlFor="allMeta.twitterUserMentionMeta.mentionText"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Search Text
                                    </label>
                                    <Field
                                        type="text"
                                        name="allMeta.twitterUserMentionMeta.mentionText"
                                        id="allMeta.twitterUserMentionMeta.mentionText"
                                        step="10"
                                        className="block w-1/2 px-3 py-2 mt-1 border border-gray-300 md:w-1/4 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                                    />
                                </div>
                                <ErrorMessage name="allMeta.twitterUserMentionMeta.mentionText">
                                    {(msg) => (
                                        <div className="text-red-500">
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                        <div className="grid grid-cols-12 gap-6">
                            <h2 className="text-2xl col-span-12">
                                Click save to add the trigger
                            </h2>
                            <div className="col-span-12 space-x-6">
                                {formSubmitting ? (
                                    <p>Saving...</p>
                                ) : (
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500 disabled:opacity-50"
                                    >
                                        Save Trigger
                                    </button>
                                )}
                            </div>
                            <div className="col-span-12">
                                {saveMutation.isSuccess && (
                                    <p>
                                        Success - saved!{" "}
                                        <Link
                                            to={`/custom-bot/${botUuid}`}
                                            className="font-bold info-link text-dark-accent"
                                        >
                                            go back to the bot
                                        </Link>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default TriggerCreate;
