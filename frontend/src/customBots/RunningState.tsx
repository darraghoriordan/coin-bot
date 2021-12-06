import React, { FunctionComponent } from "react";
import { BooleanCircleIcon } from "../sharedComponents/BooleanCircleIcon";

type ResultProps = {
    result: boolean;
};
export const RunningState: FunctionComponent<ResultProps> = ({ result }) => {
    const message = result ? "Running" : "Stopped";

    return (
        <span className="flex">
            <BooleanCircleIcon result={result} />
            {message}
        </span>
    );
};
