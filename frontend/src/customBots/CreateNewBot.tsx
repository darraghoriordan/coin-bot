import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import ApiError from "../api/ApiError";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useSaveBot from "./useSaveBot";
import { RunningStateEnum } from "shared-api-client";

const SubmitOffer = (): JSX.Element => {
    const { isAuthenticated } = useAuth0();

    const saveMutation = useSaveBot();
    const [formSubmitting, toggleSubmitting] = useState(false);
    if (saveMutation) {
        console.log("submitState", saveMutation);
    }

    if (!isAuthenticated) {
        return <ApiError message="You are not logged in" />;
    }

    if (
        saveMutation.isSuccess &&
        (saveMutation.data as any).statusCode === 429
    ) {
        return (
            <ApiError message="You have exceeded the number of bots allowed" />
        );
    }

    return (
        <Formik
            initialValues={{
                botName: "My Cool Bot",
                runEveryInSeconds: 120,
                runningState: RunningStateEnum.STARTED,
            }}
            validationSchema={Yup.object({
                botName: Yup.string()
                    .required("This is required")
                    .min(1, "This is required"),
                runEveryInSeconds: Yup.number()
                    .transform((num) => (num <= 0 ? undefined : num))
                    .integer()
                    .required()
                    .min(1, "This one is required")
                    .max(999999999, "Max is 999999999"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                toggleSubmitting(true);
                saveMutation.mutate(
                    {
                        model: {
                            name: values.botName,
                            runEveryInSeconds: values.runEveryInSeconds,
                            runningState: RunningStateEnum.STARTED,
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
                            Create a new bot
                        </h1>
                        <h2 className="text-2xl">What is this?</h2>
                        <p className="my-4">
                            You can create the bot here. You will add the
                            triggers later.
                        </p>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="px-8 pt-6 pb-6 overflow-hidden bg-white rounded-lg shadow lg:pb-8">
                        <div className="grid grid-cols-12 gap-6">
                            <h2 className="text-2xl col-span-12">Details</h2>

                            <div className="col-span-12">
                                <div className="inline w-auto">
                                    <label
                                        htmlFor="botName"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Bot Name
                                    </label>
                                    <Field
                                        legend="Bot Name"
                                        as="input"
                                        name="botName"
                                        id="botName"
                                        className="inline px-3 py-2 mt-1 border border-gray-300 w-80 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                                    />
                                </div>
                                <ErrorMessage name="botName">
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
                                        htmlFor="runEveryInSeconds"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Run interval in seconds
                                    </label>
                                    <Field
                                        type="number"
                                        name="runEveryInSeconds"
                                        id="runEveryInSeconds"
                                        step="10"
                                        className="block w-1/2 px-3 py-2 mt-1 border border-gray-300 md:w-1/4 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                                    />
                                </div>
                                <ErrorMessage name="runEveryInSeconds">
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
                                Click next to continue
                            </h2>
                            <div className="col-span-12 space-x-6">
                                {formSubmitting ? (
                                    <p>Saving...</p>
                                ) : (
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                            <div className="col-span-12">
                                {saveMutation.isSuccess && (
                                    <p>
                                        Success - saved!{" "}
                                        <Link
                                            to={"/"}
                                            className="font-bold info-link text-dark-accent"
                                        >
                                            go to your bots
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

export default SubmitOffer;
