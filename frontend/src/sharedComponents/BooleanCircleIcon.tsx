import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import React, { FunctionComponent } from "react";

type BooleanCircleIconProps = {
    result: boolean;
};
export const BooleanCircleIcon: FunctionComponent<BooleanCircleIconProps> = ({
    result,
}) => {
    if (result) {
        return (
            <CheckCircleIcon
                className="flex-shrink-0 w-5 h-5 text-green-400 mr-1.5"
                aria-hidden="true"
            />
        );
    }

    return (
        <XCircleIcon
            className="flex-shrink-0 w-5 h-5 text-red-400 mr-1.5"
            aria-hidden="true"
        />
    );
};
