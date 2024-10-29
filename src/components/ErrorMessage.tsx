import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="mt-4 text-red-600 bg-red-200 p-4 rounded-md">{message}</div>
  );
};

export default ErrorMessage;
