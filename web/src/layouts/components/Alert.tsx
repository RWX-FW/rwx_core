import { Alert, AlertDescription } from "@/components/ui/alert";
import React, { useEffect } from "react";
import { UseFormClearErrors } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  gender: string;
  height: number;
  dateOfBirth: string;
};

type Props = {
  clearError: UseFormClearErrors<FormData>;
  error: keyof FormData;
  message?: string;
};

const AlertDispatch = ({ clearError, error, message }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearError(error);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [clearError, error]);

  if (!message) return null;

  return (
    <Alert className="mt-2">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AlertDispatch;