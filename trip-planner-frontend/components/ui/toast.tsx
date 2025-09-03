import * as React from "react";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const useToast = () => {
  return {
    toast: ({
      title,
      description,
      variant,
    }: {
      title?: string;
      description?: string;
      variant?: "default" | "destructive";
    }) => {
      // Simple alert implementation - in a real app you'd use a proper toast library
      const message = title
        ? `${title}: ${description || ""}`
        : description || "";
      if (variant === "destructive") {
        alert(`Error: ${message}`);
      } else {
        alert(message);
      }
    },
  };
};

export { ToastProvider, useToast };
