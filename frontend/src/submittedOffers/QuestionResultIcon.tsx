import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import React, { FunctionComponent } from "react";

type QuestionResultIconProps = {
  result: boolean;
};
export const QuestionResultIcon: FunctionComponent<QuestionResultIconProps> = ({
  result,
}) => {
  if (result) {
    return (
      <CheckCircleIcon
        className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
        aria-hidden="true"
      />
    );
  }

  return (
    <XCircleIcon
      className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400"
      aria-hidden="true"
    />
  );
};
