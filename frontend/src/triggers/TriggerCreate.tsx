import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import ApiError from "../api/ApiError";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { TriggerTypeEnum } from "shared-api-client";
import useAddTrigger from "./hooks/useAddTrigger";
import { Fieldset } from "../sharedComponents/Fieldset";

const TriggerCreate = (): JSX.Element => {
    const { isAuthenticated } = useAuth0();

    const saveMutation = useAddTrigger();
    let { botUuid } = useParams();

    const [formSubmitting, toggleSubmitting] = useState(false);
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
                    twitterUserMentionMeta: {
                        twitterUserName: "",
                        mentionText: "",
                    },
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
                            triggerType: values.triggerType,
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
            {(props) => (
                <Form>
                    <div className="mb-8">
                        <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                            <h1 className="pb-2 text-3xl font-bold text-dark-shade">
                                Add a trigger
                            </h1>
                            <h2 className="text-2xl">What is this?</h2>
                            <p className="my-4">
                                You can add a trigger to your bot here
                            </p>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                            <div className="grid grid-cols-12 gap-6">
                                <h2 className="text-2xl col-span-12">
                                    Details
                                </h2>

                                <div className={`col-span-12`}>
                                    <label
                                        htmlFor="triggerType"
                                        className="block pb-4 text-sm font-medium text-gray-700"
                                    >
                                        Trigger Type
                                    </label>
                                    <Fieldset
                                        legend="Trigger Type"
                                        name="triggerType"
                                        id="triggerType"
                                        className="block w-full px-3 py-4 mt-4 border border-gray-300 md:w-1/2 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                                        fieldSetConfig={[
                                            {
                                                value: TriggerTypeEnum.TWITTER_USER_MENTION,
                                                title: "Twitter User Mention",
                                                description:
                                                    "Trigger when a twitter user mentions some text",
                                            },
                                            {
                                                value: TriggerTypeEnum.NO_ACTION_DEFAULT,
                                                title: "No action for testing",
                                                description:
                                                    "Trigger is ALWAYS true - use only for testing",
                                            },
                                        ]}
                                    />
                                    <ErrorMessage name="triggerType">
                                        {(msg) => (
                                            <div className="text-red-500">
                                                {msg}
                                            </div>
                                        )}
                                    </ErrorMessage>
                                </div>
                                {props.values.triggerType ===
                                    TriggerTypeEnum.TWITTER_USER_MENTION && (
                                    <>
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
                                        </div>{" "}
                                    </>
                                )}
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
            )}
        </Formik>
    );
};

export default TriggerCreate;
